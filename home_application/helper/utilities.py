# -*- coding: utf-8 -*-
from common.mymako import render_json
import datetime


success_result = {'result': True, 'message': ''}

fail_result = {'result': False, 'message': ''}


def render_success_json(data={}):
    return render_json({"result": True, "message": "", "data": data})


def render_fail_json(msg):
    return render_json({"result": False, "message": msg})


def get_time_delta(**kwargs):
    time = datetime.datetime.now() + datetime.timedelta(minutes=kwargs["minutes"])
    return time


def get_time_now():
    return datetime.datetime.now()


def get_time_delta_str(**kwargs):
    time = datetime.datetime.now() + datetime.timedelta(minutes=kwargs["minutes"])
    return time.strftime("%Y-%m-%d %H:%M:%S")


def get_time_now_str():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def execute_script(host_list=[], script=""):
    # TODO： 调用作业平台执行脚本，返回IP_LOG
    return [{"ip": "192.168.0.10", "log_content": "0.35 0.57 0.27 2/261 12000"}]


def get_host_list(app_id):
    # TODO: 从CMDB获取应用的主机信息
    return [{"ip": "192.168.0.10", "cloud_id": 1, "server_name": "db01", "desc": "OracleDB01", "role": "db",
             "os_type": "linux"}]
