import markSvZoomedInSpec from "./update-sv-spec/mark-sv-zoomed-in-spec";
import markSvZoomedOutSpec from "./update-sv-spec/mark-sv-zoomed-out-spec";
import chromosomeLinesSpec from "./update-spec-utils/chromosome-lines-spec";


import svDataSpec from "./update-sv-spec/sv-data-spec";


export default function updateSvSpecFunc(
        selected_tileset : string,        
        width : number,
        height : number,
        identity : string,
){
    const params = [
        { func: markSvZoomedInSpec, type: "DUP", num: 6 },
        { func: markSvZoomedOutSpec, type: "DUP", num: 6 },
        { func: markSvZoomedInSpec, type: "DEL", num: 5 },
        { func: markSvZoomedOutSpec, type: "DEL", num: 5 },
        { func: markSvZoomedInSpec, type: "INS", num: 4 },
        { func: markSvZoomedOutSpec, type: "INS", num: 4 },
        { func: markSvZoomedInSpec, type: "INV", num: 3 },
        { func: markSvZoomedOutSpec, type: "INV", num: 3 },
        { func: markSvZoomedInSpec, type: "BND", num: 2 },
        { func: markSvZoomedOutSpec, type: "BND", num: 2 },
        { func: markSvZoomedInSpec, type: "CNV", num: 1 },
        { func: markSvZoomedOutSpec, type: "CNV", num: 1 },
    ];
    const results = [];
    for (let p of params) {
        results.push(p.func(
          identity,
          ["0/1", "1/0"],
          p.type,
          p.num,
          0.4,
          height,
          false,
        ));
        results.push(p.func(
          identity,
          ["1/1"],
          p.type,
          p.num,
          1,
          height,
          true,
        ));
    }
    const spec = {
        title: identity,
        width: width ,
        height: height ,
        alignment: 'overlay',
        data: svDataSpec(
            selected_tileset,
        ),
        tracks: [
            ...results,
            chromosomeLinesSpec(),
        ],
    };
    return spec;
}