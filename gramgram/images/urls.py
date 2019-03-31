# from django.conf.urls import url
from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path("", view=views.Feed.as_view(), name="feed"),
    path("all/", view=views.ListAllImages.as_view(), name="all_images"),
    path(
        "comments/", view=views.ListAllComments.as_view(),
        name="all_comments"),
    path("likes/", view=views.ListAllImages.as_view(), name="all_likes"),
    path("<int:id>/like/", view=views.LikeImage.as_view(), name="like_image"),
    path(
        "<int:id>/comment/",
        view=views.CommentOnImage.as_view(),
        name="comment_image"),
]

# /images/3/like/

# 1. create the url and the view
# 2. take the id from the url
# 3. we wanna find an image with this id
# 4. we wanna create a like for that image