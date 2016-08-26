from django.contrib import admin
from models import Task


def start_bot(modeladmin, request, queryset):
    for task in queryset:
        break
    return
start_bot.short_description = 'Start bot with selected tasks'


class TaskAdmin(admin.ModelAdmin):
    list_display = ['song', 'player_url', 'status', 'success', 'fails']
    ordering = ['song']
    actions = [start_bot]

    def player_url(self, obj):
        return 'http://soundclick.com/%s' % obj.song

admin.site.register(Task, TaskAdmin)
