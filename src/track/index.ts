import driver from './driver';
import cnv from './cnv';
import coverage from './coverage';
import gain from './gain';
import loh from './loh';
import sv from './sv';
import mutation from './mutation';
import indel from './indel';
import boundary from './boundary';
import baf from './baf';
import biAlleleFrequency from './Bi_allel_example';
import mendelianErrors from './mendelianErrors';
import haplo from './haplo';
import mendelianErrors2 from './mendelianErros2';
import parentMapping from './parentMapping';
import roi from './roi';
import GQbin from './GQbin';
import GQdetail from './GQdetail';
import AFbin from './AFbin';
import AFdetail from './AFdetail';
import DPbin from './DPbin';
import DPdetail from './DPdetail';
import PLdetail from './PLdetail';

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
    baf,
    biAlleleFrequency,
    mendelianErrors,
    mendelianErrors2,
    parentMapping,
    haplo,
    roi,
    GQbin,
    GQdetail,
    AFbin,
    AFdetail,
    DPbin,
    DPdetail,
    PLdetail
};
