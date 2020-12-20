#!/bin/bash
database=nhs_virtual_visit_dev
databasedir=database
wait_time=15s
password=P@55w0rd

# wait for SQL Server to come up
echo create databse starts in $wait_time...
sleep $wait_time
echo create database...

# run the database script to create the DB and the tables in /table
/opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U sa -P $password -i ./$databasedir/database.sql
