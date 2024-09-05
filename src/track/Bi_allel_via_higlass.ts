import { OverlaidTracks } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from './index';

export default function biAlleleFrequency(
    sampleId: string,
    url: string,
    width: number,
    height: number,
    mode: TrackMode
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-bi-allele-frequency`,
        title: mode === 'small' ? '' : 'Bi Allele Frequency',
        style: { background: '#FFFFFF' },
        data: {
            type: 'beddb',
            url: url,
            genomicFields: [ 
                {index: 1, name: "start"},
                {index: 2, name: "end"}
            ],	
            valueFields: [
                {index: 0, name: "chromosome", type: "nominal"},
                {index: 5, name: "BAF", type: "quantitative"},
                {index: 3, name: "ref", type:"nominal"},
                {index: 4, name: "alt", type:"nominal"}
            ]
        },
        mark: "point",
        x: { field: 'start', type: 'genomic' },
        alignment: 'overlay',
        tracks: [
        {
            y:{
                field: "BAF",
                type: "quantitative",
                axis: 'right', 
                grid: true, 
                domain: [0.1,1.1],  
            },
            color: { value: '#3ebecf' }
        },
        ],
        tooltip: [
            { field: "BAF", type: 'quantitative' },
            { field: "chromosome", type: 'quantitative' },
            { field: "start", type: 'quantitative' },
            { field: "end", type: 'quantitative' },
            {field: "ref", type: 'nominal'},
            {field: "alt", type: 'nominal'}
        ],
        size: { value: 3 },
        stroke: { value: '#808080' },
        strokeWidth: { value: 1 },
        opacity: { value: 0.7 },
        width,
        height,
    };
}
