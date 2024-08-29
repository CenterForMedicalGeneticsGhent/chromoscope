import { SingleTrack } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from './index';

export default function AFdetail(
    sampleId: string,
    url: string,
    width: number,
    height: number,
    mode: TrackMode
): SingleTrack {
    const sampleId2 = 'D2323937';
    return {
        id: `${sampleId}-${sampleId2}-${mode}-AFdetail`,
        title: 'Allele Frequency',
        style: { background: '#FFFFFF', inlineLegend: true },
        data: {
            separator: ',',
            url: url,
            type: 'csv',
            chromosomeField: `${sampleId2}.CHROM`,
            genomicFields: [`${sampleId2}.POS`]
        },
        mark: 'bar',
        x: { field: `${sampleId2}.POS`, type: 'genomic' },
        y: { field: `${sampleId2}.AF`, type: 'quantitative', axis: 'left' },
        color: { value: '#56B4E9' },
        tooltip: [
            { field: `${sampleId2}.POS`, type: 'genomic', alt: 'Position'},
            { field: `${sampleId2}.REF`, type: 'nominal', alt: 'Reference Allele'},
            { field: `${sampleId2}.ALT`, type: 'nominal', alt: 'Alternative Allele'},
            { field: `${sampleId2}.GT`, type: 'nominal', alt: 'Genotype'},
            { field: `${sampleId2}.AF`, type: 'nominal', alt: 'Allele Frequency' }
        ],
        width,
        height
    };
}
