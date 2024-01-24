import ideogramDataSpec from "./ideogram-data-spec";
import transformIncludeFilterSpec from "../update-spec-utils/transform-include-filter-spec"
import transformOneofFilterSpec from "../update-spec-utils/transform-oneof-filter-spec"
import colorSpec from "../update-spec-utils/color-spec";
import sizeValueSpec from "../update-spec-utils/size-value-spec";
import xSpec from "../update-spec-utils/x-spec";
import xeSpec from "../update-spec-utils/xe-spec";
import strokewidthValueSpec from "../update-spec-utils/strokewidth-value-spec";


export default function markIdeogramCentroPSpec(
        chromosome_field : string,
        start_field : string,
        end_field : string,
        color_field: string,
        color_domain : Array<string>,
        color_range : Array<string>,
        mark_height : number,
){
    const spec = {
        mark: 'triangleLeft',
        data : ideogramDataSpec(
            chromosome_field ,
            start_field ,
            end_field ,
        ),
        dataTransform: [
            transformOneofFilterSpec(
                "Stain" , 
                [ 'acen' ] ,
            ),
            transformIncludeFilterSpec(
                "Name" , 
                "p" ,
            ),
        ],
        color: colorSpec(
            color_field ,
            'nominal' ,
            color_domain ,
            color_range ,
        ),
        size: sizeValueSpec(
            mark_height , 
        ),        
        x : xSpec(
            start_field, 
            'top', 
            false,
        ),        
        xe : xeSpec(
            end_field,
        ),
        strokeWidth: strokewidthValueSpec(0),
    }
    return spec
}