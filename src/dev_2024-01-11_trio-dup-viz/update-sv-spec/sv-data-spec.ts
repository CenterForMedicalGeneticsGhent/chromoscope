export default function svDataSpec(selectedTileset){
    const spec = {
        /**
        type : "beddb",
        url : "http://localhost:8989/api/v1/tileset_info/?d=" + selectedTileset,
        genomicFields : [
            {"index": 1, "name": "start"},
            {"index": 2, "name": "end"}
        ],	
        valueFields : [
            {"index": 0, "name": "chr", "type": "nominal"},
            {"index": 3, "name": "svtype", "type": "nominal"},
            // {"index": 4, "name": "priority", "type": "quantitative"},
            {"index": 5, "name": "p0", "type": "nominal"},
            {"index": 6, "name": "p1", "type": "nominal"},
            {"index": 7, "name": "p2", "type": "nominal"},
        ]
        */
        url: "http://localhost/dev/genomic/2428-2000.bed.gz",
        indexUrl: "http://localhost/dev/genomic/2428-2000.bed.gz.tbi",
        type: "bed",
        customFields: [
            "svtype",
            "priority",
            "p0",
            "p1",
            "p2",
            "is_in_id_panel",
        ],
        sampleLength: 5000,
    }
    return spec
}