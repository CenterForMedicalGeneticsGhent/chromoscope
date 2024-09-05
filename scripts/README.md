# Chromoscope

## presigned_url_scripts
This folder contains scripts that are used to process datasets and for generating AWS presigned URLS for a cohort.


## S3_Bucket_Query_to _hromoscope

This folder contains scripts for querying a locally hosted S3 bucket, selecting files of interest, and either generating a `config.json` file or visualizing the data directly in Chromoscope using the external URL parameter.

**Important:** Before running the scripts, ensure that the S3 bucket name and credentials are properly configured in `app.py` and `scripts.js`.
