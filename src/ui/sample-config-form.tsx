import React, { useMemo, useState } from 'react';
import { SampleType } from '../data/samples';
import { ICONS } from '../icon';
import mendelianErrors2 from '../track/mendelianErros2';

type SampleConfig = Partial<Omit<SampleType, 'group' | 'cnFields' | 'note' | 'drivers' | 'assembly' | 'thumbnail'>> & {
    drivers?: string;
    assembly?: 'hg19' | 'hg38';
};

type ValidSampleConfig = Required<Pick<SampleConfig, 'id' | 'cancer' | 'sv' | 'cnv' | 'assembly'>> &
    Omit<SampleConfig, 'id' | 'cancer' | 'sv' | 'cnv' | 'assembly'>;

function isValidUrl(str: string) {
    let url;
    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

const testOkay = {
    id: (_: SampleConfig) => _.id,
    cancer: (_: SampleConfig) => _.cancer,
    // optional
    cnv: (_: SampleConfig) => !_.cnv || isValidUrl(_.cnv),
    baf: (_: SampleConfig) => !_.baf || isValidUrl(_.baf),
    BAFonhiglass_server: (_: SampleConfig) => !_.baf_server || isValidUrl(_.baf_server),
    haplo: (_: SampleConfig) => !_.haplo || isValidUrl(_.haplo),
    me: (_: SampleConfig) => !_.me || isValidUrl(_.me),
    me2: (_: SampleConfig) => !_.me2 || isValidUrl(_.me2),
    pm: (_: SampleConfig) => !_.pm || isValidUrl(_.pm),
    drivers: (_: SampleConfig) => !_.drivers || isValidUrl(_.drivers),
    vcf: (_: SampleConfig) => !_.vcf || isValidUrl(_.vcf),
    vcfIndex: (_: SampleConfig) => !_.vcfIndex || isValidUrl(_.vcfIndex),
    vcf2: (_: SampleConfig) => !_.vcf2 || isValidUrl(_.vcf2),
    vcf2Index: (_: SampleConfig) => !_.vcf2Index || isValidUrl(_.vcf2Index)
};

export default function SampleConfigForm(props: { onAdd: (config: ValidSampleConfig) => void }) {
    const { onAdd } = props;
    const [sampleConfig, setSampleConfig] = useState<SampleConfig>({});
    const [showNewSampleConfig, setShowNewSampleConfig] = useState(false);
    const sampleOkayToAdd = useMemo(() => {
        let okay = true;
        Object.keys(testOkay).map(k => {
            okay = okay && testOkay[k](sampleConfig);
        });
        return okay;
    }, [sampleConfig]);

    return (
        <div className="menu-container">
            <div className="menu-title">
                <span
                    className="menu-title"
                    onClick={() => {
                        setShowNewSampleConfig(!showNewSampleConfig);
                    }}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                    Add New Sample
                    {showNewSampleConfig ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    )}
                </span>
                <span
                    className="menu-icon"
                    style={{ float: 'right', marginRight: '40px', fontWeight: 300 }}
                    onClick={() => window.open('https://chromoscope.bio/loading-data/through-interface', '_blank')}
                >
                    Document{' '}
                    <svg width={16} height={16} viewBox={ICONS.DOCS.viewBox}>
                        {ICONS.DOCS.path.map(d => (
                            <path key={d} fill="currentColor" d={d} />
                        ))}
                    </svg>
                </span>
            </div>
            <div
                className={showNewSampleConfig ? 'sample-config-form' : 'sample-config-form-hidden'}
                onClick={() => {
                    showNewSampleConfig ? null : setShowNewSampleConfig(true);
                }}
            >
                <div className="menu-subtitle">Assembly</div>
                <select
                    className="menu-dropdown"
                    onChange={e =>
                        setSampleConfig({ ...sampleConfig, assembly: e.currentTarget.value as 'hg19' | 'hg38' })
                    }
                    value={sampleConfig.assembly}
                >
                    <option key={'hg19'} value={'hg19'}>
                        hg19
                    </option>
                    <option key={'hg38'} value={'hg38'}>
                        hg38
                    </option>
                </select>

                <span className="menu-subtitle">
                    ID<sup>*</sup>
                </span>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.id(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="My sample 1, etc"
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, id: e.currentTarget.value })}
                    value={sampleConfig.id}
                />

                <div className="menu-subtitle">
                    Cancer<sup>*</sup>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.cancer(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="Gastric, Ovary, Prostate, etc"
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, cancer: e.currentTarget.value })}
                    value={sampleConfig.cancer}
                />

                <div className="menu-subtitle">
                    Baf<sup>*</sup> <small>(.tsv)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.baf(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, baf: e.currentTarget.value })}
                    value={sampleConfig.baf}
                />

                <div className="menu-subtitle">
                    Baf (higlass server)<sup>*</sup> <small>(.beddb)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={
                        testOkay.BAFonhiglass_server(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'
                    }
                    placeholder="https://..."
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, baf_server: e.currentTarget.value })}
                    value={sampleConfig.baf_server}
                />

                <div className="menu-subtitle">
                    Haplo<sup>*</sup> <small>(.tsv)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.haplo(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, haplo: e.currentTarget.value })}
                    value={sampleConfig.haplo}
                />

                <div className="menu-subtitle">
                    mendelian error<sup>*</sup> <small>(.csv)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.me(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, me: e.currentTarget.value })}
                    value={sampleConfig.me}
                />

                <div className="menu-subtitle">
                    mendelian error details<sup>*</sup> <small>(.csv)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.me2(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, me2: e.currentTarget.value })}
                    value={sampleConfig.me2}
                />

                <div className="menu-subtitle">
                    parent mapping<sup>*</sup> <small>(.csv)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.pm(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, pm: e.currentTarget.value })}
                    value={sampleConfig.pm}
                />

                <div className="menu-subtitle">
                    CNV <small>(.txt)</small>
                </div>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.cnv(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    onChange={e => setSampleConfig({ ...sampleConfig, cnv: e.currentTarget.value })}
                    value={sampleConfig.cnv}
                />

                <div className="menu-subtitle">
                    Drivers <small>(.txt)</small>
                </div>
                <input
                    type="text"
                    className={testOkay.drivers(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    onChange={e => setSampleConfig({ ...sampleConfig, drivers: e.currentTarget.value })}
                    value={sampleConfig.drivers}
                />

                <div className="menu-subtitle">
                    Point Mutation <small>(.vcf)</small>
                </div>
                <input
                    type="text"
                    className={testOkay.vcf(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    onChange={e => setSampleConfig({ ...sampleConfig, vcf: e.currentTarget.value })}
                    value={sampleConfig.vcf}
                />

                <div className="menu-subtitle">
                    Point Mutation Index <small>(.tbi)</small>
                </div>
                <input
                    type="text"
                    className={testOkay.vcfIndex(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    onChange={e => setSampleConfig({ ...sampleConfig, vcfIndex: e.currentTarget.value })}
                    value={sampleConfig.vcfIndex}
                />

                <div className="menu-subtitle">
                    Indel <small>(.vcf)</small>
                </div>
                <input
                    type="text"
                    className={testOkay.vcf2(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    onChange={e => setSampleConfig({ ...sampleConfig, vcf2: e.currentTarget.value })}
                    value={sampleConfig.vcf2}
                />

                <div className="menu-subtitle">
                    Indel Index <small>(.tbi)</small>
                </div>
                <input
                    type="text"
                    className={testOkay.vcf2Index(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="https://..."
                    onChange={e => setSampleConfig({ ...sampleConfig, vcf2Index: e.currentTarget.value })}
                    value={sampleConfig.vcf2Index}
                />

                <div className="menu-subtitle" style={{ float: 'right' }}>
                    * Required Fields
                </div>
                <button
                    className="menu-button"
                    onClick={() => {
                        setSampleConfig({
                            ...sampleConfig,
                            id: '7a921087-8e62-4a93-a757-fd8cdbe1eb8f',
                            cancer: 'Ovarian',
                            assembly: 'hg19',
                            cnv: 'https://s3.amazonaws.com/gosling-lang.org/data/SV/7a921087-8e62-4a93-a757-fd8cdbe1eb8f.consensus.20170119.somatic.cna.annotated.txt'
                        });
                    }}
                >
                    Fill in example datasets
                </button>
                <button
                    className={sampleOkayToAdd ? 'menu-button' : 'menu-button-disallowed'}
                    onClick={() => onAdd(sampleConfig as ValidSampleConfig)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
