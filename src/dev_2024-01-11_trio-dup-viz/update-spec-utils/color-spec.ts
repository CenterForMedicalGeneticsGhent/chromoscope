export default function colorSpec(
        field : string, 
        type : string, 
        domain : Array<string>, 
        range : Array<string>,
){
    const spec = {
        field: field,
        type: type,
        domain: domain,
        range: range,
    }
    return spec
}