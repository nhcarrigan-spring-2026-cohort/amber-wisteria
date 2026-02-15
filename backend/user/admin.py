from django.contrib import admin

from .models import Profile, FriendRequest

admin.site.register(Profile)


@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at')
    search_fields = ('sender__username', 'receiver__username')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
