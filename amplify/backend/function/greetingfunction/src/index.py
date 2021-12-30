import json
import csv
import boto3
import pandas as pd
import os
import datetime as dt
from io import BytesIO


def handler(event, context):
    bucket = 'sanja-web-files'
    s3_client = boto3.client("s3")
    prefix = 'public'
    s3 = boto3.resource('s3')
    my_bucket = s3.Bucket(bucket)

    for my_bucket_object in my_bucket.objects.filter(Prefix=prefix):
        if my_bucket_object.key.endswith('csv'):
            print(my_bucket_object.key)
            bucket_name = bucket
            key_name = my_bucket_object.key

            s3_object = s3_client.get_object(Bucket=bucket_name, Key=key_name)
            data = s3_object['Body'].read().decode('utf-8')
            df_s3_data = pd.read_csv(data)
            print(df_s3_data.head())

    body = {
        'message': "sanja bravo"
    }

    response = {
        'statusCode': 200,
        'body': json.dumps(df_s3_data),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT'
        },
    }

    return response

