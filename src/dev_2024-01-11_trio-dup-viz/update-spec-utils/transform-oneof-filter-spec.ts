export default function transformOneofFilterSpec(
        field : string,
        oneof : Array<string>,
        not : boolean = false,
){
    const spec = {
        type: 'filter',
            field: field,
            oneOf: oneof, 
            not: not,
    };
    return spec;
}