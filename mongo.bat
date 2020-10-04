docker run -d --name kippa-mongo -p 27017:27017 mongo mongod --replSet rs0 --port 27017

docker exec -it kippa-mongo mongo

REM run this inside docker exec
REM rs.initiate({"_id":"rs0", "members":[{"_id":0,"host":"localhost:27017"}] })