# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-20 19:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(default='Not started', max_length=20),
        ),
    ]