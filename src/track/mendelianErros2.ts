import { OverlaidTracks } from 'gosling.js/dist/src/gosling-schema';
import { TrackMode } from './index';

export default function mendelianErrors2(
    parent: string,
    meUrl2: string,
    mode: TrackMode,
    cnFields: [string, string, string] = ['trio', 'fat', 'mot']
): Partial<OverlaidTracks> {
    const [trioError, fatherError, motherError] = cnFields;

    return {
        id: `${parent}-${mode}-mendelian-errors2`,
        title: mode === 'small' ? '' : 'Mendelian Errors',
        style: { inlineLegend: true },
        alignment: 'overlay',
        data: {
            separator: ',',
            url: meUrl2,
            type: 'csv',
            chromosomeField: 'CHROM',
            genomicFields: ['POS']
        },
        tracks: [
            {
                mark: 'point',
                x: { value: 0 },
                y: { value: 0 },
                color: {
                    type: 'nominal',
                    domain: ['Trio Error', 'Father Error', 'Mother Error'],
                    range: ['#F0E442', '#56B4E9', '#D55E00'],  // Colors representing each category
                    legend: true
                },
                overlayOnPreviousTrack: true
            },
            {
                mark: 'point',
                x: { field: 'POS', type: 'genomic' },
                y: { value: 45 },
                size: { field: trioError, type: 'quantitative' },
                color: { value: '#F0E442' },
                visibility: [{
                    threshold: 1000000,
                    target: 'track',
                    operation: 'LT',
                    measure: 'zoomLevel'
                }],
                overlayOnPreviousTrack: true
            },
            {
                mark: 'point',
                x: { field: 'POS', type: 'genomic' },
                y: { value: 30 },
                size: { field: fatherError, type: 'quantitative' },
                color: { value: '#56B4E9' },
                visibility: [{
                    threshold: 1000000,
                    target: 'track',
                    operation: 'LT',
                    measure: 'zoomLevel'
                }],
                overlayOnPreviousTrack: true
            },
            {
                mark: 'point',
                x: { field: 'POS', type: 'genomic' },
                y: { value: 15 },
                size: { field: motherError, type: 'quantitative' },
                color: { value: '#D55E00' },
                visibility: [{
                    threshold: 1000000,
                    target: 'track',
                    operation: 'LT',
                    measure: 'zoomLevel'
                }],
                overlayOnPreviousTrack: true
            }
        ],
        tooltip: [
            { field: 'POS', type: 'genomic', alt: 'Start Position' },
            { field: trioError, type: 'quantitative', alt: 'Trio Errors' },
            { field: fatherError, type: 'quantitative', alt: 'Father Errors' },
            { field: motherError, type: 'quantitative', alt: 'Mother Errors' },
        ],
        height: 0.01,
    };
}
