# -*- coding: utf-8 -*-
"""
celery 任务示例

本地启动celery命令: python  manage.py  celery  worker  --settings=settings
周期性任务还需要启动celery调度命令：python  manage.py  celerybeat --settings=settings
"""
import datetime

from celery import task
from celery.schedules import crontab
from celery.task import periodic_task

from common.log import logger
from home_application.tasks.sys import sync_sys_load_avg_main


@periodic_task(run_every=crontab(minute='*/1', hour='*', day_of_week="*"))
def sync_sys_load_avg():

    logger.info(u"开始获取系统负载！")
    try:
        sync_sys_load_avg_main(1)
    except Exception as e:
        logger.exception("sync sys load error!")
        return
    logger.info(u"获取系统负载完成！")
