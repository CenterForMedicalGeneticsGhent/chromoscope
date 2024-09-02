import React from 'react';
import genome_interactions_1 from '../script/img/modal_images/genome_view/interactions_1.png';
import genome_interactions_2 from '../script/img/modal_images/genome_view/interactions_2.png';
import genome_interactions_3 from '../script/img/modal_images/genome_view/interactions_3.png';
import genome_interactions_4 from '../script/img/modal_images/genome_view/interactions_4.png';
import genome_interactions_5 from '../script/img/modal_images/genome_view/interactions_5.png';
import summary_interpretation_1 from '../script/img/modal_images/genome_view/interpretation_1.png';


export const GenomeViewModal = () => {
    return (
        <div
            className="modal fade"
            id="genome-view-modal"
            tabIndex={-1}
            aria-labelledby="Genome View Instruction Modal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Genome View Instructions
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body-content">
                            <div className="section interactions">
                                <h3>Interactions</h3>
                                <hr className="header" />
                                <div className="section-content">
                                    <div className="block with-image">
                                        <img
                                            src={genome_interactions_1}
                                            alt="Grab cursor over blue, selected region in Genome View."
                                        />
                                        <div className="text">
                                            <p>
                                                <b>Click and drag</b> - the blue selection brush to highlight regions of
                                                the genome.
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="block with-image">
                                        <img
                                            src={genome_interactions_2}
                                            alt="Move cursor over edge of blue, selected region in Genome View."
                                        />
                                        <div className="text">
                                            <p>
                                                <b>Click and drag</b> - the edges of the selection brush to resize it.
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="block with-image">
                                        <img
                                            src={genome_interactions_3}
                                            alt="Summary of Variants detail pop up in Genome View."
                                        />
                                        <div className="text">
                                            <p>
                                                <b>Hover</b> - over a summary of variants to see detailed information.
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="block with-image">
                                        <img
                                            src={genome_interactions_4}
                                            alt="whole genome view"
                                        />
                                        <div className="text">
                                            <p>
                                                <b>Dropdown menu</b> - select whole genome view or specific chromosome to view.
                                            </p>
                                            <p>
                                                <b>Red line</b> - marks the region of interest. 
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="block with-image">
                                        <img
                                            src={genome_interactions_5}
                                            alt="specific chromosome"
                                        />
                                        <div className="text">
                                            <p>
                                                <b>Dropdown menu</b> - show a specific chromosome.
                                            </p>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="block with-image">
                                        <img
                                            src={summary_interpretation_1}
                                            alt="summary"
                                        />
                                        <div className="text">
                                            <p>
                                                <b>Summary tracks</b> - show a summary of the data
                                            </p>
                                            <p>
                                                <b>Genotype quality</b> - shows the amount of variants with a certain genotype quality (GQ) from 0-100.
                                            </p>
                                            <p>
                                                <b>Allele frequency</b> - shows the amount of variants with a certain Allele frequency (AF) 0-100%
                                            </p>
                                            <p>
                                                <b>Depth of coverage</b> - shows the amount of variants with a certain depth, the higher the better.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
