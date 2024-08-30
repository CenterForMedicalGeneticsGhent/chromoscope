import ideogram_interpretation_1 from '../script/img/popover-images/ideogram/interpretation_1.png';
import ideogram_interpretation_2 from '../script/img/popover-images/ideogram/interpretation_2.png';
import driver_interpretation_1 from '../script/img/popover-images/driver/interpretation_1.png';
import driver_interpretation_2 from '../script/img/popover-images/driver/interpretation_2.png';
import driver_interactions_1 from '../script/img/popover-images/driver/interactions_1.png';
import genes_interpretation_1 from '../script/img/popover-images/genes/interpretation_1.png';
import genes_interpretation_2 from '../script/img/popover-images/genes/interpretation_2.png';
import genes_interactions_1 from '../script/img/popover-images/genes/interactions_1.png';
import genes_interactions_2 from '../script/img/popover-images/genes/interactions_2.png';
import mutations_interpretation_1 from '../script/img/popover-images/mutations/interpretation_1.png';
import mutations_interactions_1 from '../script/img/popover-images/mutations/interactions_1.png';
import mutations_interactions_2 from '../script/img/popover-images/mutations/interactions_2.png';
import indel_interpretation_1 from '../script/img/popover-images/indel/interpretation_1.png';
import indel_interpretation_2 from '../script/img/popover-images/indel/interpretation_2.png';
import indel_interactions_1 from '../script/img/popover-images/indel/interactions_1.png';
import copy_number_variants_interpretation_1 from '../script/img/popover-images/copy_number_variants/interpretation_1.png';
import copy_number_variants_interpretation_2 from '../script/img/popover-images/copy_number_variants/interpretation_2.png';
import copy_number_variants_interactions_1 from '../script/img/popover-images/copy_number_variants/interactions_1.png';
import gains_interpretation_1 from '../script/img/popover-images/gains/interpretation_1.png';
import gains_interpretation_2 from '../script/img/popover-images/gains/interpretation_2.png';
import loh_interpretation_1 from '../script/img/popover-images/loh/interpretation_1.png';
import loh_interpretation_2 from '../script/img/popover-images/loh/interpretation_2.png';
import structural_variants_interpretation_1 from '../script/img/popover-images/structural_variants/interpretation_1.png';
import structural_variants_interactions_1 from '../script/img/popover-images/structural_variants/interactions_1.png';
import structural_variants_interactions_2 from '../script/img/popover-images/structural_variants/interactions_2.png';
import coverage_interpretation_1 from '../script/img/popover-images/coverage/interpretation_1.png';
import coverage_interpretation_2 from '../script/img/popover-images/coverage/interpretation_2.png';
import alignment_interpretation_1 from '../script/img/popover-images/alignment/interpretation_1.png';
import alignment_interpretation_2 from '../script/img/popover-images/alignment/interpretation_2.png';
import alignment_interpretation_3 from '../script/img/popover-images/alignment/interpretation_3.png';
import alignment_interactions_1 from '../script/img/popover-images/alignment/interactions_1.png';
import sequence_interpretation_1 from '../script/img/popover-images/sequence/interpretation_1.png';

export type Track =
    | 'ideogram'
    | 'baf'
    | 'haplo'
    | 'mutation'
    | 'cnv'
    | 'mendelian-errors'
    | 'parent-mapping';

