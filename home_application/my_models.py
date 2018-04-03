# -*- coding: utf-8 -*-

from django.db import models


# 服务器
class Server2(models.Model):
    name = models.CharField(max_length=100)
    ip = models.CharField(max_length=50)
    ram = models.CharField(max_length=10, default='')
    cpu = models.CharField(max_length=10, default='')
    operating_system = models.CharField(max_length=50, default='')
    des = models.CharField(max_length=500, default='')
    when_expired = models.CharField(max_length=20, default='')


