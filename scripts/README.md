# Chromoscope

## presigned_url_scripts
This folder contains scripts that are used to process datasets and for generating AWS presigned URLS for a cohort.


## S3_Bucket_Query_to_chromoscope

This folder contains scripts for querying a locally hosted S3 bucket, selecting files of interest, and either generating a `config.json` file or visualizing the data directly in Chromoscope using the external URL parameter.

**Important:** Before running the scripts, ensure that the S3 bucket name and credentials are properly configured in `app.py` and `scripts.js`.

## file_creation_for_higlassserver

This folder contains scripts that are used to create different filetypes used in Higlass, such as multivec files and bed files. The `beddb_file_creation_from_tsv.sh` bash script is used to run both the `tsv_to_bed_bash.py` file which will create a bed file and then encode and upload it to a local higlass server.
