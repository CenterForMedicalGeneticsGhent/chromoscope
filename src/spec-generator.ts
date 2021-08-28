import { GoslingSpec } from 'gosling.js';
import { OverlaidTracks, SingleTrack, View } from 'gosling.js/dist/src/core/gosling.schema';
import defaultEncodings from './default-encoding';

export interface SpecOption { 
  showOverview: boolean;
  showPutativeDriver: boolean;
  xOffset: number; 
  width: number;
  svUrl: string;
  cnvUrl: string;
  drivers: { [k: string]: string | number }[];
  selectedSvId: string;
  hoveredSvId: string;
}

function generateSpec(option: SpecOption): GoslingSpec {
  const { svUrl, cnvUrl, showPutativeDriver, showOverview, width, drivers, selectedSvId, hoveredSvId } = option;

  const topViewWidth = Math.min(width, 600);
  const midViewWidth = width;
  const bottomViewGap = 20;
  const bottomViewWidth = width / 2.0 - bottomViewGap / 2.0;
  const topViewXOffset = (width - topViewWidth) / 2.0;

  return {
    'layout': 'linear',
    'arrangement': 'vertical',
    'centerRadius': 0.5,
    'assembly': 'hg19',
    'spacing': 40,
    'style': {
      'outlineWidth': 1,
      'outline': 'lightgray',
      'enableSmoothPath': false
    },
    'views': [
      {
        'arrangement': 'vertical',
        'views': [
          ...getOverviewSpec({ ...option, width: topViewWidth, xOffset: topViewXOffset }),
          {
            'linkingId': 'mid-scale',
            'xDomain': {'chromosome': '1'},
            'layout': 'linear',
            'tracks': [
              {
                'id': 'mid-ideogram',
                'style': {
                  'background': '#D7EBFF',
                  'outline': '#8DC1F2',
                  'outlineWidth': 5
                },
                'title': 'Ideogram',
                'alignment': 'overlay',
                'data': {
                  'url': 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv',
                  'type': 'csv',
                  'chromosomeField': 'Chromosome',
                  'genomicFields': ['chromStart', 'chromEnd']
                },
                'tracks': [
                  {
                    'mark': 'rect',
                    'dataTransform': [
                      {
                        'type': 'filter',
                        'field': 'Stain',
                        'oneOf': ['acen'],
                        'not': true
                      }
                    ]
                  },
                  {
                    'mark': 'triangleRight',
                    'dataTransform': [
                      {'type': 'filter', 'field': 'Stain', 'oneOf': ['acen']},
                      {'type': 'filter', 'field': 'Name', 'include': 'q'}
                    ]
                  },
                  {
                    'mark': 'triangleLeft',
                    'dataTransform': [
                      {'type': 'filter', 'field': 'Stain', 'oneOf': ['acen']},
                      {'type': 'filter', 'field': 'Name', 'include': 'p'}
                    ]
                  },
                  {
                    'mark': 'text',
                    'dataTransform': [
                      {
                        'type': 'filter',
                        'field': 'Stain',
                        'oneOf': ['acen'],
                        'not': true
                      }
                    ],
                    'size': {'value': 12},
                    'color': {
                      'field': 'Stain',
                      'type': 'nominal',
                      'domain': [
                        'gneg',
                        'gpos25',
                        'gpos50',
                        'gpos75',
                        'gpos100',
                        'gvar'
                      ],
                      'range': [
                        'black',
                        'black',
                        'black',
                        'black',
                        'white',
                        'black'
                      ]
                    },
                    'visibility': [
                      {
                        'operation': 'less-than',
                        'measure': 'width',
                        'threshold': '|xe-x|',
                        'transitionPadding': 10,
                        'target': 'mark'
                      }
                    ]
                  }
                ],
                'color': {
                  'field': 'Stain',
                  'type': 'nominal',
                  'domain': [
                    'gneg',
                    'gpos25',
                    'gpos50',
                    'gpos75',
                    'gpos100',
                    'gvar',
                    'acen'
                  ],
                  'range': [
                    'white',
                    'lightgray',
                    'gray',
                    'gray',
                    'black',
                    '#7B9CC8',
                    '#DC4542'
                  ]
                },
                'size': {'value': 18},
                'x': {'field': 'chromStart', 'type': 'genomic'},
                'xe': {'field': 'chromEnd', 'type': 'genomic'},
                'text': {'field': 'Name', 'type': 'nominal'},
                'stroke': {'value': 'gray'},
                'strokeWidth': {'value': 0.3},
                width: midViewWidth,
                'height': 30
              },
              ...(!showPutativeDriver ? [] : [{
                'id': 'mid-driver',
                'title': 'Putative Driver',
                'data': {
                  'values': drivers,
                  'type': 'json',
                  'chromosomeField': 'chr',
                  'genomicFields': ['pos']
                },
                // dataTransform: [
                //   { type: 'displace', method: 'pile', boundingBox: { startField: 'pos', endField: 'pos', padding: 100} }
                // ],
                'mark': 'text',
                'x': {'field': 'pos', 'type': 'genomic'},
                'text': {'field': 'gene', 'type': 'nominal'},
                'color': {'value': 'black'},
                'style': {'textFontWeight': 'normal', 'dx': -10},
                width: midViewWidth,
                'height': 20
              } as SingleTrack]),
              {
                'id': 'mid-gene',
                'alignment': 'overlay',
                'title': 'hg19 | Genes',
                'template': 'gene',
                'data': {
                  'url': 'https://higlass.io/api/v1/tileset_info/?d=OHJakQICQD6gTD7skx4EWA',
                  'type': 'beddb',
                  'genomicFields': [
                    {'index': 1, 'name': 'start'},
                    {'index': 2, 'name': 'end'}
                  ],
                  'valueFields': [
                    {'index': 5, 'name': 'strand', 'type': 'nominal'},
                    {'index': 3, 'name': 'name', 'type': 'nominal'}
                  ],
                  'exonIntervalFields': [
                    {'index': 12, 'name': 'start'},
                    {'index': 13, 'name': 'end'}
                  ]
                },
                'encoding': {
                  'startPosition': {'field': 'start'},
                  'endPosition': {'field': 'end'},
                  'strandColor': {'field': 'strand', 'range': ['gray']},
                  'strandRow': {'field': 'strand'},
                  'opacity': {'value': 0.4},
                  'geneHeight': {'value': 60 / 3.0},
                  'geneLabel': {'field': 'name'},
                  'geneLabelFontSize': {'value': 60 / 3.0},
                  'geneLabelColor': {'field': 'strand', 'range': ['black']},
                  'geneLabelStroke': {'value': 'white'},
                  'geneLabelStrokeThickness': {'value': 4},
                  'geneLabelOpacity': {'value': 1},
                  'type': {'field': 'type'}
                },
                width: midViewWidth,
                'height': 60
              },
              {
                'id': 'mid-gain',
                'title': 'Gain',
                'style': {'background': 'lightgray', 'backgroundOpacity': 0.2},
                'data': {
                  separator: '\t',
                  url: cnvUrl,
                  type: 'csv',
                  chromosomeField: 'chromosome',
                  genomicFields: ['start', 'end']
                },
                'dataTransform': [
                  {
                    'type': 'filter',
                    'field': 'aceseq_copy_number',
                    'inRange': [4.5, 900]
                  }
                ],
                alignment: 'overlay',
                tracks: [
                  { 'mark': 'rect'},
                ],
                'x': {'field': 'start', 'type': 'genomic'},
                'xe': {'field': 'end', 'type': 'genomic'},
                'color': {'value': '#73C475'},
                width: midViewWidth,
                'height': 20
              },
              {
                'id': 'mid-loh',
                'title': 'LOH',
                'style': {'background': 'lightgray', 'backgroundOpacity': 0.2},
                'data': {
                  separator: '\t',
                  url: cnvUrl,
                  type: 'csv',
                  chromosomeField: 'chromosome',
                  genomicFields: ['start', 'end']
                },
                'dataTransform': [
                  {'type': 'filter', 'field': 'minor_cn', 'oneOf': ['0']}
                ],
                alignment: 'overlay',
                tracks: [
                  {'mark': 'rect'},
                ],
                'x': {'field': 'start', 'type': 'genomic'},
                'xe': {'field': 'end', 'type': 'genomic'},
                'color': {'value': '#FB6A4B'},
                width: midViewWidth,
                'height': 20
              },
              {
                'id': 'mid-sv',
                'title': 'Structural Variant',
                'data': {
                  'url': svUrl,
                  'type': 'csv',
                  'separator': '\t',
                  'genomicFieldsToConvert': [
                    {
                      'chromosomeField': 'chrom1',
                      'genomicFields': ['start1', 'end1']
                    },
                    {
                      'chromosomeField': 'chrom2',
                      'genomicFields': ['start2', 'end2']
                    }
                  ]
                },
                'alignment': 'overlay',
                'tracks': [
                  {
                    'mark': 'withinLink',
                    dataTransform: [ { type: 'filter', field: 'sv_id', oneOf: [selectedSvId, hoveredSvId], not: true } ],
                  },
                  {
                    'mark': 'withinLink',
                    dataTransform: [ 
                      { type: 'filter', field: 'sv_id', oneOf: [selectedSvId] },
                      { type: 'filter', field: 'sv_id', oneOf: [hoveredSvId], not: true } 
                    ],
                    'strokeWidth': {'value': 3},
                    opacity: {value: 1}
                  },
                  {
                    'mark': 'withinLink',
                    dataTransform: [ 
                      { type: 'filter', field: 'sv_id', oneOf: [hoveredSvId] },
                    ],
                    stroke: {'value': 'black' },
                    'strokeWidth': {'value': 3},
                    opacity: {value: 1}
                  },
                ],
                'x': {'field': 'start1', 'type': 'genomic'},
                'xe': {'field': 'end2', 'type': 'genomic'},
                'color': {
                  'field': 'svclass',
                  'type': 'nominal',
                  'legend': true,
                  domain: defaultEncodings.color.svclass.domain,
                  range: defaultEncodings.color.svclass.range
                },
                'stroke': {
                  'field': 'svclass',
                  'type': 'nominal',
                  domain: defaultEncodings.color.svclass.domain, 
                  range: defaultEncodings.color.svclass.range
                },
                'strokeWidth': {'value': 1},
                'opacity': {'value': 0.6},
                'size': {'value': 4},
                'tooltip': [
                  {'field': 'start1', 'type': 'genomic'},
                  {'field': 'end2', 'type': 'genomic'},
                  {'field': 'svclass', 'type': 'nominal'},
                  {'field': 'sv_id', 'type': 'nominal'},
                  {'field': 'svmethod', 'type': 'nominal'},
                  {'field': 'pe_support', 'type': 'nominal'},
                ],
                'style': {'legendTitle': 'SV Class', 'bazierLink': true},
                width: midViewWidth,
                'height': 200
              }
            ]
          }
        ]
      },
      {
        'arrangement': 'horizontal',
        'spacing': bottomViewGap,
        'views': [
          {
            'static': false,
            'layout': 'linear',
            'centerRadius': 0.05,
            'xDomain': {'chromosome': '1', 'interval': [205000, 207000]},
            'spacing': 0.01,
            linkingId: 'detail-scale-1',
            'tracks': [
              {
                id: 'bottom-left-coverage',
                'title': 'Coverage',
                'data': {
                  'type': 'bam',
                  'url': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam',
                  'indexUrl': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai'
                },
                'dataTransform': [
                  {'type': 'coverage', 'startField': 'from', 'endField': 'to'}
                ],
                'mark': 'bar',
                'x': {'field': 'from', 'type': 'genomic'},
                'xe': {'field': 'to', 'type': 'genomic'},
                'y': {
                  'field': 'coverage',
                  'type': 'quantitative',
                  'axis': 'right',
                  'grid': true
                },
                'color': {'value': 'lightgray'},
                'stroke': {'value': 'gray'},
                width: bottomViewWidth,
                'height': 80
              },
              {
                id: 'bottom-left-gene',
                'alignment': 'overlay',
                'title': 'hg19 | Genes',
                'template': 'gene',
                'data': {
                  'url': 'https://higlass.io/api/v1/tileset_info/?d=OHJakQICQD6gTD7skx4EWA',
                  // 'url': 'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation',
                  'type': 'beddb',
                  'genomicFields': [
                    {'index': 1, 'name': 'start'},
                    {'index': 2, 'name': 'end'}
                  ],
                  'valueFields': [
                    {'index': 5, 'name': 'strand', 'type': 'nominal'},
                    {'index': 3, 'name': 'name', 'type': 'nominal'}
                  ],
                  'exonIntervalFields': [
                    {'index': 12, 'name': 'start'},
                    {'index': 13, 'name': 'end'}
                  ]
                },
                'encoding': {
                  'startPosition': {'field': 'start'},
                  'endPosition': {'field': 'end'},
                  'strandColor': {'field': 'strand', 'range': ['gray']},
                  'strandRow': {'field': 'strand'},
                  'opacity': {'value': 0.4},
                  'geneHeight': {'value': 60 / 3.0},
                  'geneLabel': {'field': 'name'},
                  'geneLabelFontSize': {'value': 60 / 3.0},
                  'geneLabelColor': {'field': 'strand', 'range': ['black']},
                  'geneLabelStroke': {'value': 'white'},
                  'geneLabelStrokeThickness': {'value': 4},
                  'geneLabelOpacity': {'value': 1},
                  'type': {'field': 'type'}
                },
                width: bottomViewWidth,
                'height': 60
              },
              {
                id: 'bottom-left-sequence',
                'title': 'Sequence',
                'alignment': 'overlay',
                'data': {
                  'url': 'https://server.gosling-lang.org/api/v1/tileset_info/?d=sequence-multivec',
                  'type': 'multivec',
                  'row': 'base',
                  'column': 'position',
                  'value': 'count',
                  'categories': ['A', 'T', 'G', 'C'],
                  'start': 'start',
                  'end': 'end'
                },
                'tracks': [
                  {
                    'mark': 'bar',
                    'y': {
                      'field': 'count',
                      'type': 'quantitative',
                      'axis': 'none'
                    }
                  },
                  {
                    'dataTransform': [
                      {
                        'type': 'filter',
                        'field': 'count',
                        'oneOf': [0],
                        'not': true
                      }
                    ],
                    'mark': 'text',
                    'x': {'field': 'start', 'type': 'genomic'},
                    'xe': {'field': 'end', 'type': 'genomic'},
                    'size': {'value': 24},
                    'color': {'value': 'white'},
                    'visibility': [
                      {
                        'operation': 'less-than',
                        'measure': 'width',
                        'threshold': '|xe-x|',
                        'transitionPadding': 30,
                        'target': 'mark'
                      },
                      {
                        'operation': 'LT',
                        'measure': 'zoomLevel',
                        'threshold': 10,
                        'target': 'track'
                      }
                    ]
                  }
                ],
                'x': {'field': 'position', 'type': 'genomic'},
                'color': {
                  'field': 'base',
                  'type': 'nominal',
                  'domain': ['A', 'T', 'G', 'C'],
                  'legend': true
                },
                'text': {'field': 'base', 'type': 'nominal'},
                'style': {'inlineLegend': true },
                width: bottomViewWidth,
                'height': 40
              },
              {
                id: 'bottom-left-bam',
                'alignment': 'overlay',
                'title': 'Reads',
                'data': {
                  'type': 'bam',
                  'url': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam',
                  'indexUrl': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai'
                },
                'mark': 'rect',
                'tracks': [
                  {
                    'dataTransform': [
                      {
                        'type': 'displace',
                        'method': 'pile',
                        'boundingBox': {
                          'startField': 'from',
                          'endField': 'to',
                          // "groupField": "strand",
                          'padding': 5,
                          'isPaddingBP': true
                        },
                        'newField': 'pileup-row'
                      }
                    ],
                    'x': {'field': 'from', 'type': 'genomic'},
                    'xe': {'field': 'to', 'type': 'genomic'},
                    'stroke': {'value': 'white'},
                    'strokeWidth': {'value': 0.5}
                  },
                  {
                    'dataTransform': [
                      {
                        'type': 'displace',
                        'method': 'pile',
                        'boundingBox': {
                          'startField': 'from',
                          'endField': 'to',
                          // "groupField": "strand",
                          'padding': 5,
                          'isPaddingBP': true
                        },
                        'newField': 'pileup-row'
                      },
                      {
                        'type': 'subjson',
                        'field': 'substitutions',
                        'genomicField': 'pos',
                        'baseGenomicField': 'from',
                        'genomicLengthField': 'length'
                      },
                      {'type': 'filter', 'field': 'type', 'oneOf': ['sub']}
                    ],
                    'x': {'field': 'pos_start', 'type': 'genomic'},
                    'xe': {'field': 'pos_end', 'type': 'genomic'},
                    'color': {
                      'field': 'variant',
                      'type': 'nominal',
                      'domain': ['A', 'T', 'G', 'C', 'S', 'H', 'X', 'I', 'D'],
                      'legend': true
                    }
                  }
                ],
                'y': {'field': 'pileup-row', 'type': 'nominal', 'flip': false},
                // "row": {
                //   "field": "strand",
                //   "type": "nominal",
                //   "domain": ["+", "-"],
                //   "padding": 1
                // },
                // "color": {
                //   "field": "strand",
                //   "type": "nominal",
                //   "domain": ["+", "-"],
                //   "range": ["#97A8B2", "#D4C6BA"]
                // },
                color: { value: '#97A8B2' },
                'style': {'outlineWidth': 0.5},
                width: bottomViewWidth,
                'height': 310
              }
            ]
          },
          {
            'static': false,
            'layout': 'linear',
            'centerRadius': 0.05,
            'xDomain': {'chromosome': '1', 'interval': [490000, 496000]},
            'spacing': 0.01,
            linkingId: 'detail-scale-2',
            'tracks': [
              {
                id: 'bottom-right-coverage',
                'title': 'Coverage',
                'data': {
                  'type': 'bam',
                  'url': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam',
                  'indexUrl': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai'
                },
                'dataTransform': [
                  {'type': 'coverage', 'startField': 'from', 'endField': 'to'}
                ],
                'mark': 'bar',
                'x': {'field': 'from', 'type': 'genomic'},
                'xe': {'field': 'to', 'type': 'genomic'},
                'y': {
                  'field': 'coverage',
                  'type': 'quantitative',
                  'axis': 'right',
                  'grid': true
                },
                'color': {'value': 'lightgray'},
                'stroke': {'value': 'gray'},
                width: bottomViewWidth,
                'height': 80
              },
              {
                id: 'bottom-right-gene',
                'alignment': 'overlay',
                'title': 'hg38 | Genes',
                'template': 'gene',
                'data': {
                  'url': 'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation',
                  'type': 'beddb',
                  'genomicFields': [
                    {'index': 1, 'name': 'start'},
                    {'index': 2, 'name': 'end'}
                  ],
                  'valueFields': [
                    {'index': 5, 'name': 'strand', 'type': 'nominal'},
                    {'index': 3, 'name': 'name', 'type': 'nominal'}
                  ],
                  'exonIntervalFields': [
                    {'index': 12, 'name': 'start'},
                    {'index': 13, 'name': 'end'}
                  ]
                },
                'encoding': {
                  'startPosition': {'field': 'start'},
                  'endPosition': {'field': 'end'},
                  'strandColor': {'field': 'strand', 'range': ['gray']},
                  'strandRow': {'field': 'strand'},
                  'opacity': {'value': 0.4},
                  'geneHeight': {'value': 60 / 3.0},
                  'geneLabel': {'field': 'name'},
                  'geneLabelFontSize': {'value': 60 / 3.0},
                  'geneLabelColor': {'field': 'strand', 'range': ['black']},
                  'geneLabelStroke': {'value': 'white'},
                  'geneLabelStrokeThickness': {'value': 4},
                  'geneLabelOpacity': {'value': 1},
                  'type': {'field': 'type'}
                },
                width: bottomViewWidth,
                'height': 60
              },
              {
                id: 'bottom-right-sequence',
                'title': 'Sequence',
                'alignment': 'overlay',
                'data': {
                  'url': 'https://server.gosling-lang.org/api/v1/tileset_info/?d=sequence-multivec',
                  'type': 'multivec',
                  'row': 'base',
                  'column': 'position',
                  'value': 'count',
                  'categories': ['A', 'T', 'G', 'C'],
                  'start': 'start',
                  'end': 'end'
                },
                'tracks': [
                  {
                    'mark': 'bar',
                    'y': {
                      'field': 'count',
                      'type': 'quantitative',
                      'axis': 'none'
                    }
                  },
                  {
                    'dataTransform': [
                      {
                        'type': 'filter',
                        'field': 'count',
                        'oneOf': [0],
                        'not': true
                      }
                    ],
                    'mark': 'text',
                    'x': {'field': 'start', 'type': 'genomic'},
                    'xe': {'field': 'end', 'type': 'genomic'},
                    'size': {'value': 24},
                    'color': {'value': 'white'},
                    'visibility': [
                      {
                        'operation': 'less-than',
                        'measure': 'width',
                        'threshold': '|xe-x|',
                        'transitionPadding': 30,
                        'target': 'mark'
                      },
                      {
                        'operation': 'LT',
                        'measure': 'zoomLevel',
                        'threshold': 10,
                        'target': 'track'
                      }
                    ]
                  }
                ],
                'x': {'field': 'position', 'type': 'genomic'},
                'color': {
                  'field': 'base',
                  'type': 'nominal',
                  'domain': ['A', 'T', 'G', 'C'],
                  'legend': true
                },
                'text': {'field': 'base', 'type': 'nominal'},
                'style': {'inlineLegend': true},
                width: bottomViewWidth,
                'height': 40
              },
              {
                id: 'bottom-right-bam',
                'alignment': 'overlay',
                'title': 'Reads',
                'data': {
                  'type': 'bam',
                  'url': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam',
                  'indexUrl': 'https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai'
                },
                'mark': 'rect',
                'tracks': [
                  {
                    'dataTransform': [
                      {
                        'type': 'displace',
                        'method': 'pile',
                        'boundingBox': {
                          'startField': 'from',
                          'endField': 'to',
                          // "groupField": "strand",
                          'padding': 5,
                          'isPaddingBP': true
                        },
                        'newField': 'pileup-row'
                      }
                    ],
                    'x': {'field': 'from', 'type': 'genomic'},
                    'xe': {'field': 'to', 'type': 'genomic'},
                    'stroke': {'value': 'white'},
                    'strokeWidth': {'value': 0.5}
                  },
                  {
                    'dataTransform': [
                      {
                        'type': 'displace',
                        'method': 'pile',
                        'boundingBox': {
                          'startField': 'from',
                          'endField': 'to',
                          // "groupField": "strand",
                          'padding': 5,
                          'isPaddingBP': true
                        },
                        'newField': 'pileup-row'
                      },
                      {
                        'type': 'subjson',
                        'field': 'substitutions',
                        'genomicField': 'pos',
                        'baseGenomicField': 'from',
                        'genomicLengthField': 'length'
                      },
                      {'type': 'filter', 'field': 'type', 'oneOf': ['sub']}
                    ],
                    'x': {'field': 'pos_start', 'type': 'genomic'},
                    'xe': {'field': 'pos_end', 'type': 'genomic'},
                    'color': {
                      'field': 'variant',
                      'type': 'nominal',
                      'domain': ['A', 'T', 'G', 'C', 'S', 'H', 'X', 'I', 'D'],
                      'legend': true
                    }
                  }
                ],
                'y': {'field': 'pileup-row', 'type': 'nominal', 'flip': false},
                // "row": {
                //   "field": "strand",
                //   "type": "nominal",
                //   "domain": ["+", "-"],
                //   "padding": 1
                // },
                // "color": {
                //   "field": "strand",
                //   "type": "nominal",
                //   "domain": ["+", "-"],
                //   "range": ["#97A8B2", "#D4C6BA"]
                // },
                color: { value: '#97A8B2' },
                width: bottomViewWidth,
                'height': 310
              }
            ]
          }
        ]
      }
    ]
  };
}

