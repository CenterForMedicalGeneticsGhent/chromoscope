
export default function updateSpec(
    selectedTileset: string,
    width: number, 
    height: number,
    yMax: number,
    yMin: number,
    lowerBoundary:number,
    upperBoundary: number,
    lowerColor: string,
    midColor: string,
    upperColor: string,
){
    return {
      "tracks": [
        {
            //id: `${id}-mid-ideogram`,
            alignment: 'overlay',
            data: {
                url: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv',
                    //assembly === 'hg38'
                     //   ? 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv'
                     //   : 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG19.Human.CytoBandIdeogram.csv',
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
            width,
            height: 18,
        },
        {   
            alignment: 'overlay',
            "data": {
                "type": "beddb",
                "url": "http://localhost:8989/api/v1/tileset_info/?d=" + selectedTileset,
                "genomicFields": [
                    {"index": 1, "name": "start"},
                    {"index": 2, "name": "end"}
                ],	
                "valueFields": [
                    {"index": 0, "name": "chr", "type": "nominal"},
                    {"index": 3, "name": "coverage", "type": "quantitative"},
                ]
            },
            tracks: [
                {   
                    "mark": "rect",
                    "stroke": {
                        "value": lowerColor,
                    },
                    "dataTransform": [
                        {
                            "type": "filter", 
                            "field": "coverage", 
                            "inRange": [-999999, lowerBoundary],
                        },
                    ],    
                },
                {   
                    "mark": "rect",
                    "stroke": {
                        "value": midColor,
                    },
                    "dataTransform": [
                        {
                            "type": "filter", 
                            "field": "coverage", 
                            "inRange": [lowerBoundary, upperBoundary],
                        },
                    ],    
                },
                {   
                    "mark": "rect",
                    "stroke": {
                        "value": upperColor,
                    },
                    "dataTransform": [
                        {
                            "type": "filter", 
                            "field": "coverage", 
                            "inRange": [upperBoundary, 999999],
                        },
                    ],    
                },    
            ],
            "x": {
                "field": "start",
                "type": "genomic",
                "grid": true,
                //"linkingId": "linking-with-brush",
                "axis": "bottom",
            },
            "xe": {
                "field": "end",
                "type": "genomic",
                //"grid": true,
            },	
            "y":{
                "field": "coverage",
                "type": "quantitative",
                "grid": true,
                "domain": [yMin,yMax],
            },
            "size": {
                "value": 1,
            },
            "strokeWidth": {
                "value": 2,
            },
            "height": height,
        },
        {
            data: {
                type: 'json',
                chromosomeField: 'c',
                genomicFields: ['p'],
                values: [
                    { c: 'chr2', p: 0 },
                    { c: 'chr3', p: 0 },
                    { c: 'chr4', p: 0 },
                    { c: 'chr5', p: 0 },
                    { c: 'chr6', p: 0 },
                    { c: 'chr7', p: 0 },
                    { c: 'chr8', p: 0 },
                    { c: 'chr9', p: 0 },
                    { c: 'chr10', p: 0 },
                    { c: 'chr11', p: 0 },
                    { c: 'chr12', p: 0 },
                    { c: 'chr13', p: 0 },
                    { c: 'chr14', p: 0 },
                    { c: 'chr15', p: 0 },
                    { c: 'chr16', p: 0 },
                    { c: 'chr17', p: 0 },
                    { c: 'chr18', p: 0 },
                    { c: 'chr19', p: 0 },
                    { c: 'chr20', p: 0 },
                    { c: 'chr21', p: 0 },
                    { c: 'chrX', p: 0 },
                    { c: 'chrY', p: 0 }
                ]
            },
            mark:  'rule',
            x: { field: 'p', type: 'genomic' },
            color: { value: "lightgrey" },
            opacity: { value: 0.5 },
            overlayOnPreviousTrack: true
        }
      ]
    };
  }