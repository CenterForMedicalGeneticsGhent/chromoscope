export default function updateSpec(
        width: number, 
        height: number,
){
    return {
        width: width,
        height: height,
        alignment: "overlay",
        tracks: [ 
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-500.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-500.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 8000000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
                {
                    "operation": "greater-than",
                    "measure": "zoomLevel",
                    "threshold": 1600000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-1000.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-1000.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 1600000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
                {
                    "operation": "greater-than",
                    "measure": "zoomLevel",
                    "threshold": 800000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-2000.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-2000.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 800000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
                {
                    "operation": "greater-than",
                    "measure": "zoomLevel",
                    "threshold": 400000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-2428.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-2428.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 400000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-500.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-500.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 8000000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
                {
                    "operation": "greater-than",
                    "measure": "zoomLevel",
                    "threshold": 1600000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            //xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-1000.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-1000.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 1600000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
                {
                    "operation": "greater-than",
                    "measure": "zoomLevel",
                    "threshold": 800000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            //xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-2000.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-2000.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 800000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
                {
                    "operation": "greater-than",
                    "measure": "zoomLevel",
                    "threshold": 400000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            //xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        {
            mark: "rect",
            data: {
                url: "http://localhost/dev/genomic/2428-2428.bed.gz",
                indexUrl: "http://localhost/dev/genomic/2428-2428.bed.gz.tbi",
                type: "bed",
                customFields: [
                    "svtype",
                    "priority",
                    "identity",
                    "genotype",
                    "opacity_value",
                    "is_in_id_panel",
                ]
            },
            DataTransform: [
                { type: "concat", separator: "_", newField: "identitysvtype", fields: ["identity","svtype"],},
            ],
            visibility:[
                {
                    "operation": "less-than",
                    "measure": "zoomLevel",
                    "threshold": 400000000,
                    "target": "track",
                    "transitionPadding": 0,
                },
            ],
            x: { field: "chromStart", type: "genomic", axis: "top", grid: false, },
            //xe: { field: "chromEnd", type: "genomic", },
            y: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
            },
            color: {
                type: "nominal", 
                field: "identity",
                domain:["p0_DUP","p0_DEL","p0_INS","p0_INV","p0_BND","p0_CNV","p1_DUP","p1_DEL","p1_INS","p1_INV","p1_BND","p1_CNV","p2_DUP","p2_DEL","p2_INS","p2_INV","p2_BND","p2_CNV"],
                range:["blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey","blue","red","grey","orange","purple","grey"],
            },
            strokewidth: {
                value: 0
            }
        },
        ]
    };
}

