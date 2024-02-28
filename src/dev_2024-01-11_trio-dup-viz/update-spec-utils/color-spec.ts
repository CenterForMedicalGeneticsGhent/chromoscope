export default function colorSpec(
        field : string, 
        type : string, 
        domain : Array<string>, 
        range : Array<string>,
        legend : boolean = false,
){
    const spec = {
        field: field,
        type: type,
        domain: domain,
        range: range,
        legend : legend,
    }
    return spec
}