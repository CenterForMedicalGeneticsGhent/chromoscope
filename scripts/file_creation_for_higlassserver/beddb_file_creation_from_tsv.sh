#!/usr/bin/env bash

#check if length of the arguments gives all needed info
if [[ "$#" -ne 2 ]]; then
        echo "incorrect number of arguments: eg: script filepath filetype (eg. baf)"
        exit 1
fi

filepath="$1"
filepath_array=($(echo $filepath| cut -d. -f1))
for i in "${filepath_array[@]}"  
do  
echo $i
done
new_bed_file_name=${filepath_array[0]}
new_bed_file_name+=".bed"
uploaded_file_name=$new_bed_file_name
uploaded_file_name+=".beddb"
#python tsv_to_bed_bash.py $1 $2

clodius aggregate bedfile --chromsizes-filename hg19.chrom.sizes $new_bed_file_name
higlass-manage ingest $uploaded_file_name --filetype bedfile --datatype bedlike --assembly hg19
