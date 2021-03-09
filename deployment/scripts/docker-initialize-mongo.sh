#!/bin/bash

echo "[*] Starting replica set initialize"
echo "user: $1 pass: $2"
until mongo -u "$1" -p "$2" --host db:27017 --eval "print(\"[*] Waiting for connection...\")"
do
    sleep 1
done
echo "[+] Connection exists"
echo "[*] Creating replica set"

user=$1
pass=$2
db_name=$3

mongo --host db:27017 -u "$user" -p "$pass" <<-EOJS

use $db_name
db.createUser(
    {
		user: "$user",
		pwd: "$pass",
		roles: [ "readWrite" ]
	}
)

rs.initiate(
    {
        "_id": "rs0", 
        "members": [
            { "_id": 0,"host" :"db:27017" }
        ] 
    }
)

EOJS

echo "[+] Replica set created!"