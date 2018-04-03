# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_application', '0005_auto_20180403_1659'),
    ]

    operations = [
        migrations.AddField(
            model_name='sysloadavg',
            name='app_id',
            field=models.IntegerField(null=True),
        ),
    ]
