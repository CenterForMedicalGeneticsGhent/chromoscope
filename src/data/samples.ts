import { Assembly } from 'gosling.js/dist/src/gosling-schema';
import _7a921087 from '../script/img/7a921087-8e62-4a93-a757-fd8cdbe1eb8f.jpeg';
import _84ca6ab0 from '../script/img/84ca6ab0-9edc-4636-9d27-55cdba334d7d.jpeg';
import _7d332cb1 from '../script/img/7d332cb1-ba25-47e4-8bf8-d25e14f40d59.jpeg';
import _9ae0744a from '../script/img/9ae0744a-9bc1-4cd7-b7cf-c6569ed9e4aa.jpeg';
import _b27d75ba from '../script/img/b27d75ba-5989-4200-bfe9-f1b7d7cf8008.jpeg';
import _fc8edf46 from '../script/img/fc8edf46-2005-1af4-e040-11ac0d481414.jpeg';
import SRR7890905 from '../script/img/SRR7890905.jpg';
import SRR7890905_Hartwig from '../script/img/SRR7890905_Hartwig.jpg';
import _bc0dee07 from '../script/img/GACA-CN-bc0dee07-de20-44d6-be65-05af7e63ac96.jpeg';
import _f1504811 from '../script/img/OV-AU-f1504811-8363-41e6-b43c-62452b1262d3.jpeg';
import _89dad92e from '../script/img/OV-AU-89dad92e-5b3f-479a-a6da-a94ee7df7f8a.jpeg';
import _b243adb4 from '../script/img/OV-US-b243adb4-b3e7-4e0e-bc0d-625aa8dbb1be.jpeg';
import _84ca6ab0_OV from '../script/img/OV-US-84ca6ab0-9edc-4636-9d27-55cdba334d7d.jpeg';
import _0bfd1043 from '../script/img/OV-US-0bfd1043-816e-e3e4-e050-11ac0c4860c5.jpeg';

export type SampleType = {
    group: 'default' | 'doga' | 'vcf';
    id: string; // "aliquot ID"
    cancer: string; // cancer type
    assembly: Assembly; // hg19 or 38
    cnv?: string; // URL of txt
    me?: string;
    me2?: string;
    pm?: string;
    haplo?: string;
    roi ?: string;
    baf?: string;
    vcf?: string;
    vcfIndex?: string;
    vcf2?: string;
    vcf2Index?: string;
    cnFields?: [string, string, string];
    thumbnail?: string;
    note?: string;
    binStats?: string;
    sample?: string;
    summary?: string;
};

// const samples: SampleType[] = (pcawg as SampleType[]).map(d => { return { group: 'default', ...d }});
// console.log(samples);

const samples: SampleType[] = [
   
        {
            "group": "default",
            "id": "D2323937",
            "assembly": "hg38",
            "cancer": "disease1",
            "vcf": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/Proband_21_20054-gatk-haplotype-joint-annotated_K2400391_K2400392_K2400393.vcf.gz?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=3d0735dea22920549d322450ef2c7b5abfb2b2d28fa9af4f909954cfb5850269",
            "vcfIndex": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/Proband_21_20054-gatk-haplotype-joint-annotated_K2400391_K2400392_K2400393.vcf.gz.tbi?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=27e13c71d52945c1e5936f7d354f9705eb3353119757494bccd92d264955a807",
            "baf": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2201410_BAF_K2400391.tsv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bd6a9797ff6eed3a2dfcebda9fab197bbec43604627f1f4a051d5a4c4a84a00d",
            "cnv": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2201410_output_combined_CNV_K2400391.tsv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4a2128df70ed53b92c0dae854966d5f3ca840044d500de6a3fe4405460080ec2",
            "me": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2201410_windowed_errors_K2400391.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=514ea32b7641eab5d1e87b75b5054e77dd5fae41bd84814b0731e04de234df06",
            "me2": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2323937_man_err_frame_K2400391.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=3419c4b9d7f2406ef42cd89712b5187fde2f607af865fc814d2b1366f7e91097",
            "pm": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2323937_pm_tracks_K2400391.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8294333d38e702d073d00d7afd30e873d567c44b26605bc872f11e0784108504",
            "haplo": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2201410_output_dat_haplo_K2400391_K2400392_K2400393.tsv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ee61f695d0ab67421046cbf3bdcc406f6297c46b7476ba1f1703b640558c996f",
            "binStats": "https://s3.eu-central-003.backblazeb2.com/InternshipCMGGbucket/Proband_21_20054/D2201410_variant_bins_K2400391.tsv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=00341032759cd2e0000000001%2F20240904%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240904T102738Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=38e5c63c6697daeacef8404d14374926ca1430fd2a3e22852a43a4264701fd47"
        }
];

export default samples;
