import React, { useState } from "react";

import 'react-tabulator/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

export default function TabularTableDev() {

    //define the table data and columns
    // A function to generate a random name
    const randomName = () => {
        // An array of possible first names
        const firstNames = ["John", "Mary", "Bob", "Alice", "David", "Emma", "James", "Anna", "Tom", "Lisa"];
        // An array of possible last names
        const lastNames = ["Smith", "Jones", "Brown", "Johnson", "Miller", "Davis", "Wilson", "Taylor", "Clark", "Lee"];
        // Pick a random first name from the array
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        // Pick a random last name from the array
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        // Return the full name
        return firstName + " " + lastName;
    };

    // A function to generate a random age between 18 and 65
    const randomAge = () => {
        return Math.floor(Math.random() * 48) + 18;
    };

    // A function to generate a random gender
    const randomGender = () => {
        // An array of possible genders
        const genders = ["male", "female"];
        // Pick a random gender from the array
        return genders[Math.floor(Math.random() * genders.length)];
    };

    // A function to generate a random occupation
    const randomOccupation = () => {
        // An array of possible occupations
        const occupations = ["teacher", "doctor", "lawyer", "engineer", "nurse", "accountant", "chef", "artist", "writer", "student"];
        // Pick a random occupation from the array
        return occupations[Math.floor(Math.random() * occupations.length)];
    };

    // A function to generate a random salary between 20000 and 100000
    const randomSalary = () => {
        return Math.floor(Math.random() * 80001) + 20000;
    };

    // A function to generate a random email address based on the name
    const randomEmail = (name) => {
        // Split the name by space
        const nameParts = name.split(" ");
        // Use the first letter of the first name and the full last name as the username
        const username = nameParts[0][0] + nameParts[1];
        // An array of possible domains
        const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com"];
        // Pick a random domain from the array
        const domain = domains[Math.floor(Math.random() * domains.length)];
        // Return the email address
        return username + "@" + domain;
    };

    // A function to generate a random phone number
    const randomPhone = () => {
        // An array of possible area codes
        const areaCodes = ["202", "212", "213", "305", "312", "323", "347", "415", "510", "646"];
        // Pick a random area code from the array
        const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
        // Generate a random 7-digit number
        const number = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
        // Format the phone number
        return "(" + areaCode + ") " + number.slice(0, 3) + "-" + number.slice(3);
    };

    // An array to store the data
    const data = [];

    // A loop to generate 1048576 rows of data
    for (let i = 0; i < 1048576; i++) {
        // Generate a random name
        const name = randomName();
        // Generate a random age
        const age = randomAge();
        // Generate a random gender
        const gender = randomGender();
        // Generate a random occupation
        const occupation = randomOccupation();
        // Generate a random salary
        const salary = randomSalary();
        // Generate a random email
        const email = randomEmail(name);
        // Generate a random phone
        const phone = randomPhone();
        // Create an object with the data
        const row = { name, age, gender, occupation, salary, email, phone };
        // Push the object to the data array
        data.push(row);
    }

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

        if(rowValue){
            return rowValue == headerValue; //return true if the row value matches the header value
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
    const columns = [
        { 
            title: "Name", field: "name", 
            headerFilter: "input", headerFilterLiveFilter:false, headerFilterPlaceholder:"--search for name--"
        },
        { 
            title: "Age", field: "age", 
            headerFilter:minMaxFilterEditor, 
            headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false,        
        },
        { 
            title: "Gender", field: "gender",
            editor:listFilterEditor, editorParams:{values:{"male":"male", "female":"female"}}, 
            headerFilter:listFilterEditor, headerFilterParams:{values:{"male":"male", "female":"female"}}, 
            headerFilterFunc:listFilterFunction,
            headerFilterLiveFilter:false,
        },
        { 
            title: "Occupation", field: "occupation",
            editor:multiSelectFilterEditor, 
            editorParams:{values:{"teacher":"teacher", "doctor":"doctor", "lawyer":"lawyer", "engineer":"engineer", "nurse":"nurse", "accountant":"accountant", "chef":"chef", "artist":"artist", "writer":"writer", "student":"student"}}, 
            headerFilter:multiSelectFilterEditor, 
            headerFilterParams:{values:{"teacher":"teacher", "doctor":"doctor", "lawyer":"lawyer", "engineer":"engineer", "nurse":"nurse", "accountant":"accountant", "chef":"chef", "artist":"artist", "writer":"writer", "student":"student"}}, 
            headerFilterFunc:multiSelectFilterFunction,
            headerFilterLiveFilter:false,
        },
        { 
            title: "Salary", field: "salary",
            headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">=", headerFilterLiveFilter:false,
        },
        { 
            title: "Email", field: "email",
        },
        { 
            title: "Phone", field: "phone",
            headerFilter:"tickCross",  headerFilterParams:{"tristate":true},headerFilterEmptyCheck:function(value){return value === null}, 
        },
    ];

    // add params
    const height = "700px"
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
        />
        </div>
    );
}

