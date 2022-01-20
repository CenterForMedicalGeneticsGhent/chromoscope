import { SingleTrack, OverlaidTracks } from 'gosling.js/dist/src/core/gosling.schema';
import { TrackMode } from './index';

export default function cnv(
    sampleId: string,
    cnvUrl: string,
    width: number,
    height: number,
    mode: TrackMode
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-cnv`,
        title: mode === 'small' ? '' : 'CNV',
        style: { background: '#FFFFFF' },
        data: {
            separator: '\t',
            url: cnvUrl,
            type: 'csv',
            chromosomeField: 'chromosome',
            genomicFields: ['start', 'end'],
            quantitativeFields: ['major_cn', 'minor_cn']
        },
        mark: 'rect',
        x: { field: 'start', type: 'genomic' },
        xe: { field: 'end', type: 'genomic' },
        alignment: 'overlay',
        tracks: [
            {
                y: { field: 'major_cn', type: 'quantitative', axis: 'right', grid: true },
                color: { value: 'darkgray' }
            }
            // {
            //     y: { field: 'minor_cn', type: 'quantitative', axis: 'right', grid: true },
            //     color: { value: 'red' },
            // }
        ],
        tooltip: [
            { field: 'major_cn', type: 'quantitative' },
            { field: 'minor_cn', type: 'quantitative' }
        ],
        size: { value: 3 },
        opacity: { value: 0.8 },
        width,
        height
    };
}
