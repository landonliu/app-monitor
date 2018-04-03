# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_application', '0003_delete_server2'),
    ]

    operations = [
        migrations.CreateModel(
            name='SysLoadAvg',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.CharField(max_length=20)),
                ('load_avg_total', models.FloatField()),
                ('load_avg_detail', models.CharField(max_length=1000)),
            ],
        ),
    ]
