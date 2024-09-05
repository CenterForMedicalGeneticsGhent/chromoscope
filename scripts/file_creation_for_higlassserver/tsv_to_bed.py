import pandas as pd
import os
import fuc
import re
os.chdir("../..")
os.chdir("documents2/stage/test_data")
df = pd.read_csv("D2201410_new.tsv", delimiter="\t")
df = df.drop(columns=['Sample'])
df.columns = ['Chromosome', 'Start', 'End','REF', 'ALT','BAF']
df['Chromosome'] = 'chr' + df['Chromosome'].astype(str)
bf = fuc.pybed.BedFrame.from_frame(meta=[], data=df)
bf.to_file('D2201410_new.bed')
