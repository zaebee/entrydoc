from __future__ import unicode_literals

from django.db import models

STATUS_CHOICES = (
    ('p', 'In progress'),
    ('n', 'Not started'),
    ('d', 'Done'),
)

# Create your models here.
class Task(models.Model):
    song = models.CharField(max_length=20)
    band = models.CharField(max_length=20)
    success = models.PositiveIntegerField(default=0, editable=False)
    fails = models.PositiveIntegerField(default=0, editable=False)
    start_day = models.DateTimeField(blank=True, null=True)
    end_day = models.DateTimeField(blank=True, null=True)
    clicks = models.PositiveIntegerField(default=0, editable=False)
    status = models.CharField(max_length=20, default='n', choices=STATUS_CHOICES, editable=False)




