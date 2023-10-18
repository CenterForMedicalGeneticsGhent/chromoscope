import driver from './driver';
import cnv from './cnv';
import coverage from './coverage';
import gain from './gain';
import loh from './loh';
import sv from './sv';
import mutation from './mutation';
import indel from './indel';
import boundary from './boundary';
import gene_annotation from './gene_annotation';
import gene_annotation_ektenis from './gene_annotation_ektenis';
import cnv_ektenis from './cnv_ektenis';
import cnv_ektenis_bar from './cnv_ektenis_bar';
import baf_ektenis from "./baf_ektenis";

export type TrackMode = 'small' | 'top' | 'mid';

export default {
    driver,
    cnv,
    coverage,
    gain,
    loh,
    sv,
    mutation,
    indel,
    boundary,
    gene_annotation,
    gene_annotation_ektenis,
    cnv_ektenis,
    cnv_ektenis_bar,
    baf_ektenis,
};
