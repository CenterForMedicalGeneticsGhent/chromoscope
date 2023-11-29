import React from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import axios from "axios"; //import axios library for fetching data

import minMaxFilterEditor from "./min-max-filter-editor";
import minMaxFilterFunction from "./min-max-filter-function";

import { listFilterEditor, listFilterFunction } from "./list-filter";
import { chromosomes } from "./chromosomes";

//create a subcomponent for the table
class Table extends React.Component {
  el = React.createRef();

  tabulator = null; //variable to hold your table
  tableData = []; //initialize data for table to display as empty array
  url = this.props.url; //url for data to fetch from props

  componentDidMount() {
    //fetch data from url using axios
    axios.get(this.url)
      .then(response => {
        //update tableData with the fetched data
        this.tableData = response.data;
        //instantiate Tabulator when element is mounted
        this.tabulator = new Tabulator(this.el, {
          data: this.tableData, //link data to table
          reactiveData:true, //enable data reactivity
          columns: [ //define table columns
            {title:"#CHROM", field:"#CHROM", sorter:"string",headerFilter:listFilterEditor, headerFilterParams:{values:chromosomes},headerFilterFunc:listFilterFunction,headerFilterLiveFilter:false,},
            {title:"POS", field:"POS", sorter:"number",headerFilter:minMaxFilterEditor,headerFilterFunc:minMaxFilterFunction,headerFilterLiveFilter:false,},
            {title:"ID", field:"ID", sorter:"string",headerFilter: "input",headerFilterLiveFilter:false,},
            {title:"REF", field:"REF", sorter:"string",headerFilter: "input",headerFilterLiveFilter:false,},
            {title:"ALT", field:"ALT", sorter:"string", width:50,headerFilter: "input",headerFilterLiveFilter:false,},
            {title:"QUAL", field:"QUAL", sorter:"number",headerFilter:minMaxFilterEditor,headerFilterFunc:minMaxFilterFunction,headerFilterLiveFilter:false,},
            {title:"FILTER", field:"FILTER", sorter:"string",headerFilter: "input",headerFilterLiveFilter:false,},
            {title:"INFO", field:"INFO", sorter:"string", width:100,headerFilter: "input",headerFilterLiveFilter:false,},
            {title:"FORMAT", field:"FORMAT", sorter:"string", width:100,headerFilter: "input",headerFilterLiveFilter:false,},
            {title:"NA24143_DNA061748", field:"NA24143_DNA061748", sorter:"string", width:100,headerFilter: "input",headerFilterLiveFilter:false,}
          ],
          pagination:true, //enable pagination
          paginationMode:"local", //use local pagination mode
          paginationSize:10, //set pagination size to 10 rows per page
          paginationInitialPage:1, //set initial page to 1
          movableColumns: true,
        });
      })
      .catch(error => {
        //handle error
        console.log(error);
      });
  }

  //add table holder element to DOM
  render(){
    return (<div ref={el => (this.el = el)} />);
  }
}

//use the subcomponent in the main component
class App extends React.Component {
  //url for data to fetch
  url = "http://localhost:80/dev/tabular/sv";

  render(){
    return (<Table url={this.url} />);
  }
}

export default App;
