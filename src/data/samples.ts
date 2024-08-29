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
        group: 'default',
        id: 'Proband_22_10969',
        cancer: 'Albinism',
        assembly: 'hg38',
        vcf: 'https://somatic-browser-test.s3.amazonaws.com/SNV_test_tumor_normal_with_panel.vcf.gz',
        vcfIndex: 'https://somatic-browser-test.s3.amazonaws.com/SNV_test_tumor_normal_with_panel.vcf.gz.tbi',
        vcf2: 'https://somatic-browser-test.s3.amazonaws.com/INDEL_test_tumor_normal_with_panel.vcf.gz',
        vcf2Index: 'https://somatic-browser-test.s3.amazonaws.com/INDEL_test_tumor_normal_with_panel.vcf.gz.tbi',
        cnv: 'https://gist.githubusercontent.com/sehilyi/6fbceae35756b13472332d6b81b10803/raw/596428a8b0ebc00e7f8cbc52b050db0fbd6e19a5/SRR7890943.ascat.v3.cnv.tsv',
        me: 'https://gist.githubusercontent.com/Maximvan/e235c862e2e05330428bfc1593709f41/raw/794d148d7820dd1b5aff1377fdf5e106fd4cd6c3/x.csv',
        me2: 'https://gist.githubusercontent.com/Maximvan/e4fdc9ad80ed9477a793f1ccdeeca298/raw/2d7283e83039e63e72da77fb32f966da7e787ec3/x_detail.csv',
        pm: 'https://gist.githubusercontent.com/Maximvan/09b840919ff017ddc0c1e33bc48152c0/raw/874d04ad1dbce4504da23ec487afbb83ec0e8f51/parentmapping.csv',
        haplo: 'http://localhost:8000/output_dat_haplo_correct.tsv',
        roi: 'https://gist.githubusercontent.com/Maximvan/6d47f196bcac0f28c64b2e491c231a7f/raw/d27d8d1da4531b7740457afba6471de9d74a59fb/ROI.csv',
        note: 'CNV profile - ASCAT. SVs - Sentieon. Mutations and indels - Sentieon',
        binStats: 'https://gist.githubusercontent.com/Maximvan/2095620fd812dc3a708fae3905d16573/raw/e25e46b348da485c8ea0ae10303a0bedac854ebe/binned_stats.tsv',
        summary: 'https://gist.githubusercontent.com/Maximvan/e2ad6bf0bb0ad707c9ec8a1d19684ee2/raw/24e9834c6fce7a79e7f417b69107e578a15d1ef8/chromozome1.csv',
        sample: 'D2409912,D2409911,D2320995',
        thumbnail: SRR7890905
    }
];

export default samples;
