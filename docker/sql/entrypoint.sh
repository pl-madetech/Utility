#!/bin/bash

databasedir=database
password=P@55w0rd

# run the database script to create the DB
/opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U sa -P $password -i ./$databasedir/database.sql
