import { SingleTrack } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from '.';

const hex = 'red';

export default function roi(parent: string, roiUrl: string, mode: TrackMode): Partial<SingleTrack> {
    return {
        id: `${parent}-${mode}-roi`,
        data: {
            separator: ',',
            url: roiUrl,
            type: 'csv',
            chromosomeField: 'CHROM',
            genomicFields: ['POS'],
            sampleLength: 5000
        },
        mark: mode === 'mid' ? 'rule' : 'rect',
        x: { field: 'POS', type: 'genomic' },
        color: { value: hex },
        opacity: { value: 0.5 },
        overlayOnPreviousTrack: true
    };
}
