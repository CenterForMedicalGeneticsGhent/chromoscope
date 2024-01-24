import markIdeogramBandsSpec from "./update-ideogram-spec/mark-ideogram-bands-spec";
import markIdeogramCentroQSpec from "./update-ideogram-spec/mark-ideogram-centro-q-spec";
import markIdeogramCentroPSpec from "./update-ideogram-spec/mark-ideogram-centro-p-spec";


export default function updateIdeogramSpecFunc(
    width : number,
    height: number,
){
const spec = {
    width: width ,
    height: height ,
    alignment: 'overlay',
    tracks: [
        markIdeogramBandsSpec(
            'Chromosome' ,
            'chromStart' , 
            'chromEnd' ,
            'Stain' ,
            ['gneg',    'gpos25',   'gpos50',   'gpos75',   'gpos100',  'gvar',     'acen'],
            ['white',   'lightgray','gray',     'gray',     'black',    '#7B9CC8',  '#DC4542'],
            height , 
        ),
        markIdeogramCentroQSpec(
            'Chromosome' ,
            'chromStart' , 
            'chromEnd' ,
            'Stain' ,
            ['gneg',    'gpos25',   'gpos50',   'gpos75',   'gpos100',  'gvar',     'acen'],
            ['white',   'lightgray','gray',     'gray',     'black',    '#7B9CC8',  '#DC4542'],
            height ,
        ),
        markIdeogramCentroPSpec(
            'Chromosome' ,
            'chromStart' , 
            'chromEnd' ,
            'Stain' ,
            ['gneg',    'gpos25',   'gpos50',   'gpos75',   'gpos100',  'gvar',     'acen'],
            ['white',   'lightgray','gray',     'gray',     'black',    '#7B9CC8',  '#DC4542'],
            height ,
        ),
    ],
}
return spec
}