# -*- coding: utf-8 -*-
from home_application.helper import utilities as util
from common.log import logger
from home_application.models import SysLoadAvg
import json


def sync_sys_load_avg_main(app_id):
    # host_list example : [{"ip": "192.168.0.10","cloud_id": 1,"server_name": "db01", "desc": "OracleDB01"}]
    host_list = get_host_list(app_id)

    load_avg_detail = []
    # ip_load_avg_map example: {"10.0.0.210": 0.5}
    ip_load_avg_map = get_ip_load_avg_map(host_list)
    for host in host_list:
        load_avg_detail.append({
            "ip": host["ip"],
            "server_name": host["server_name"],
            "role": host["role"],
            "desc": host["desc"],
            "load_avg": ip_load_avg_map[host["ip"]],
        })

    load_total = 0
    for item in load_avg_detail:
        load_total += item["load_avg"]

    # 总体负载均值
    load_avg_total = load_total / len(host_list)

    SysLoadAvg.objects.create(app_id=app_id, time=util.get_time_now(),
                              load_avg_total=load_avg_total, load_avg_detail=json.dumps(load_avg_detail))


def get_host_list(app_id):
    return util.get_host_list(app_id)


def get_ip_load_avg_map(host_list=[]):
    ip_load_avg_map = {}

    # ip_log_list example : [{"ip": "10.0.0.210", "log_content": ""}]
    ip_log_list = util.execute_script(host_list, "cat /proc/loadavg")
    for ip_log in ip_log_list:
        load_avg = get_load_avg_by_log(ip_log)
        ip_load_avg_map[ip_log["ip"]] = load_avg
    return ip_load_avg_map


def get_load_avg_by_log(ip_log={}):
    ip = ip_log["ip"]
    log_content = ip_log["log_content"]

    log_content = log_content.strip()
    if not log_content:
        raise Exception("content is empty, ip:{0}".format(ip))

    log_arr = log_content.split(" ")
    if len(log_arr) != 5:
        raise Exception("content [{1}] is expected, ip:{0}".format(ip, log_content))

    try:
        load_avg = float(log_arr[1])
        return load_avg
    except Exception as e:
        logger.exception("convert load_avg to float error!, content:{}".format(log_content))

