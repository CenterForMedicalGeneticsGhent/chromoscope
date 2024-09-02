import ideogram_interpretation_1 from '../script/img/popover-images/ideogram/interpretation_1.png';
import ideogram_interpretation_2 from '../script/img/popover-images/ideogram/interpretation_2.png';
import mutations_interpretation_1 from '../script/img/popover-images/mutations/interpretation_1.png';
import mutations_interactions_1 from '../script/img/popover-images/mutations/interactions_1.png';
import mutations_interactions_2 from '../script/img/popover-images/mutations/interactions_2.png';
import copy_number_variants_interpretation_1 from '../script/img/popover-images/copy_number_variants/interpretation_1.png';
import copy_number_variants_interpretation_2 from '../script/img/popover-images/copy_number_variants/interpretation_2.png';
import copy_number_variants_interactions_1 from '../script/img/popover-images/copy_number_variants/interactions_1.png';

import mendelian_errors_interpretation_1 from '../script/img/popover-images/mendelian-errors/interpretation_1.png'
import mendelian_errors_interpretation_2 from '../script/img/popover-images/mendelian-errors/interpretation_2.png'
import mendelian_errors_interactions_1 from '../script/img/popover-images/mendelian-errors/interactions_1.png'
import mendelian_errors_interactions_2 from '../script/img/popover-images/mendelian-errors/interactions_2.png'
import parent_mapping_interpretation_1 from '../script/img/popover-images/parent-mapping/interpretation_1.png'
import parent_mapping_interactions_1 from '../script/img/popover-images/parent-mapping/interactions_1.png'


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
                                <img src="${ideogram_interpretation_1}" alt="Bi-allelic gene loss on Putative Driver track." />
                                <div class="text">
                                    <p><b>Circle with a dot</b> - denotes bi-allelic gene loss.</p>
                                    <p><b>Circle without a dot</b> - denotes one mutation in gene.</p>
                                </div>
                            </div>
                            <hr />
                            <div class="block with-image">
                            <img src="${ideogram_interpretation_1}" alt="Driver mutation names on Genome View." />
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
                            <img src="${ideogram_interpretation_1}" alt="Putative Driver track annotation details pop up." />
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
                                <img src="${ideogram_interpretation_1}" alt="Bi-allelic gene loss on Putative Driver track." />
                                <div class="text">
                                    <p><b>Circle with a dot</b> - denotes bi-allelic gene loss.</p>
                                    <p><b>Circle without a dot</b> - denotes one mutation in gene.</p>
                                </div>
                            </div>
                            <hr />
                            <div class="block with-image">
                            <img src="${ideogram_interpretation_1}" alt="Driver mutation names on Genome View." />
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
                            <img src="${ideogram_interpretation_1}" alt="Putative Driver track annotation details pop up." />
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
                    <div class='block text-only'>
                    <p> <span class="text-yellow"><b>Trio errors</b></span> involve inconsistencies in the child's genotype when considering the combined genotypes of both parents.
                        <span class="text-skyblue"><b>Father errors</b></span> arise when the child's genotype does not match the expected inheritance from the father.
                        <span class="text-vermillion"><b>Mother errors</b></span> occur when the child's genotype is inconsistent with the mother's genotype.</p>
                    </div>
                    <div class="block with-image">
                        <img src="${mendelian_errors_interpretation_1}" alt="Mendelian Errors track." />
                        <div class="text">
                            <p>When zoomed out to a scale greater than 1 million base pairs, Mendelian errors are aggregated every 1 million base pairs in the line chart.</p>
                        </div>
                    </div>
                    <hr />
                    <div class="block with-image">
                        <img src="${mendelian_errors_interpretation_2}" alt="Zoomed In Mendelian Errors track." />
                        <div class="text">
                            <p>When zoomed in to less than 1 million base pairs, individual Mendelian errors can be seen for each variant.</p>
                        </div>
                    </div>
                </div>
                <div class='section interactions'>
                    <h3>Interactions</h3>
                    <hr class="header" />
                    <div class="block with-image">
                        <img src="${mendelian_errors_interactions_1}" alt="Mendelian Errors line chart pop up." />
                        <div class="text">
                        <p>
                            <b>Hover</b> - over a point on the chart reveals the start and stop positions of the bin, as well as the total number of trio, father, and mother errors within that bin.
                        </p>
                        </div>
                    </div>
                    <hr />
                    <div class="block with-image">
                        <img src="${mendelian_errors_interactions_2}" alt="Zoomed In Mendelian Errors pop up." />
                        <div class="text">
                        <p>
                            <b>Hover</b> - over the individual mendelian errors to see the position and the amount of trio, father and mother errors.
                        </p>
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
                        <p> 'Parent mapping' is executed for every sample when at least one parent is available. Useful for hetero/iso-uniparental disomy (UPD) detection and to analyze whether aberrations are meiotic or mitotic. Variants of the child/embryo are distributed per parental origin.</p>
                    </div>
                    <div class="block with-image">
                        <img src="${parent_mapping_interpretation_1}" alt="Parent Mapping Track." />
                        <div class="text">
                            <p><span class="text-darkblue"><b>Dark blue boxes</b></span> - father-derived, homozygous variants. </p>
                            <p><span class="text-blue"><b>Light blue boxes</b></span> - father-derived, heterozygous variants. </p>
                            <p><span class="text-vermillion"><b>Vermillion boxes</b></span> - mother-derived, homozygous variants. </p>
                            <p><span class="text-orange"><b>Orange boxes</b></span> - mother-derived, heterozygous variants. </p>
                        </div>
                    </div>
                </div>
                <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${parent_mapping_interactions_1}" alt="Parent Mapping segment details pop up." />
                            <div class="text">
                                <p>
                                    <b>Hover</b> - over the parent mapping segment to see the chromosome, position, genotype, parental origin and variant.
                                </p>
                            </div>
                        </div>
                    </div>
            </div>`
        },
    ];
};
