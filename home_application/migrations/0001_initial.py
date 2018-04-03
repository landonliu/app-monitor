# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('ip', models.CharField(max_length=50)),
                ('ram', models.CharField(default=b'', max_length=10)),
                ('cpu', models.CharField(default=b'', max_length=10)),
                ('operating_system', models.CharField(default=b'', max_length=50)),
                ('des', models.CharField(default=b'', max_length=500)),
                ('when_expired', models.CharField(default=b'', max_length=20)),
            ],
        ),
    ]
