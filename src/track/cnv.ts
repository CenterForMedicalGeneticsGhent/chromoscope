import { SingleTrack, OverlaidTracks } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from './index';

export default function cnv(
    sampleId: string,
    cnvUrl: string,
    width: number,  
    height: number,
    mode: TrackMode,
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-cnv`,
        title: mode === 'small' ? '' : 'Copy Number Variants',
        style: { background: '#FFFFFF' },
        data: {
            separator: '\t',
            url: cnvUrl,
            type: 'csv',
            chromosomeField: 'seqnames',
            genomicFields: ['start', 'end']
        },
        mark: 'rect',
        x: { field: 'start', type: 'genomic' },
        xe: { field: 'end', type: 'genomic' },
        alignment: 'overlay',
        tracks: [
            {
                mark: 'point',
                y: { field: 'ratio', type: 'quantitative', axis: 'right', grid: true, range: [0 + 10, height - 10], domain: [-2, 2]},
                color: { value: '#ADD8E6' },
                stroke: { value: '#808080' },
                strokeWidth: { value: 1 },
                opacity: { value: 0.6 }
            },
            {   
                mark: 'line',
                y: { field: 'seg.mean', type: 'quantitative', axis: 'right', grid: true, range: [0 + 10, height - 10], domain: [-2, 2] },
                color: { value: '#008080' },
                size: { value: 4 },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2 },
                opacity: { value: 1 }
            }
        ],
        tooltip: [

            { field: 'seqnames', type: 'nominal', alt: 'Chromosome' }, 
            { field: 'start', type: 'genomic', alt: 'Start' },  
            { field: 'end', type: 'genomic', alt: 'End' }, 
            { field: 'ratio', type: 'quantitative',  format: '.5f' },
            { field: 'seg.start', type: 'quantitative', alt: 'Segment Start' },  
            { field: 'seg.end', type: 'quantitative', alt: 'Segment End' }, 
            { field: 'seg.mean', type: 'quantitative' }
        ],
        width,
        height
    };
}
