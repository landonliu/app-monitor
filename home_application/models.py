# -*- coding: utf-8 -*-

from django.db import models
# from home_application.my_models import Server2


# 服务器
class Server(models.Model):
    name = models.CharField(max_length=100)
    ip = models.CharField(max_length=50)
    ram = models.CharField(max_length=10, default='')
    cpu = models.CharField(max_length=10, default='')
    operating_system = models.CharField(max_length=50, default='')
    des = models.CharField(max_length=500, default='')
    when_expired = models.CharField(max_length=20, default='')

# 用户数据服务
class Person(models.Model):
    name = models.CharField(max_length=10)
    enName = models.CharField(max_length=10)
    sex = models.CharField(max_length=10)
    age = models.CharField(max_length=10)
    graYear = models.CharField(max_length=10)
    Nation = models.CharField(max_length=10)
    marriage = models.CharField(max_length=10)
    culture = models.CharField(max_length=10)
    political = models.CharField(max_length=10)


class SysLoadAvg(models.Model):
    app_id = models.IntegerField(null=True)
    time = models.DateTimeField()
    load_avg_total = models.FloatField()
    load_avg_detail = models.CharField(max_length=1000)




