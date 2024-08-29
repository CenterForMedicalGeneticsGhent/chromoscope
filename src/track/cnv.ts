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
        style: { background: '#FFFFFF', inlineLegend: true},
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
                y: { field: 'ratio', type: 'quantitative', axis: 'left', grid: true, range: [0 + 10, height - 10], domain: [-2.4, 2.4]},
                color: {
                    field: 'threshold', type: 'nominal',
                    range: ['#FF0000', '#800080', '#ADD8E6', '#FFFF00','#FE66E7', '#008000' ],  
                    domain: [ 'ratio<-1.0 (loss of 1 copy or more)', '-1.0< ratio<-0.3 (sign. loss)',
                            '-0.3<=ratio<=0.3 (+/- normal)', '0.3<ratio<0.585 (sign. gain)', 
                            '0.585<=ratio<1.0 (gain of at least 1 copy)',
                            'ratio>= 1.0 (copies at least doubled)'
                     ],
                     legend: true
                },
                stroke: { value: '#808080' },
                strokeWidth: { value: 1 },
                opacity: { value: 0.6 }
            },
            {   
                mark: 'line',
                y: { field: 'seg.mean', type: 'quantitative', axis: 'left', grid: true, range: [0 + 10, height - 10], domain: [-2.4, 2.4] },
                color: {
                    field: 'seg_threshold', type: 'nominal',
                    range: ['#FF0000', '#800080', '#ADD8E6', '#FFFF00','#FE66E7', '#008000' ],  
                    domain: [ 'ratio<-1.0 (loss of 1 copy or more)', '-1.0< ratio<-0.3 (sign. loss)',
                            '-0.3<=ratio<=0.3 (+/- normal)', '0.3<ratio<0.585 (sign. gain)', 
                            '0.585<=ratio<1.0 (gain of at least 1 copy)',
                            'ratio>= 1.0 (copies at least doubled)'
                     ]
                },
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