export default generateSpec;

function getOverviewSpec(option: SpecOption): View[] {
  const { cnvUrl, svUrl, width, showPutativeDriver, showOverview, xOffset, drivers } = option;
  
  if(!showOverview) return [];

  return  [{
    // 'id': 'top-view',
    // "static": true,
    xOffset,
    'layout': 'circular',
    'spacing': 1,
    'style': {
      'outlineWidth': 1,
      'outline': 'lightgray',
    },
    'tracks': [
      {
        'id': 'top-ideogram',
        'title': 'Ideogram',
        'alignment': 'overlay',
        'data': {
          'url': 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv',
          'type': 'csv',
          'chromosomeField': 'Chromosome',
          'genomicFields': ['chromStart', 'chromEnd']
        },
        'tracks': [
          {'mark': 'rect'},
          {
            'mark': 'brush',
            'x': {'linkingId': 'mid-scale'},
            'strokeWidth': {'value': 2},
            'stroke': {'value': '#0070DC'},
            'color': {'value': '#AFD8FF'},
            'opacity': {'value': 0.5}
          }
        ],
        'color': {
          'field': 'Stain',
          'type': 'nominal',
          'domain': [
            'gneg',
            'gpos25',
            'gpos50',
            'gpos75',
            'gpos100',
            'gvar',
            'acen'
          ],
          'range': [
            'white',
            'lightgray',
            'gray',
            'gray',
            'black',
            '#7B9CC8',
            '#DC4542'
          ]
        },
        'size': {'value': 18},
        'x': {'field': 'chromStart', 'type': 'genomic'},
        'xe': {'field': 'chromEnd', 'type': 'genomic'},
        'stroke': {'value': 'gray'},
        'strokeWidth': {'value': 0.3},
        width,
        'height': 100
      },
      ...(!showPutativeDriver ? [] : [{
        'id': 'top-driver',
        'title': 'Putative Driver',
        'alignment': 'overlay',
        'data': {
          'values': drivers,
          'type': 'json',
          'chromosomeField': 'chr',
          'genomicFields': ['pos']
        },
        'tracks': [
          {'mark': 'text', size: {value: 6} },
          // {'mark': 'triangleBottom', 'size': {'value': 5}}
        ],
        'x': {'field': 'pos', 'type': 'genomic'},
        'text': {'field': 'gene', 'type': 'nominal'},
        'color': {'value': 'black'},
        'style': {
          'textFontWeight': 'normal',
          'dx': -10,
          'outlineWidth': 0
        },
        width,
        'height': 40
      } as OverlaidTracks]),
      {
        'id': 'top-gain',
        'title': 'Gain',
        'style': {'background': 'lightgray', 'backgroundOpacity': 0.2},
        'alignment': 'overlay',
        'data': {
          separator: '\t',
          url: cnvUrl,
          type: 'csv',
          chromosomeField: 'chromosome',
          genomicFields: ['start', 'end'],
          quantitativeFields: ['total_cn']
        },
        'dataTransform': [
          {
            'type': 'filter',
            'field': 'total_cn',
            'inRange': [4.9999, 999999999]
          }
        ],
        'tracks': [
          {'mark': 'rect'},
          {
            'mark': 'brush',
            'x': {'linkingId': 'mid-scale'},
            'strokeWidth': {'value': 0}
          }
        ],
        'x': {'field': 'start', 'type': 'genomic'},
        'xe': {'field': 'end', 'type': 'genomic'},
        'color': {'value': '#73C475'},
        width,
        'height': 40
      },
      {
        'id': 'top-loh',
        'title': 'LOH',
        'style': {'background': 'lightgray', 'backgroundOpacity': 0.2},
        'alignment': 'overlay',
        'data': {
          separator: '\t',
          url: cnvUrl,
          type: 'csv',
          chromosomeField: 'chromosome',
          genomicFields: ['start', 'end']
        },
        'dataTransform': [
          {'type': 'filter', 'field': 'minor_cn', 'oneOf': ['0']}
        ],
        'tracks': [
          {'mark': 'rect'},
          {
            'mark': 'brush',
            'x': {'linkingId': 'mid-scale'},
            'strokeWidth': {'value': 1},
            'stroke': {'value': '#94C2EF'},
            'color': {'value': '#AFD8FF'}
          }
        ],
        'x': {'field': 'start', 'type': 'genomic'},
        'xe': {'field': 'end', 'type': 'genomic'},
        'color': {'value': '#FB6A4B'},
        width,
        'height': 40
      },
      {
        'id': 'top-sv',
        'title': 'Structural Variant',
        'data': {
          'url': svUrl,
          'type': 'csv',
          'separator': '\t',
          'genomicFieldsToConvert': [
            {
              'chromosomeField': 'chrom1',
              'genomicFields': ['start1', 'end1']
            },
            {
              'chromosomeField': 'chrom2',
              'genomicFields': ['start2', 'end2']
            }
          ]
        },
        'mark': 'withinLink',
        'x': {'field': 'start1', 'type': 'genomic'},
        'xe': {'field': 'end2', 'type': 'genomic'},
        'color': {
          'field': 'svclass',
          'type': 'nominal',
          'legend': true,
          domain: defaultEncodings.color.svclass.domain,
          range: defaultEncodings.color.svclass.range
        },
        'stroke': {
          'field': 'svclass',
          'type': 'nominal',
          domain: defaultEncodings.color.svclass.domain,
          range: defaultEncodings.color.svclass.range
        },
        'strokeWidth': {'value': 1},
        'opacity': {'value': 0.6},
        'style': {'legendTitle': 'SV Class'},
        width,
        'height': 80
      }
    ]
  }];
}
