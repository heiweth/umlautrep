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
            key_name = my_bucket_object.key

            s3_object = s3_client.get_object(Bucket=bucket, Key=key_name)
            data = s3_object['Body']
            df_s3_data = pd.read_csv(s3_object['Body'])
            df_headers = df_s3_data.columns
            df_json = json.loads(df_s3_data.to_json(orient='records'))

    body = {
        'message': "sanja bravo"
    }

    response = {
        'statusCode': 200,
        'body': df_json,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT'
        },
    }

    return response

