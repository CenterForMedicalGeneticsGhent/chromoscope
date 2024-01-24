export default function xSpec(
        field : string, 
        axis : string, 
        grid : boolean,
){
    const spec = {
        field: field,
        type: "genomic",
        axis: axis,
        grid: grid,
    }
    return spec
}