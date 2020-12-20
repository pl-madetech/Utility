#!/bin/bash
database=nhs_virtual_visit_dev
databasedir=database
wait_time=15
password=P@55w0rd

# wait for SQL Server to come up
echo waiting database to start in $(eval echo $wait_time)s...
for i in $(eval echo {$wait_time..01})
do
tput cup 4 $l
echo -n "$i"
sleep 1
done
echo
echo database started...

# run the database script to create the DB and the tables in /table
/opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U sa -P $password -i ./$databasedir/database.sql
