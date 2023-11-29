import React, { useState, useEffect } from "react";

import "react-tabulator/lib/styles.css"; 
import 'react-tabulator/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

export default function TabularTableDev({gosRef}) {

    // use state hook to store the data
    const [data, setData] = useState([]);

    // use effect hook to fetch the data when the component mounts
    useEffect(() => {
        // define the URL to fetch the data from
        const url = "http://localhost:80/dev/tabular/sv";

        // use fetch API to get the data
        fetch(url)
        .then((response) => response.json()) // parse the response as JSON
        .then((data) => {
            // map the data to the desired format
            const formattedData = data.map((item) => ({
                chromosome: item["#CHROM"],
                position: item["POS"],
                alt: item["ALT"],
                reference: item["REF"],
                quality: item["QUAL"],
                ID: item["ID"],
                info: item["INFO"],
                filter: item["FILTER"],
                format: item["FORMAT"],
                NA24143_DNA061748: item["NA24143_DNA061748"],
            }));

            // set the data state with the formatted data
            setData(formattedData);
        })
        .catch((error) => {
            // handle any errors
            console.error(error);
        });
    }, []); // pass an empty array as dependency to run only once

    //custom max min header filter
    var minMaxFilterEditor = function(cell, onRendered, success, cancel, editorParams){

        var end;

        var container = document.createElement("span");

        //create and style inputs
        var start = document.createElement("input");
        start.setAttribute("type", "number");
        start.setAttribute("placeholder", "Min");
        start.setAttribute("min", 0);
        start.setAttribute("max", 100);
        start.style.padding = "4px";
        start.style.width = "50%";
        start.style.boxSizing = "border-box";

        start.value = cell.getValue();

        function buildValues(){
            success({
                start:start.value,
                end:end.value,
            });
        }

        function keypress(e){
            if(e.keyCode == 13){
                buildValues();
            }

            if(e.keyCode == 27){
                cancel();
            }
        }

        end = start.cloneNode();
        end.setAttribute("placeholder", "Max");

        start.addEventListener("change", buildValues);
        start.addEventListener("blur", buildValues);
        start.addEventListener("keydown", keypress);

        end.addEventListener("change", buildValues);
        end.addEventListener("blur", buildValues);
        end.addEventListener("keydown", keypress);


        container.appendChild(start);
        container.appendChild(end);

        return container;
    }

    //custom max min filter function
    function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams){
        //headerValue - the value of the header filter element
        //rowValue - the value of the column in this row
        //rowData - the data for the row being filtered
        //filterParams - params object passed to the headerFilterFuncParams property

            if(rowValue){
                if(headerValue.start != ""){
                    if(headerValue.end != ""){
                        return rowValue >= headerValue.start && rowValue <= headerValue.end;
                    }else{
                        return rowValue >= headerValue.start;
                    }
                }else{
                    if(headerValue.end != ""){
                        return rowValue <= headerValue.end;
                    }
                }
            }

        return true; //must return a boolean, true if it passes the filter.
    }

    //custom list header filter
    var listFilterEditor = function(cell, onRendered, success, cancel, editorParams){

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
    function listFilterFunction(headerValue, rowValue, rowData, filterParams){
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


    //custom multi-select header filter
    var multiSelectFilterEditor = function(cell, onRendered, success, cancel, editorParams){

        var select;

        var container = document.createElement("span");

        //create and style select
        select = document.createElement("select");
        select.setAttribute("multiple", "multiple"); //enable multiple selection
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

        //set initial selected values
        var values = cell.getValue();
        if(values && values.length){
            values.forEach(function(value){
                select.querySelector("option[value='" + value + "']").setAttribute("selected", "selected");
            });
        }

        function buildValues(){
            var selected = Array.from(select.querySelectorAll("option:checked")).map(function(option){
                return option.value;
            });

            success(selected);
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

    //custom multi-select filter function
    function multiSelectFilterFunction(headerValue, rowValue, rowData, filterParams){
        //headerValue - the value of the header filter element
        //rowValue - the value of the column in this row
        //rowData - the data for the row being filtered
        //filterParams - params object passed to the headerFilterFuncParams property

        if(rowValue){
            return headerValue.includes(rowValue); //return true if the row value is in the header value array
        }

        return true; //must return a boolean, true if it passes the filter.
    }



    // An array to store the columns
    const chromosomes = {
        "all":"all",
        "chr1":"chr1", 
        "chr2":"chr2",
        "chr3":"chr3",
        "chr4":"chr4",
        "chr5":"chr5",
        "chr6":"chr6",
        "chr7":"chr7",
        "chr8":"chr8",
        "chr9":"chr9",
        "chr10":"chr10",
        "chr11":"chr11", 
        "chr12":"chr12",
        "chr13":"chr13",
        "chr14":"chr14",
        "chr15":"chr15",
        "chr16":"chr16",
        "chr17":"chr17",
        "chr18":"chr18",
        "chr19":"chr19",
        "chr20":"chr20",
        "chr21":"chr21",
        "chr22":"chr22",
        "chr23":"chr23",
        "chrX":"chrX",
        "chrY":"chrY",
        "chrM":"chrM",
    }
    const columns = [
        {
            title: "Chromosome", 
            field: "chromosome",
            //editor:listFilterEditor, 
            //editorParams:{values:chromosomes}, 
            headerFilter:listFilterEditor, 
            headerFilterParams:{values:chromosomes},
            headerFilterFunc:listFilterFunction,
            headerFilterLiveFilter:false,
        },
        {
            title: "Position", 
            field: "position",
            headerFilter:minMaxFilterEditor, 
            headerFilterFunc:minMaxFilterFunction, 
            headerFilterLiveFilter:false, 
        },
        {
            title: "Alt", 
            field: "alt",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
        {
            title: "Reference", 
            field: "reference",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
        {
            title: "Quality", 
            field: "quality",
            headerFilter:minMaxFilterEditor, 
            headerFilterFunc:minMaxFilterFunction, 
            headerFilterLiveFilter:false,
        },
        {
            title: "ID", 
            field: "ID",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
        {
            title: "Info", 
            field: "info",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
        {
            title: "Filter", 
            field: "filter",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
        {
            title: "Format", 
            field: "format",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
        {
            title: "NA24143_DNA061748", 
            field: "NA24143_DNA061748",
            headerFilter: "input", 
            headerFilterLiveFilter:false,
        },
    ]
   
    // add params
    const height = "800px"
    const pagination = true
    const paginationSize = 25
    const paginationSizeSelector = [5, 10, 25, 50, 100]
  
    return (
        <div>
        <ReactTabulator 
            data={data} 
            columns={columns} 
            height={height} //to enable scrolling
            options={{
                pagination:pagination,
                paginationSize:paginationSize,
                paginationSizeSelector:paginationSizeSelector,
            }}
            events = {{
                rowClick:function(e,row){
                    var window_size = 10000000
                    var cell = row.getCell("position"); 
                    var position = cell.getValue();
                    var cell = row.getCell("chromosome"); 
                    var chromosome = cell.getValue(); 

                    var start = position;
                    var end = position + window_size;

                    var trackID = "SRR7890905-mid-ideogram"
                    gosRef.current.api.zoomTo(
                        trackID,
                        `${chromosome}:${start}-${end}`,
                    )
                },
            }}
        />
        </div>
    );
}

