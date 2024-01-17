
function generateIdeogramSpec(width){
    const spec = {
        alignment: 'overlay',
        data: {
            url: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv',
            type: 'csv',
            chromosomeField: 'Chromosome',
            genomicFields: ['chromStart', 'chromEnd']
        },
        tracks: [
            {
                mark: 'rect',
                dataTransform: [
                    {
                        type: 'filter',
                        field: 'Stain',
                        oneOf: ['acen'],
                        not: true
                    }
                ]
            },
            {
                mark: 'triangleRight',
                dataTransform: [
                    { type: 'filter', field: 'Stain', oneOf: ['acen'] },
                    { type: 'filter', field: 'Name', include: 'q' }
                ]
            },
            {
                mark: 'triangleLeft',
                dataTransform: [
                    { type: 'filter', field: 'Stain', oneOf: ['acen'] },
                    { type: 'filter', field: 'Name', include: 'p' }
                ]
            }
        ],
        color: {
            field: 'Stain',
            type: 'nominal',
            domain: ['gneg', 'gpos25', 'gpos50', 'gpos75', 'gpos100', 'gvar', 'acen'],
            range: ['white', 'lightgray', 'gray', 'gray', 'black', '#7B9CC8', '#DC4542']
        },
        size: { value: 18 },
        x: { field: 'chromStart', type: 'genomic' },
        xe: { field: 'chromEnd', type: 'genomic' },
        strokeWidth: { value: 0 },
        width: width,
        height: 18,
    }
    return spec
}


function generateChromosomeLinesSpec(){
    const values = []
    for (let i = 2; i <= 21; i++) {
        values.push({ c: 'chr' + i, p: 0 })
    }
    values.push({ c: 'chrX', p: 0 }, { c: 'chrY', p: 0 })
    const spec = {
        data: {
            type: 'json',
            chromosomeField: 'c',
            genomicFields: ['p'],
            values: values,
        },
        mark:  'rule',
        x: { field: 'p', type: 'genomic' },
        color: { value: "lightwhite" },
        opacity: { value: 0.5 },
        overlayOnPreviousTrack: true,
    }
    return spec
}


function generateDataSpec(selectedTileset){
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

function generateFilterSpec(field, oneOf){
    return {
        type: 'filter',
        field: field,
        oneOf: oneOf, 
    }
}


function generateMarkSpec(
        y,
        field,
        oneof,
        opacity,
){
    const spec = {
        mark: "rect",
        y : {
            value : y ,
        },
        dataTransform: [
            generateFilterSpec(field, oneof),
        ],
        opacity: { value: opacity },
    }
    return spec
}

function generateXSpec(field, axis, grid){
    const spec = {
        field: field,
        type: "genomic",
        axis: axis,
        grid: grid,
    }
    return spec
}


function generateXeSpec(field){
    const spec = {
        field: field,
        type: "genomic",
    }
    return spec
}


function generateColorSpec(field, type, domain, range){
    const spec = {
        field: field,
        type: type,
        domain: domain,
        range: range,
    }
    return spec
}


function generateSizeSpec(size){
    const spec = {
        value: size,
    }
    return spec
}


function generateZoomedInSVsSpec(height, selectedTileset){
    const spec = {   
        alignment: 'overlay',
        data: generateDataSpec(selectedTileset),
        tracks: [
            generateMarkSpec(3*height/4, "p0", ["./.","0/0"], 0),
            generateMarkSpec(3*height/4, "p0", ["0/1","10"], 0.3),
            generateMarkSpec(3*height/4, "p0", ["1/1"], 1),

            generateMarkSpec(2*height/4, "p1", ["./.","0/0"], 0),
            generateMarkSpec(2*height/4, "p1", ["0/1","10"], 0.3),
            generateMarkSpec(2*height/4, "p1", ["1/1"], 1),

            generateMarkSpec(1*height/4, "p2", ["./.","0/0"], 0),
            generateMarkSpec(1*height/4, "p2", ["0/1","10"], 0.3),
            generateMarkSpec(1*height/4, "p2", ["1/1"], 1),
        ],
        x: generateXSpec("start","bottom",true),
        xe: generateXeSpec("end"), 
        color : generateColorSpec("svtype", "nominal", ["DUP"], ["blue"]),            
        size: generateSizeSpec(height/5),
        height: height,
    }
    return spec
}


function generateZoomedOutSVsSpec(height, selectedTileset){
    const spec = {   
        alignment: 'overlay',
        data: generateDataSpec(selectedTileset),
        tracks: [
            generateMarkSpec(3*height/4, "p0", ["./.","0/0"], 0),
            generateMarkSpec(3*height/4, "p0", ["0/1","10"], 0.3),
            generateMarkSpec(3*height/4, "p0", ["1/1"], 1),

            generateMarkSpec(2*height/4, "p1", ["./.","0/0"], 0),
            generateMarkSpec(2*height/4, "p1", ["0/1","10"], 0.3),
            generateMarkSpec(2*height/4, "p1", ["1/1"], 1),

            generateMarkSpec(1*height/4, "p2", ["./.","0/0"], 0),
            generateMarkSpec(1*height/4, "p2", ["0/1","10"], 0.3),
            generateMarkSpec(1*height/4, "p2", ["1/1"], 1),
        ],
        x: generateXSpec("start","bottom",true),
        color : generateColorSpec("svtype", "nominal", ["DUP"], ["blue"]),            
        size: generateSizeSpec(height/5),
        height: height,
        overlayOnPreviousTrack: true
    }
    return spec
}


export default function updateSpec(
    selectedTileset: string,
    width: number, 
    height: number,
){
    return {
        "tracks": [
            generateIdeogramSpec(width),
            generateZoomedInSVsSpec(height, selectedTileset),
            generateZoomedOutSVsSpec(height, selectedTileset),
            generateChromosomeLinesSpec(),
        ]
    };
  }


