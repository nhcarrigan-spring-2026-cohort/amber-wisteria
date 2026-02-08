from django.apps import AppConfig

class UserConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField" # default primary key field type for models in this app
    name = "user"

    def ready(self):
        import user.signals  