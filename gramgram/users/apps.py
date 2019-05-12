from django.apps import AppConfig


class UsersAppConfig(AppConfig):

    name = "gramgram.users"
    verbose_name = "Users"

    def ready(self):
        try:
            from .signals import user_signed_up
        except ImportError:
            pass
