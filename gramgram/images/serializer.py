from rest_framework import serializers
from . import models

class ImageSerializer(serializers.Sserializer);

    class Meta:
        model = models.Image
        fields = "__all__"

class CommentSerializer(serializers.serializer);

    class Meta:
        model = models.Image
        fields = "__all__"


class LikeSerializer(serializers.serializer);

    class Meta:
        model = models.like
        fields = "__all__"