from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from gramgram.notifications import views as notification_views
from gramgram.users import models as user_models
from gramgram.users import serializers as user_serializers


class Images(APIView):
    def get(self, request, format=None):

        user = request.user

        print(user)

        following_users = user.following.all()
        print(user.following, user.followers, user.user_followers)
        print(user.following.all())

        image_list = []

        for following_user in following_users:

            user_images = following_user.images.all()[:2]

            for image in user_images:

                image_list.append(image)

        my_images = user.images.all()[:2]

        for image in my_images:

            image_list.append(image)

        sorted_list = sorted(image_list,
                             key=lambda image: image.created_at,
                             reverse=True)

        serializer = serializers.ImageSerializer(sorted_list,
                                                 many=True,
                                                 context={"request": request})

        return Response(serializer.data)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.InputImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(data=serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


def get_key(iamge):
    return image.created_at


class ListAllImages(APIView):
    def get(self, request, format=None):

        all_images = models.Image.objects.all()

        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)


class ListAllComments(APIView):
    def get(self, request, format=None):

        all_comments = models.Comment.objects.all()

        serializer = serializers.CommentSerializer(all_comments, many=True)

        return Response(data=serializer.data)


class ListAllLikes(APIView):
    def get(self, request, format=None):

        all_likes = models.Like.objects.all()

        serializer = serializers.LikeSerializer(all_likes, many=True)

        return Response(data=serializer.data)


class LikeImage(APIView):
    def get(self, request, id, format=None):

        likes = models.Like.objects.filter(image__id=id)

        like_created_id = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=like_created_id)

        serializer = user_serializers.ListUserSerializer(
            users, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisting_like = models.Like.objects.get(creator=user,
                                                       image=found_image)

            return Response(status=status.HTTP_304_NO_MODIFIED)
        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(creator=user,
                                                  image=found_image)

            new_like.save()

            notification_views.create_notification(user, found_image.creator,
                                                   'like', found_image)

            return Response(status=status.HTTP_201_CREATED)


class UnLikeImage(APIView):
    def delete(self, request, id, format=None):
        user = request.user

        try:
            found_image = models.Image.objects.get(id=id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisting_like = models.Like.objects.get(creator=user,
                                                       image=found_image)

            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Like.DoesNotExist:
            return Response(status=status.HTTP_304_NO_MODIFIED)


class CommentOnImage(APIView):
    def post(self, request, id, forma=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=id)

        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user, image=found_image)

            notification_views.create_notification(user, found_image.creator,
                                                   'comment', found_image,
                                                   serializer.data['message'])

            return Response(data=serializer.data,
                            status=status.HTTP_201_CREATED)

        else:

            return Response(data=serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class Comment(APIView):
    def delete(self, request, id, format=None):

        user = request.user

        try:
            comment = models.Comment.objects.get(id=id, creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class Search(APIView):
    def get(self, request, format=None):

        hashtags = request.query_params.get("hashtags", None)

        if hashtags is not None:

            hashtags = hashtags.split(",")

            images = models.Image.objects.filter(
                tags__name__in=hashtags).distinct()

            serializer = serializers.CountImageSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

            # title: ""

        else:

            images = models.Image.objects.all()[:20]
            serializer = serializers.CountImageSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)


class ModerateComments(APIView):
    def delete(self, request, image_id, comment_id, format=None):

        user = request.user

        # try:
        #     image = models.Image.objects.get(id=image_id, creator=user)
        # except models.Image.DoesNotExist:
        #     return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            comment_to_delete = models.Comment.objects.get(id=comment_id,
                                                           image__id=image_id,
                                                           image__creator=user)

            comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)


class ImageDetail(APIView):
    def find_own_image(self, id, user):
        try:
            found_image = models.Image.objects.get(id=id, creator=user)
            return found_image
        except models.Image.DoesNotExist:
            return None

    def get(self, request, id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ImageSerializer(found_image,
                                                 context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id, format=None):

        user = request.user

        found_image = self.find_own_image(id, user)

        if found_image is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.InputImageSerializer(found_image,
                                                      data=request.data,
                                                      partial=True)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(data=serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):

        user = request.user

        found_image = self.find_own_image(id, user)

        if found_image is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        found_image.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)