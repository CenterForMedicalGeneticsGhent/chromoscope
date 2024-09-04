import pandas as pd
import os
import h5py
os.chdir("../..")
os.chdir("documents2/stage/test_data")

df = pd.read_csv("combined_filtered_CNV_data.tsv", sep="\t")
df.rename(columns={'seqnames':'chromosome'}, inplace=True)

grouped = df.groupby("chromosome")
df['chromosome'] = df['chromosome'].apply(lambda x: f'chr{x}')

chromosome_info = {}

temp_cols = df.columns.tolist()
new_cols = temp_cols[-1:] + temp_cols[:-1]
df = df[new_cols]
df = df.drop(columns=['range', 'mask', 'threshold', 'seg_threshold'])
unique_values = df['sample'].unique()
df.set_index('sample', inplace=True)

with open('sample_types.txt', 'w') as f:
    for value in unique_values:
        f.write(str(value) + '\n')
#for column in df.columns:

    #df[column] = df[column].astype('S')

#df.to_hdf("combined_csv_test.hdf5",key="df", mode='w', complevel=5)
with h5py.File('blah.h5', 'w') as f:
    # Group by the chromosome column
    for chromosome, group in df.groupby('chromosome'):
        # Convert the group (DataFrame) to a numpy array, excluding the chromosome column
        data = group.drop(columns=['chromosome'])

        # Create a dataset for each chromosome
        dset = f.create_dataset(chromosome, data.shape, data=data, compression='gzip')

for chrom_name, group in grouped:
    # Determine the number of rows for this chromosome
    num_rows = len(group)
    # Assuming all columns from 'start' onward are data columns (adjust as needed)
    num_columns = group.shape[1] - 3  # Adjust based on actual column positions

    # Store the size of this chromosome for the chromsizes file
    chromosome_info[chrom_name] = num_rows

with open("chromsizes.txt", 'w') as f:
    for chrom_name, size in chromosome_info.items():
        f.write(f"chr{chrom_name}\t{size}\n")


with h5py.File('blah.h5', 'r') as f:
    for key in f.keys():
        print(f"Dataset {key}: shape {f[key].shape}, dtype {f[key].dtype}")