// TODO: Not ideal to hard coded!
// The heights of each track
export const getTrackDocData = (
    isMinimalMode: boolean
): { height: number; type: Track; title: string; popover_content?: string }[] => {
    return [
        {
            height: 50,
            type: 'ideogram',
            title: 'Ideogram',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr />
                        <div class="block with-image">
                            <img src="${ideogram_interpretation_1}" alt="Chromosome bands on Ideogram track." />
                            <div class="text">
                                <p><b>Black stripes</b> - indicate chromosome bands (cytobands) obtained from chromosome staining viewing under microscope.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <img src="${ideogram_interpretation_2}" alt="Chromosome centromeres on Ideogram track." />
                            <div class="text">
                                <p><span class="text-red"><b>Red Triangles</b></span> - represent chromosome centromeres.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            height: 240,
            type: 'baf',
            title: 'B Allele Frequency',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr class="header" />
                        <div class="section-content">
                            <div class="block with-image">
                                <img src="${driver_interpretation_1}" alt="Bi-allelic gene loss on Putative Driver track." />
                                <div class="text">
                                    <p><b>Circle with a dot</b> - denotes bi-allelic gene loss.</p>
                                    <p><b>Circle without a dot</b> - denotes one mutation in gene.</p>
                                </div>
                            </div>
                            <hr />
                            <div class="block with-image">
                            <img src="${driver_interpretation_2}" alt="Driver mutation names on Genome View." />
                                <div class="text">
                                    <p>Driver mutations are also annotated by name in the genome view.</p>
                                </div>
                            </div>
                            <hr />
                            <div class='block text-only'>
                                <p>Driver mutations need to be curated and pre-specified as part of Chromoscope configuration <a href="https://chromoscope.bio/loading-data/through-data-config" target="_blank" rel="noreferrer">data specification</a>.</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${driver_interactions_1}" alt="Putative Driver track annotation details pop up." />
                            <div class="text">
                                <p><b>Hover</b> - over driver variants to see annotation details.</p>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            height: 300,
            type: 'haplo',
            title: 'Haplotyping by Merlin',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr class="header" />
                        <div class="section-content">
                            <div class="block with-image">
                                <img src="${driver_interpretation_1}" alt="Bi-allelic gene loss on Putative Driver track." />
                                <div class="text">
                                    <p><b>Circle with a dot</b> - denotes bi-allelic gene loss.</p>
                                    <p><b>Circle without a dot</b> - denotes one mutation in gene.</p>
                                </div>
                            </div>
                            <hr />
                            <div class="block with-image">
                            <img src="${driver_interpretation_2}" alt="Driver mutation names on Genome View." />
                                <div class="text">
                                    <p>Driver mutations are also annotated by name in the genome view.</p>
                                </div>
                            </div>
                            <hr />
                            <div class='block text-only'>
                                <p>Driver mutations need to be curated and pre-specified as part of Chromoscope configuration <a href="https://chromoscope.bio/loading-data/through-data-config" target="_blank" rel="noreferrer">data specification</a>.</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${driver_interactions_1}" alt="Putative Driver track annotation details pop up." />
                            <div class="text">
                                <p><b>Hover</b> - over driver variants to see annotation details.</p>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            height: 60,
            type: 'mutation',
            title: 'Point Mutation',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                    <h3>Interpretation</h3>
                    <hr class="header"/>
                    <div class="block with-image">
                        <img src="${mutations_interpretation_1}" alt="Point Mutation track y-axis." />
                        <div class="text">
                            <p><b>Y-axis</b> shows the distance (in kb) between adjacent point mutations, on a logarithmic scale.</p>
                        </div>
                    </div>
                    <hr class="my-3" />
                    <div class="block text-only">
                        <p>At low magnification, only selected mutations are visible. More information on sampling <a href="https://chromoscope.bio/visualizations/data-sampling/" target="_blank" rel="noreferrer">here</a>.</p>
                    </div>
                </div>
                <div class='section interactions'>
                    <h3>Interactions</h3>
                    <hr class="header" />
                    <div class="block with-image">
                        <img src="${mutations_interactions_1}" alt="Point Mutation track at high magnification." />
                        <div class="text">
                            <p>
                                <b>Zoom in</b> - to reveal more point mutations.
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <div class="block with-image">
                        <img src="${mutations_interactions_2}" alt="Point Mutation track details pop up." />
                        <div class="text">
                            <p><b>Hover</b> - over a point mutation to see details.</p>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            height: 200,
            type: 'cnv',
            title: 'Copy Number Variants',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${copy_number_variants_interpretation_1}" alt="Copy Number Variants track." />
                            <div class="text">
                                <p><span class="text-gray"><b>Thick gray lines</b></span> - represent copy number profiles.</p>
                                <p><b>Y-axis</b> - represents the number of chromosome copies.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <img src="${copy_number_variants_interpretation_2}" alt="Copy Number Variants track." />
                            <div class="text">
                                <p>Copy number variants often coincide with structural variants.</p>
                            </div>
                        </div>
                    </div>
                    <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${copy_number_variants_interactions_1}" alt="Copy number segment details pop up." />
                            <div class="text">
                                <p>
                                    <b>Hover</b> - over the copy number segment to see the number of copies of each chromosomal regions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            height: 60,
            type: 'mendelian-errors',
            title: 'Mendelian Errors',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                    <h3>Interpretation</h3>
                    <hr class="header" />
                    <div class="block with-image">
                        <img src="${gains_interpretation_1}" alt="Gain track." />
                        <div class="text">
                            <p>Gains are declared in chromosomal regions where total number of copies exceeds 5.</p>
                        </div>
                    </div>
                    <hr />
                    <div class="block with-image">
                        <img src="${gains_interpretation_2}" alt="Region with Gains in Genome View." />
                        <div class="text">
                            <p>Regions with gains are marked in <span class="text-blue"><b>blue</b></span> on both Genome and Variant Views.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        },
        {
            height: 40,
            type: 'parent-mapping',
            title: 'Parent Mapping',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                <h3>Interpretation</h3>
                <hr class="header" />
                    <div class='block text-only'>
                        <p>LOH is declared in regions where a chromosome copy from one of the parents was entirely lost (minor copy number of 0).</p>
                    </div>
                    <div class="block with-image">
                        <img src="${loh_interpretation_1}" alt="Loss of Heterozygosity region in Variant View." />
                        <div class="text">
                            <p>Regions with LOH are marked in <span class="text-coral"><b>coral</b></span> in Variant View.</p>
                        </div>
                    </div>
                    <hr />
                    <div class="block with-image">
                        <img src="${loh_interpretation_2}" alt="Loss of Heterozygosity region in Genome View." />
                        <div class="text">
                            <p>Regions with LOH are marked in <span class="text-coral"><b>coral</b></span> in Genome View.</p>
                        </div>
                    </div>
                </div>
            </div>`
        },
    ];
};
