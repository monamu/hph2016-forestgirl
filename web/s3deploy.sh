#!/bin/sh

aws s3 sync page1/build/ s3://forestgirl/page1/ --delete
aws s3 sync page2/build/ s3://forestgirl/page2/ --delete 
