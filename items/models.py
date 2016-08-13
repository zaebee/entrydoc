# -*- coding: utf-8 -*-

from django.db import models
from eav.models import BaseEntity, BaseSchema, BaseAttribute


class Item(BaseEntity):
    title = models.CharField(max_length=50)


class Schema(BaseSchema):
    pass


class Attr(BaseAttribute):
    schema = models.ForeignKey(Schema, related_name='attrs', null=True, blank=True)
