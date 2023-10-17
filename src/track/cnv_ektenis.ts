import { SingleTrack, OverlaidTracks } from 'gosling.js/dist/src/core/gosling.schema';
import { TrackMode } from './index';

export default function cnv(
    sampleId: string,
    cnvUrl: string,
    width: number,
    height: number,
    mode: TrackMode,
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-cnv-ektenis`,
        title: mode === 'small' ? '' : 'Copy Number Variants (rect)',
        style: { background: '#FFFFFF' },
        "data": {
            "type": "beddb",
            "url": cnvUrl,
            "genomicFields": [
                {"index": 1, "name": "start"},
                {"index": 2, "name": "end"}
            ],	
            "valueFields": [
                {"index": 0, "name": "chr", "type": "nominal"},
                {"index": 3, "name": "exp", "type": "nominal"},
                {"index": 4, "name": "r", "type": "quantitative"},
                {"index": 5, "name": "priority", "type": "quantitative"},
            ]
        },
        mark: 'rect',
        x: { field: 'start', type: 'genomic' },
        xe: { field: 'end', type: 'genomic' },
        y: { 
            field: "r", 
            type: 'quantitative', 
            axis: 'right', 
            grid: true, 
            range: [0 + 10, height - 10],
            domain: [-1.5,1.5],
        },
        alignment: 'overlay',
        tracks: [
            {
                size: { value: 1 },
                dataTransform: [
                    {
                        type: "filter",
                        field: "r",
                        inRange: [-0.35, 0.35],
                    },
                ],
            },
            {
                color: { value: '#0072B2' }, //Blue
                stroke: { value: '#0072B2' }, //Blue
                dataTransform: [
                    {
                        type: "filter",
                        field: "r",
                        inRange: [0.35, 100],
                    },
                ],
            },
            {   
                color: { value:"#D45E00" }, //Red
                stroke: { value:"#D45E00" }, //Red
                dataTransform: [
                    {
                        type: "filter",
                        field: "r",
                        inRange: [-100, -0.35],
                    },
                ],
            },
        ],
        tooltip: [
            { field: "r", type: 'quantitative' },
            { field: "exp", type: 'quantitative' },
            { field: "chr", type: 'quantitative' },
            { field: "start", type: 'quantitative' },
            { field: "end", type: 'quantitative' },
        ],
        size: { value: 5 },
        stroke: { value: '#808080' },
        color: { value: '#808080' },
        strokeWidth: { value: 2 },
        opacity: { value: 0.7 },
        width,
        height
    };
}
