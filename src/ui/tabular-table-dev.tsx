import React, { useRef, useEffect } from "react";

import { Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

export default function TabularTableDev() {
    const tableRef = useRef(null); //reference to the DOM element
    const tabulator = useRef(null); //reference to the Tabulator object

    //define the table data and columns
    const data = [
    { name: "John", age: 28, gender: "male" },
    { name: "Mary", age: 25, gender: "female" },
    { name: "Bob", age: 32, gender: "male" },
    ];

    const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "Gender", field: "gender" },
    ];

    useEffect(() => {
        //create a new Tabulator when the component is mounted
        tabulator.current = new Tabulator(tableRef.current, {
        data: data, //set initial table data
        columns: columns, //define table columns
    });
    }, []);

    return (
        <div 
        ref={tableRef}
        ></div>
    );
}

