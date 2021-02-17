#!/bin/bash

mongo --host db:27017 <<EOF
rs.initiate({"_id":"rs0", "members":[{"_id":0,"host":"db:27017"}] })
EOF