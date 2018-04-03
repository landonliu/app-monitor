# -*- coding: utf-8 -*-
import base64
import os
import socket
import struct
import select
import time

try:
    load_avg = float("a")
except Exception as e:
    print "123"
    print e