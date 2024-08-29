import { StackedTracks, OverlaidTracks } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from './index';

export default function GQbin(
    sampleId: string,
    url: string,
    width: number,
    height: number,
    mode: TrackMode
): OverlaidTracks {
    const sampleId2 = 'D2409912';
    return {
        id: `${sampleId}-${mode}-GQbin`,
        title: 'Genotype Quality Spectrum',
        style: { background: '#FFFFFF', inlineLegend: true },
        alignment: 'overlay',
        data: {
            separator: '\t',
            url: url,
            type: 'csv',
            chromosomeField: 'Chromosome',
            genomicFields: ['Midpoint'],
            sampleLength: 1500
        },
        tracks: [
            {
                dataTransform: [{
                    type: 'filter',
                    field: 'Part',
                    oneOf: ['genome']
                }],
                mark: 'bar',
                x: { field: 'Midpoint', type: 'genomic' },
                y: { field: 'Amount_log_GQ', type: 'quantitative', axis: 'left', range: [0, height - 20]},
                size: { value: width / 50 },
                color: { value: '#E69F00' },
                stroke: {value: 'white'},
                strokeWidth: { value: 0.5 },
                visibility: [{
                    threshold: 250000000,
                    target: 'track',
                    operation: 'GT',
                    measure: 'zoomLevel'
                }],
            },
            {
                dataTransform: [{
                    type: 'filter',
                    field: 'Part',
                    oneOf: ['chrom']
                }],
                mark: 'bar',
                x: { field: 'Midpoint', type: 'genomic' },
                y: { field: 'Amount_log_GQ', type: 'quantitative', axis: 'left', range: [0, height - 20] },
                size: { value: width / 65 },
                color: { value: '#E69F00' },
                stroke: {value: 'white'},
                strokeWidth: { value: 0.5 },
                visibility: [{
                    threshold: 250000000,
                    target: 'track',
                    operation: 'LT',
                    measure: 'zoomLevel'
                }],
            }
        ],
        width,
        height,
        tooltip: [
            { field: 'GQ_bin', type: 'nominal', alt: 'Genotype Quality' },
            { field: 'Amount_GQ', type: 'nominal', alt: 'Amount' }
        ]
    };
}
