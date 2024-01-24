export default function transformDisplaceOverlayingDataSpec(
        start_field: string,
        end_field: string,
        new_field: string,
        max_rows: number,
){
    const spec = {
        type: "displace",
        method: "pile",
        boundingBox: {
            startField: start_field, 
            endField: end_field,
        },
        newField: new_field,
        maxRows: max_rows,
    };
    return spec
}

// start
// end
// row
// max_rows