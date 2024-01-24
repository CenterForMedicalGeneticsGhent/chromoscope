export default function transformIncludeFilterSpec(
        field : string, 
        include : string, 
        not : boolean = false,
){
    const spec = { 
        type: 'filter', 
        field: field, 
        include: include,
        not: not,
    }
    return spec
}