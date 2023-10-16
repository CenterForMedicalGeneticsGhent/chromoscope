import { SingleTrack, OverlaidTracks } from 'gosling.js/dist/src/core/gosling.schema';
import { TrackMode } from './index';

const URL_BASE = "http://localhost:8989/api/v1/tileset_info/?d="
const UUID_RAW = "test_109244_raw"
const URL_RAW = URL_BASE+UUID_RAW

export default function cnv_ektenis(
    sampleId: string,
    width: number,
): SingleTrack {
    return {    
        "mark": "rect",
        "data": {
            "type": "beddb",
            "url": URL_RAW,
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
        "x": {
            "field": "start",
            "type": "genomic",
            "linkingId": "linking-with-brush",
            "axis": "none",
        },
        "xe": {
            "field": "end",
            "type": "genomic",
        },
        "dataTransform": [
            {
                "type": "filter",
                "field": "r",
                "inRange": [-0.35, 0.35],
            },
        ],
        "y":{
            "field": "r",
            "type": "quantitative",
            "domain": [-1.6,1.6],
        },
        "size": {
            "value": 1,
        },
        "strokeWidth": {
            "value": 2,
        },
        width,
        height: 200,
    }
}
