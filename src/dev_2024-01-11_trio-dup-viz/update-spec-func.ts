import updateIdeogramSpecFunc from "./update-ideogram-spec-func";
import updateSvSpecFunc from "./update-sv-spec-func";

import generateSvDataSpec from "./update-sv-spec/sv-data-spec";
import transformDisplaceOverlayingDataSpec from "./update-spec-utils/transform-displace-overlaying-data-spec";
import transformOneofFilterSpec from "./update-spec-utils/transform-oneof-filter-spec";
import colorSpec from "./update-spec-utils/color-spec";
import sizeValueSpec from "./update-spec-utils/size-value-spec";
import xSpec from "./update-spec-utils/x-spec";
import xeSpec from "./update-spec-utils/xe-spec";
import yValueSpec from "./update-spec-utils/y-value-spec";
import chromosomeLinesSpec from "./update-spec-utils/chromosome-lines-spec";


function generateMarkSpec(
        y,
        field,
        oneof,
        opacity,
){
    const spec = {
        mark: "rect",
        y : {
            value : y ,
        },
        dataTransform: [
            transformOneofFilterSpec(field, oneof),
        ],
        opacity: { value: opacity },
    }
    return spec
}


function generateVisibileZoomedInSpec(){
    const spec = {
        "operation":  "greater-than-or-equal-to",
        "measure": "width",
        "threshold": 3,
        "transitionPadding": 0,
        "target": "mark",
    } 
    return spec
}


function generateVisibileZoomedOutSpec(){
    const spec = {
        "operation":  "less-than",
        "measure": "width",
        "threshold": 3,
        "transitionPadding": 0,
        "target": "mark",
    } 
    return spec
}


function generateMarkZoomedIn1PersonSpec(
        person_field: string,
        height: number,
        x_field_start: string,
        x_field_end: string,
        color_triplet: Array<string>,
){
    const color_ref = color_triplet[0]
    const color_hetero = color_triplet[1]
    const color_homo = color_triplet[2]
    var y_value;
    const size = height / (5*4)

    switch (person_field){
        case "p0":
            y_value = (3 * height) / 4 
            break
        case "p1":
            y_value = (2 * height) / 4
            break 
        case "p2":
            y_value = (1 * height) / 4
            break
    }
    const spec = {
        mark: "rect",
        x: xSpec(x_field_start,"bottom",true),
        xe: xeSpec(x_field_end),
        y: yValueSpec(y_value),
        size: sizeValueSpec(size),
        color: colorSpec(person_field,"nominal",
            ["./.",     "0/0",      "0/1",          "1/0",          "1/1"],
            [color_ref, color_ref,  color_hetero,   color_hetero,   color_homo],
        ),
        visibility: [
            generateVisibileZoomedInSpec(),
        ],
    }
    return spec
}


function generateMarkZoomedOut1PersonSpec(
    person_field: string,
    height: number,
    x_field_start: string,
    color_triplet: Array<string>,

){
    const color_ref = color_triplet[0]
    const color_hetero = color_triplet[1]
    const color_homo = color_triplet[2]
    var y_value;
    switch (person_field){
        case "p0":
            y_value = 3 * height / 4
            break
        case "p1":
            y_value = 2 * height / 4
            break 
        case "p2":
            y_value = 1 * height / 4
            break
    }
    const size = height / (5*4)
    const spec = {
        mark: "rect",
        x: xSpec(x_field_start,"bottom",true),
        y: yValueSpec(y_value),
        size: sizeValueSpec(size),
        color: colorSpec(person_field,"nominal",
            ["./.",     "0/0",      "0/1",          "1/0",          "1/1"],
            [color_ref, color_ref,  color_hetero,   color_hetero,   color_homo],
        ),
        visibility: [
            generateVisibileZoomedOutSpec(),
        ],
    }
    return spec
}


function generateZoomedInSVsSpec(height, selectedTileset){
    const spec = {   
        alignment: 'overlay',
        data: generateSvDataSpec(selectedTileset),
        dataTransform: [
            transformDisplaceOverlayingDataSpec("start","end","row",5),
        ],
        tracks: [
            generateMarkZoomedIn1PersonSpec("p0", height, "start", "end", ["grey", "orange", "green"]),
            generateMarkZoomedOut1PersonSpec("p0", height, "start", ["grey", "orange", "green"]),


            chromosomeLinesSpec(),
        ],
        height: height,
    }
    return spec
}


function generateZoomedOutSVsSpec(height, selectedTileset){
    const spec = {   
        alignment: 'overlay',
        data: generateSvDataSpec(selectedTileset),
        tracks: [
            generateMarkSpec(3*height/4, "p0", ["./.","0/0"], 0),
            generateMarkSpec(3*height/4, "p0", ["0/1","10"], 0.3),
            generateMarkSpec(3*height/4, "p0", ["1/1"], 1),

            generateMarkSpec(2*height/4, "p1", ["./.","0/0"], 0),
            generateMarkSpec(2*height/4, "p1", ["0/1","10"], 0.3),
            generateMarkSpec(2*height/4, "p1", ["1/1"], 1),

            generateMarkSpec(1*height/4, "p2", ["./.","0/0"], 0),
            generateMarkSpec(1*height/4, "p2", ["0/1","10"], 0.3),
            generateMarkSpec(1*height/4, "p2", ["1/1"], 1),
        ],
        x: xSpec("start","bottom",true),
        color : colorSpec("svtype", "nominal", ["DUP"], ["blue"]),            
        size: sizeValueSpec(height/5),
        height: height,
        overlayOnPreviousTrack: true,
    }
    return spec
}


export default function updateSpec(
        selected_tileset : string,
        width: number, 
        height: number,
){
    return {
        tracks: [
            updateIdeogramSpecFunc(
                width ,
                20 ,
            ),
            updateSvSpecFunc(
                width,
                height/3,
                "p0",
            ),
            updateSvSpecFunc(
                width,
                height/3,
                "p1",
            ),
            updateSvSpecFunc(
                width,
                height/3,
                "p2",
            ),
        ]
    };
}

