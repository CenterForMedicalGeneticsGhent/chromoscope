#!/usr/bin/python3
import pandas as pd
import sys
import fuc

filepath = sys.argv[1]
type_file = sys.argv[2]
if len(sys.argv) < 3:
    print("2 addition arguments are needed: format: tsv_to_bed_bash.py filepath filetype")
    sys.exit(1)
filename = filepath.split(".")
df = pd.read_csv(filepath, delimiter="\t")
if type_file.upper() == "BAF":
    df = df.drop(columns=['Sample'])
    df.columns = ['Chromosome', 'Start', 'End','REF', 'ALT','BAF']
    df['Chromosome'] = df['Chromosome'].apply(lambda x: f'chr{x}')
bf = fuc.pybed.BedFrame.from_frame(meta=[], data=df)
bf.to_file(f'{filename}.bed')
