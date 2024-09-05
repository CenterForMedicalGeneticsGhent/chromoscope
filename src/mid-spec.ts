import { SpecOption } from './main-spec';
import { SingleTrack, View } from 'gosling.js/dist/src/gosling-schema';
import tracks from './track';
import { driversToTsvUrl } from './utils';

export default function getMidView(option: SpecOption): View[] {
    const {
        id,
        assembly,
        xDomain,
        vcf,
        vcfIndex,
        cnv,
        baf,
        baf_server,
        me,
        me2,
        pm,
        haplo,
        roi,
        width,
        cnFields,
        yOffset
    } = option;
    return [
        {
            linkingId: 'mid-scale',
            xDomain: xDomain ? { interval: xDomain } : { chromosome: 'chr1' },
            layout: 'linear',
            tracks: [
                {
                    title: '  Ideogram',
                    id: `${id}-mid-ideogram`,
                    alignment: 'overlay',
                    data: {
                        url:
                            assembly === 'hg38'
                                ? 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv'
                                : 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG19.Human.CytoBandIdeogram.csv',
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
                    height: 18
                },
                tracks.roi(`${id}-mid-ideogram`, roi, 'mid'),
                ...(!baf
                    ? []
                    : [tracks.baf(id, baf, width, 240, 'mid')]),
                ...(!baf_server
                    ? []
                    :[tracks.biAlleleFrequency(id, baf_server, width, 240, 'mid')]),
                ...(!haplo
                    ? []
                    : [tracks.haplo(id, haplo, width, 300, 'mid'),
                    tracks.boundary('haplo', 'mid'),
                    tracks.roi('haplo', roi, 'mid')
                    ]),
                ...(!vcf
                    ? []
                    : [tracks.mutation(id, vcf, vcfIndex, width, 60, 'mid'), tracks.boundary('mutation', 'mid'),
                    tracks.boundary('mutation', 'mid'),
                    tracks.roi('mutation', roi, 'mid')
                    ]),
                ...(!cnv
                    ? []
                    : [tracks.cnv(id, cnv, width, 200, 'mid'),
                    tracks.boundary('cnv', 'mid'),
                    tracks.roi('cnv', roi, 'mid'),
                    ]),
                ...(!me
                    ? []
                    : [tracks.mendelianErrors(id, me, width, 60, 'mid', cnFields),
                    tracks.mendelianErrors2('me', me2, 'mid', cnFields),
                    tracks.boundary('me', 'mid'),
                    tracks.roi('me', roi, 'mid')
                    ]),
                ...(!pm
                    ? []
                    : [tracks.parentMapping(id, pm, width, 40, 'mid'),
                    tracks.boundary('pm', 'mid'),
                    tracks.roi('pm', roi, 'mid')
                    ]),
                {
                    id: `${id}-mid-ideogram-bottom`,
                    alignment: 'overlay',
                    data: {
                        url:
                            assembly === 'hg38'
                                ? 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv'
                                : 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG19.Human.CytoBandIdeogram.csv',
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
                    x: { field: 'chromStart', type: 'genomic', axis: 'bottom' },
                    xe: { field: 'chromEnd', type: 'genomic' },
                    strokeWidth: { value: 0 },
                    width,
                    height: 18
                },
                tracks.roi(`${id}-mid-ideogram-bottom`, roi, 'mid'),
            ]
        }
    ];
}
