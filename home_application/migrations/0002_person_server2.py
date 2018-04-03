# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_application', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=10)),
                ('enName', models.CharField(max_length=10)),
                ('sex', models.CharField(max_length=10)),
                ('age', models.CharField(max_length=10)),
                ('graYear', models.CharField(max_length=10)),
                ('Nation', models.CharField(max_length=10)),
                ('marriage', models.CharField(max_length=10)),
                ('culture', models.CharField(max_length=10)),
                ('political', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Server2',
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
