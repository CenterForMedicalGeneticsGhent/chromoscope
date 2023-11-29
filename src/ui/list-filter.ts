//custom list header filter
export var listFilterEditor = function(cell, onRendered, success, cancel, editorParams){

    var select;

    var container = document.createElement("span");

    //create and style select
    select = document.createElement("select");
    select.style.padding = "4px";
    select.style.width = "100%";
    select.style.boxSizing = "border-box";

    //add options to select
    var options = editorParams.values || {}; //get list of values from editorParams
    Object.keys(options).forEach(function(key){
        var option = document.createElement("option");
        option.value = key;
        option.text = options[key];
        select.appendChild(option);
    });

    select.value = cell.getValue();

    function buildValues(){
        success(select.value);
    }

    function keypress(e){
        if(e.keyCode == 13){
            buildValues();
        }

        if(e.keyCode == 27){
            cancel();
        }
    }

    select.addEventListener("change", buildValues);
    select.addEventListener("blur", buildValues);
    select.addEventListener("keydown", keypress);

    container.appendChild(select);

    return container;
}

//custom list filter function
export function listFilterFunction(headerValue, rowValue, rowData, filterParams){
    //headerValue - the value of the header filter element
    //rowValue - the value of the column in this row
    //rowData - the data for the row being filtered
    //filterParams - params object passed to the headerFilterFuncParams property
    if(headerValue == "all" ){
        return true;
    }else if(rowValue){
        return rowValue == headerValue || rowValue.startsWith(headerValue + "_") 
    }

    return true; //must return a boolean, true if it passes the filter.
}