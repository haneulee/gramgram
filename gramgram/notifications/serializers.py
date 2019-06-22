from rest_framework import serializers
from . import models
from gramgram.users import serializers as user_serializers
from gramgram.images import serializers as images_serializers


class NotificationSerializer(serializers.ModelSerializer):

    creator = user_serializers.ListUserSerializer()
    image = images_serializers.SmallImageSerializer()

    class Meta:
        model = models.Notification
        fields = ('creator', 'to', 'notification_type', 'image', 'comment',
                  'natural_time', 'id', 'updated_at', 'created_at')
