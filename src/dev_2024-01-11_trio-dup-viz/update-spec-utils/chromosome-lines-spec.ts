import colorValueSpec from "./color-value-spec"
import opacityValueSpec from "./opacity-value-spec"
import xSpec from "./x-spec"

export default function chromosomeLinesSpec(){
    const spec = {
        data: {
            type: 'json',
            chromosomeField: 'c',
            genomicFields: ['p'],
            values: generateData(),
        },
        mark:  'rule',
        x: xSpec("p","none",false),
        color: colorValueSpec("black"),
        opacity: opacityValueSpec(0.5),
    }
    return spec
}


function generateData(){
    var values = []
    for ( let i = 2; i <= 21; i++ ) {
        values.push({ 
            c: 'chr' + i , 
            p: 0 ,
        })
    }
    values.push(
        { c: 'chrX', p: 0 }, 
        { c: 'chrY', p: 0 }
    )
    return values
}