import json
import csv
import boto3
import os
import datetime as dt


def handler(event, context):
    current_time = dt.datetime.now().time()
    bucket = 'sanja-web-files'
    s3_client = boto3.client("s3")
    prefix = 'public'
    s3 = boto3.resource('s3')
    my_bucket = s3.Bucket(bucket)


    json_data = []
    datestamp = dt.datetime.now().strftime("%Y/%m/%d")
    timestamp = dt.datetime.now().strftime("%s")

    for my_bucket_object in my_bucket.objects.filter(Prefix="public/"):
        bucket_name = bucket
        key_name = my_bucket_object.key

        filename_json = "/tmp/file_{ts}.json".format(ts=timestamp)
        filename_csv = "/tmp/file_{ts}.csv".format(ts=timestamp)
        keyname_s3 = "output/{ds}_{ts}.json".format(ds=datestamp, ts=timestamp)

        json_data = []

        s3_object = s3_client.get_object(Bucket=bucket_name, Key=key_name)
        data = s3_object['Body'].read()
        contents = data.decode('utf-8')


        with open(filename_csv, 'a') as csv_data:
            csv_data.write(contents)

        with open(filename_csv) as csv_data:
            csv_reader = csv.DictReader(csv_data)
            for csv_row in csv_reader:
                json_data.append(csv_row)


    os.remove(filename_csv)

    body = {
        'message': {"sanja":"bravo"}
    }

    response = {
        'statusCode': 200,
        'body': json.dumps(body),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT'
        },
    }

    return response

