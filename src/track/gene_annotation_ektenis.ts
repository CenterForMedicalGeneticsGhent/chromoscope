import { SingleTrack, OverlaidTracks } from 'gosling.js/dist/src/core/gosling.schema';
import { TrackMode } from './index';

export default function cnv(
    sampleId: string,
    url: string,
    width: number,
    height: number,
    mode: TrackMode,
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-gene-annotation-ektenis`,
        title: mode === 'small' ? '' : 'MANE',
        style: { background: '#FFFFFF' },
        "data": {
            "type": "beddb",
            "url": "http://localhost:8989/api/v1/tileset_info/?d=mane",
            "genomicFields": [
                {"index": 1, "name": "start"},
                {"index": 2, "name": "end"},
            ],	
            "valueFields": [
                {'index': 0, 'name': "chr", 'type': 'nominal'},
                 {'index': 3, 'name': "ID", 'type': 'nominal'},
                 {'index': 4, 'name': "priority", 'type': 'nominal'},
                 {'index': 5, 'name': "strand", 'type': 'nominal'},
                 {'index': 6, 'name': "source", 'type': 'nominal'},
                 {'index': 7, 'name': "feature_type", 'type': 'nominal'},
                 {'index': 8, 'name': "rgb", 'type': 'nominal'},
                 {'index': 9, 'name': 'Name', 'type': 'nominal'},
            ]
        },
        mark: 'rect',
        x: { field: 'start', type: 'genomic' },
        xe: { field: 'end', type: 'genomic' },
        "y": {
            "value": 25,
            "domain": [-10,110],
        },
        alignment: 'overlay',
        tracks: [
            {
                mark: "text",
                "text": {
                    "field": "Name", 
                    "type": "nominal",
                },
                "visibility": [
                    {
                        "operation": "less-than",
                        "measure": "width",
                        "threshold": "|xe-x|",
                        "transitionPadding": 10,
                        "target": "mark",
                    },
                ],
                "dataTransform": [
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["+"]
                    },
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["gene"],
                    },
                ],
                y: {
                    "value": 90,
                    "domain": [-10,110],
                },
                color: { value: "#0072B2" }, //Blue
                stroke: { value: "#0072B2" }, //Blue
                "style": {
                    "fontSize": 50,
                },
            },
            {
                mark: "triangleRight",
                "dataTransform": [
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["+"]
                    },
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["gene"],
                    },
                ],
                y: {
                    "value": 65,
                    "domain": [-10,110],
                },
                x: { field: 'end', type: 'genomic' },
                xe: {},
                color: { value: "#0072B2" }, //Blue
                stroke: { value: "#0072B2" }, //Blue
                size: { value: 20 },
            },
            {
                "dataTransform": [
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["+"]
                    },
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["gene"],
                    },
                ],
                y: {
                    "value": 65,
                    "domain": [-10,110],
                },
                color: { value: "#0072B2" }, //Blue
                stroke: { value: "#0072B2" }, //Blue
                size: { value: 5 },
            },
            {
                dataTransform: [
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["exon"],
                    },
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["+"],
                    },
                ],
                y: {
                    "value": 65,
                    "domain": [-10,110],
                },
                color: { value: "#0072B2" }, //Blue
                stroke: { value: "#0072B2" }, //Blue
                size: { value: 20 },
            },
            {
                mark: "text",
                "text": {
                    "field": "Name", 
                    "type": "nominal",
                },
                "visibility": [
                    {
                        "operation": "less-than",
                        "measure": "width",
                        "threshold": "|xe-x|",
                        "transitionPadding": 10,
                        "target": "mark",
                    },
                ],
                "dataTransform": [
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["-"]
                    },
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["gene"],
                    },
                ],
                y: {
                    "value": 10,
                    "domain": [-10,110],
                },
                color: { value: "#D45E00" }, //Orange
                stroke: { value: "#D45E00" }, //Orange
                "style": {
                    "fontSize": 50,
                },
            },
            {
                mark: "triangleLeft",
                "style": {
                    "align": "right",
                },
                "dataTransform": [
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["-"]
                    },
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["gene"],
                    },
                ],
                y: {
                    "value": 35,
                    "domain": [-10,110],
                },
                x: { field: 'start', type: 'genomic' },
                xe: {},
                color: { value: "#D45E00" }, //Orange
                stroke: { value: "#D45E00" }, //Orange
                size: { value: 20 },
            },
            {
                "dataTransform": [
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["-"]
                    },
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["gene"],
                    },
                ],
                y: {
                    "value": 35,
                    "domain": [-10,110],
                },
                color: { value: "#D45E00" }, //Orange
                stroke: { value: "#D45E00" }, //Orange
                size: { value: 5 },
            },
            {
                dataTransform: [
                    {
                        "type": "filter",
                        "field": "feature_type", 
                        "oneOf": ["exon"],
                    },
                    {
                        "type": "filter",
                        "field": "strand", 
                        "oneOf": ["-"],
                    },
                ],
                y: {
                    "value": 35,
                    "domain": [-10,110],
                },
                color: { value: "#D45E00" }, //Orange
                stroke: { value: "#D45E00" }, //Orange
                size: { value: 20 },
            },
            
        ],
        tooltip: [
            { field: "Name", type: 'nominal' },
            { field: "feature_type", type: 'nominal' },
            { field: "chr", type: 'quantitative' },
            { field: "strand", type: 'nominal' },
            { field: "start", type: 'quantitative' },
            { field: "end", type: 'quantitative' },
        ],
        strokeWidth: { value: 1 },
        opacity: { value: 0.95 },
        width,
        height
    };
}
