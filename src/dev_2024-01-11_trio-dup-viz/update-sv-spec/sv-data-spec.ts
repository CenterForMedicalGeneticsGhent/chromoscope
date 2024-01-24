export default function svDataSpec(selectedTileset){
    const spec = {
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
    }
    return spec
}