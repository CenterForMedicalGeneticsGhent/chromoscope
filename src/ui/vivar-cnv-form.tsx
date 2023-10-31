import React, { useMemo, useState } from 'react';
import { ICONS } from '../icon';

type VivarCnvSampleConfig = {
    id: string;
    file: FileList;
}

type ValidVivarCnvSampleConfig = {
    id: string;
    file: FileList;
}

const testOkay = {
    id: (_: VivarCnvSampleConfig) => _.id,
    file: (_: VivarCnvSampleConfig) => _.file,
};

export default function VivarCnvForm(props: { onAdd: (config: ValidVivarCnvSampleConfig) => void }) {
    const { onAdd } = props;
    const [sampleConfig, setSampleConfig] = useState<VivarCnvSampleConfig>({});
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
                    Add Vivar CNV Sample
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
            </div>
            <div
                className={showNewSampleConfig ? 'sample-config-form' : 'sample-config-form-hidden'}
                onClick={() => {
                    showNewSampleConfig ? null : setShowNewSampleConfig(true);
                }}
            >
                <span className="menu-subtitle">
                    ID
                </span>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input
                    type="text"
                    className={testOkay.id(sampleConfig) ? 'menu-text-input' : 'menu-text-input-invalid'}
                    placeholder="test"
                    required
                    onChange={e => setSampleConfig({ ...sampleConfig, id: e.currentTarget.value })}
                    value={sampleConfig.id}
                />
                <span className="menu-subtitle">
                    File
                </span>
                {/* <span className="menu-subtitle-right">Required</span> */}
                <input 
                    type="file" 
                    className={testOkay.file(sampleConfig) ? 'menu-file-input' : 'menu-file-input-invalid'}
                    placeholder="109244_raw.csv"
                    required
                    onChange={undefined}
                    value={undefined}
                />
                <button
                    className="menu-button"
                    onClick={() => {
                        setSampleConfig({
                            ...sampleConfig,
                            id: 'test',
                        });
                    }}
                >
                    Fill in example datasets
                </button>
                <button
                    className={sampleOkayToAdd ? 'menu-button' : 'menu-button-disallowed'}
                    onClick={() => onAdd(sampleConfig as ValidVivarCnvSampleConfig)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
