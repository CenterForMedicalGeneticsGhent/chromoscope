import { SingleTrack, OverlaidTracks, Datum } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from './index';

export default function haplo(
    sampleId: string,
    haploUrl: string,
    width: number,  
    height: number,
    mode: TrackMode,
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-haplo`,
        title: '  Haplotyping by Merlin',
        style: { background: '#FFFFFF', inlineLegend: true},
        data: {
            separator: '\t',
            url: haploUrl,
            type: 'csv',
            chromosomeField: 'chromosome',
            genomicFields: ['break_start', 'break_end']
        },
        alignment: 'overlay',
        tracks: [
            { 
                mark: 'rect',
                x: { field: 'break_start', grid: true, type: 'genomic'},
                xe: { field: 'break_end', grid: true, type: 'genomic'},
                y: { field: 'y', type: 'quantitative', grid: true, domain: [-2, 15]},
                color: { field: 'col', type: 'nominal'  },
                size: {value: 10},
                stroke: { value: '#000000' },
                strokeWidth: { value: 1 },
                opacity: { value: 0.8 }
            }
        ],

        tooltip: [
            { field: 'chromosome', type: 'nominal', alt: 'Chromosome' },
            { field: 'break_start', type: 'genomic', alt: 'Breakpoint start'},
            { field: 'break_end', type: 'genomic', alt: 'Breakpoint end' },
            { field: 'sample_id', type: 'nominal', alt: 'Sample' }
        ], 
        width,
        height
    };
}
