import markSvZoomedInSpec from "./update-sv-spec/mark-sv-zoomed-in-spec";
import markSvZoomedOutSpec from "./update-sv-spec/mark-sv-zoomed-out-spec";
import chromosomeLinesSpec from "./update-spec-utils/chromosome-lines-spec";


export default function updateSvSpecFunc(
        width : number,
        height : number,
        identity : string,
){
    const params = [
        { func: markSvZoomedInSpec, type: "DUP", num: 6, 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedOutSpec, type: "DUP", num: 6 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedInSpec, type: "DEL", num: 5 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedOutSpec, type: "DEL", num: 5 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedInSpec, type: "INS", num: 4 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedOutSpec, type: "INS", num: 4 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedInSpec, type: "INV", num: 3 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedOutSpec, type: "INV", num: 3 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedInSpec, type: "BND", num: 2 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedOutSpec, type: "BND", num: 2 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedInSpec, type: "CNV", num: 1 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},
        { func: markSvZoomedOutSpec, type: "CNV", num: 1 , 
            data: "2428-500.bed.gz", upper_limit: 4000000000, lower_limit: 1600000000,},

        /** 
        { func: markSvZoomedInSpec, type: "DUP", num: 6, 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedOutSpec, type: "DUP", num: 6 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedInSpec, type: "DEL", num: 5 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedOutSpec, type: "DEL", num: 5 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedInSpec, type: "INS", num: 4 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedOutSpec, type: "INS", num: 4 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedInSpec, type: "INV", num: 3 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedOutSpec, type: "INV", num: 3 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedInSpec, type: "BND", num: 2 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedOutSpec, type: "BND", num: 2 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedInSpec, type: "CNV", num: 1 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
        { func: markSvZoomedOutSpec, type: "CNV", num: 1 , 
            data: "2428-1000.bed.gz", upper_limit: 1600000000, lower_limit: 800000000,},
            */
    ];
    const results = [];
    for (let p of params) {
        results.push(p.func(
          p.data,  
          identity,
          ["0/1", "1/0"],
          p.type,
          p.num,
          0.4,
          height,
          false,
          p.upper_limit,
          p.lower_limit,
        ));
        results.push(p.func(
          p.data,
          identity,
          ["1/1"],
          p.type,
          p.num,
          1,
          height,
          true,
          p.upper_limit,
          p.lower_limit,
        ));
    }
    const spec = {
        title: identity,
        width: width ,
        height: height ,
        alignment: 'overlay',
        tracks: [
            ...results,
            chromosomeLinesSpec(),
        ],
    };
    return spec;
}