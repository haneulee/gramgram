# from django.conf.urls import url
from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path("", view=views.Images.as_view(), name="feed"),
    path("<int:id>/", view=views.ImageDetail.as_view(), name="image_detail"),
    path("all/", view=views.ListAllImages.as_view(), name="all_images"),
    path(
        "comments/", view=views.ListAllComments.as_view(),
        name="all_comments"),
    path("likes/", view=views.ListAllImages.as_view(), name="all_likes"),
    path("<int:id>/likes/", view=views.LikeImage.as_view(), name="like_image"),
    path(
        "<int:id>/unlikes/",
        view=views.LikeImage.as_view(),
        name="unlike_image"),
    path(
        "<int:id>/comments/",
        view=views.CommentOnImage.as_view(),
        name="comment_image"),
    path(
        "<int:image_id>/comments/<int:comment_id>",
        view=views.ModerateComments.as_view(),
        name="comment_image"),
    path("comments/<int:id>/", view=views.Comment.as_view(), name="comment"),
    path("search/", view=views.Search.as_view(), name="search"),
]

# /images/3/like/

# 1. create the url and the view
# 2. take the id from the url
# 3. we wanna find an image with this id
# 4. we wanna create a like for that image