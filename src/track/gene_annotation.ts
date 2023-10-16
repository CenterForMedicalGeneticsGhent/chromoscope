import { SingleTrack } from 'gosling.js/dist/src/core/gosling.schema';
import { TrackMode } from './index';

export default function gene_annotation(
    sampleId: string,
    width: number,
    assembly,
): SingleTrack {
    return {
        id: `${sampleId}-mid-gene-2`,
        title: 'gene annotation',
        template: 'gene',
        data: {
            url:
                assembly === 'hg19'
                    ? // TODO: change to gosling's one
                      'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation-hg19'
                    : 'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation',
            type: 'beddb',
            genomicFields: [
                { index: 1, name: 'start' },
                { index: 2, name: 'end' }
            ],
            valueFields: [
                { index: 5, name: 'strand', type: 'nominal' },
                { index: 3, name: 'name', type: 'nominal' }
            ],
            exonIntervalFields: [
                { index: 12, name: 'start' },
                { index: 13, name: 'end' }
            ]
        },
        encoding: {
            startPosition: { field: 'start' },
            endPosition: { field: 'end' },
            strandColor: { field: 'strand', range: ['gray'] },
            strandRow: { field: 'strand' },
            opacity: { value: 0.4 },
            geneHeight: { value: 60 / 3.0 },
            geneLabel: { field: 'name' },
            geneLabelFontSize: { value: 60 / 3.0 },
            geneLabelColor: { field: 'strand', range: ['black'] },
            geneLabelStroke: { value: 'white' },
            geneLabelStrokeThickness: { value: 4 },
            geneLabelOpacity: { value: 1 },
            type: { field: 'type' }
        },
        tooltip: [
            { field: 'name', type: 'nominal' },
            { field: 'strand', type: 'nominal' }
        ],
        width,
        height: 60
    }
}
