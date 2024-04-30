import React from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import axios from "axios"; //import axios library for fetching data

const CHROMOSOMES = {
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

/**
 * Custom editor for a list filter in a Tabulator table.
 * @param {CellComponent} cell - The cell being edited.
 * @param {function} onRendered - Callback function after rendering the editor.
 * @param {function} success - Callback function to apply the edited value.
 * @param {function} cancel - Callback function to cancel editing.
 * @param {object} editorParams - Additional parameters for the editor (e.g., values).
 * @returns {HTMLElement} - The container element containing the custom editor.
 */
function listFilterEditor(cell, onRendered, success, cancel, editorParams) {
  var select;
  var container = document.createElement("span");
  // Create and style the select element
  select = document.createElement("select");
  select.style.padding = "4px";
  select.style.width = "100%";
  select.style.boxSizing = "border-box";
  // Add options to the select
  var options = editorParams.values || {};
  Object.keys(options).forEach(function (key) {
      var option = document.createElement("option");
      option.value = key;
      option.text = options[key];
      select.appendChild(option);
  });
  // Set the initial value of the select to match the cell's value
  select.value = cell.getValue();
  // Function to apply the selected value
  function buildValues() {
      success(select.value);
  }
  // Attach event listeners
  select.addEventListener("change", buildValues); // event when selecting new option in box
  select.addEventListener("blur", buildValues); // event when clicking outside of box
  // Prevent the dropdown from collapsing immediately
  select.addEventListener("mousedown", function (e) {
      e.stopPropagation(); // Prevent the click event from propagating
  });
  // Append the select to the container
  container.appendChild(select);
  return container;
}

/**
 * Custom filter function for a list filter in a Tabulator table.
 * @param {string} headerValue - The value selected in the filter header (e.g., "all").
 * @param {string} rowValue - The value of the cell in the row being filtered.
 * @param {object} rowData - The entire data object for the row being filtered.
 * @param {object} filterParams - Additional parameters for the filter.
 * @returns {boolean} - Whether the row passes the filter (true) or not (false).
 */
function listFilterFunction(headerValue, rowValue, rowData, filterParams) {
  if (headerValue === "all") {
      // If "all" is selected, allow all rows
      return true;
  } else if (rowValue) {
      // Check if the row value matches the header value or starts with it
      // Example: If headerValue is "chr1", this filter allows:
      // - Exact matches like "chr1"
      // - Contigs like "chr1_K1270895v1_alt"
      return rowValue === headerValue || rowValue.startsWith(headerValue + "_");
  }
  // Default behavior: allow all rows
  return true;
}

/**
 * Custom editor for a min-max filter in a Tabulator table.
 * @param {CellComponent} cell - The cell being edited.
 * @param {function} onRendered - Callback function after rendering the editor.
 * @param {function} success - Callback function to apply the edited value.
 * @param {function} cancel - Callback function to cancel editing.
 * @param {object} editorParams - Additional parameters for the editor (e.g., min, max).
 * @returns {HTMLElement} - The container element containing the custom editor.
 */
function minMaxFilterEditor(cell, onRendered, success, cancel, editorParams) {
  // Create container element
  var container = document.createElement("span");
  // Create input for the minimum value
  var start = document.createElement("input");
  start.setAttribute("type", "number");
  start.setAttribute("placeholder", "Min");
  start.setAttribute("min", editorParams.min || 0); // Set minimum value (default to 0)
  start.setAttribute("max", editorParams.max || 3000000000); // Set maximum value (default to 3000000000)
  start.style.padding = "4px";
  start.style.width = "50%";
  start.style.boxSizing = "border-box";
  start.value = cell.getValue();
  // Create a clone of the input for the maximum value
  var end = start.cloneNode();
  end.setAttribute("placeholder", "Max");
  // Function to apply the selected values (start and end)
  function buildValues() {
      success({
          start: start.value,
          end: end.value,
      });
  }
  // Handle keypress events (Enter and Escape)
  function keypress(e) {
      if (e.keyCode === 13) {
          // Enter Key
          buildValues();
      }
      if (e.keyCode === 27) {
          // Escape Key
          cancel();
      }
  }
  // Attach event listeners to both inputs
  start.addEventListener("change", buildValues);
  start.addEventListener("blur", buildValues);
  start.addEventListener("keydown", keypress);
  end.addEventListener("change", buildValues);
  end.addEventListener("blur", buildValues);
  end.addEventListener("keydown", keypress);
  // Append both inputs to the container
  container.appendChild(start);
  container.appendChild(end);
  return container;
}


/**
 * Custom filter function for a min-max filter in a Tabulator table.
 * @param {object} headerValue - The selected values (start and end) from the filter header.
 * @param {string} rowValue - The value of the cell in the row being filtered.
 * @param {object} rowData - The entire data object for the row being filtered.
 * @param {object} filterParams - Additional parameters for the filter.
 * @returns {boolean} - Whether the row passes the filter (true) or not (false).
 */
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams) {
  if (rowValue) {
      // Check if the row value exists
      if (headerValue.start !== "") {
          // If a minimum value is specified
          if (headerValue.end !== "") {
              // If both minimum and maximum values are specified
              return rowValue >= headerValue.start && rowValue <= headerValue.end;
          } else {
              // Only minimum value is specified
              return rowValue >= headerValue.start;
          }
      } else {
          // If no minimum value is specified
          if (headerValue.end !== "") {
              // Only maximum value is specified
              return rowValue <= headerValue.end;
          }
      }
  }
  // Default behavior: allow all rows
  return true;
}

/**
 * React component for displaying a Tabulator table.
 */
class Table extends React.Component {
  el = React.createRef(); // Reference to the table element
  tabulator = null; // Tabulator instance
  constructor(props) {
      super(props);
      this.url = this.props.url; // URL for fetching data
      this.gosRef = this.props.gosRef; 
      this.demo_id = props.demo_id;
      // console.log(props); // Log props (for debugging or information)
  }
  componentDidMount() {
      // Fetch data from the specified URL using axios
      axios.get(this.url)
          .then(response => {
              // Update tableData with the fetched data
              this.tableData = response.data;
              // Instantiate Tabulator when the element is mounted
              this.tabulator = new Tabulator(this.el, {
                  data: this.tableData, // Link data to the table
                  reactiveData: true, // Enable data reactivity
                  // Define the columns for the genomic table
                  columns: [
                    {
                        title: "#CHROM", 
                        field: "#CHROM", 
                        sorter: "string", 
                        headerFilter: listFilterEditor, // Custom header filter editor
                        headerFilterParams: { values: CHROMOSOMES }, // Filter parameters (list of chromosome values)
                        headerFilterFunc: listFilterFunction, // Custom filter function for this column
                        headerFilterLiveFilter: false, // Disable live filtering
                    },
                    {
                        title: "POS",
                        field: "POS",
                        sorter: "number", // Sorter type (numeric sorting)
                        width: 120, 
                        headerFilter: minMaxFilterEditor, // Custom header filter editor for min-max range
                        headerFilterFunc: minMaxFilterFunction, // Custom filter function for this column
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "ID",
                        field: "ID",
                        sorter: "string",
                        headerFilter: "input", // Simple input filter for ID column
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "REF",
                        field: "REF",
                        sorter: "string",
                        headerFilter: "input",
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "ALT",
                        field: "ALT",
                        sorter: "string",
                        width: 120, 
                        headerFilter: "input",
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "QUAL",
                        field: "QUAL",
                        sorter: "number",
                        width: 120,
                        headerFilter: minMaxFilterEditor,
                        headerFilterFunc: minMaxFilterFunction,
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "FILTER",
                        field: "FILTER",
                        sorter: "string",
                        headerFilter: "input",
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "INFO",
                        field: "INFO",
                        sorter: "string",
                        width: 100,
                        headerFilter: "input",
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "FORMAT",
                        field: "FORMAT",
                        sorter: "string",
                        width: 100,
                        headerFilter: "input",
                        headerFilterLiveFilter: false,
                    },
                    {
                        title: "NA24143_DNA061748",
                        field: "NA24143_DNA061748",
                        sorter: "string",
                        width: 100,
                        headerFilter: "input",
                        headerFilterLiveFilter: false,
                    },
                  ],
                  pagination: true, // Enable pagination
                  paginationMode: "local", // Use local pagination mode
                  paginationSize: 10, // Set pagination size to 10 rows per page
                  paginationInitialPage: 1, // Set initial page to 1
                  movableColumns: true,
              });
              // Handle row click event
              var gosRef = this.gosRef;
              var demo_id = this.demo_id;
              this.tabulator.on("rowClick", function (e, row) {
                  var window_size = 10000000;
                  var positionCell = row.getCell("POS"); // Make sure to use the correct field key
                  var position = positionCell.getValue();
                  var chromosomeCell = row.getCell("#CHROM"); // Make sure to use the correct field key
                  var chromosome = chromosomeCell.getValue();
                  var start = position;
                  var end = position + window_size;
                  //var trackID = gosRef.current.api.getViews()[0].id; // Assuming trackID is predefined
                  var trackID = `${demo_id}-mid-ideogram`;
                  // Assuming gosRef is a reference to an external component
                  gosRef.current.api.zoomTo(
                      trackID,
                      `${chromosome}:${start}-${end}`
                  );
              });
          })
          .catch(error => {
              // Handle error (e.g., log or display an error message)
              console.log(error);
          });
  }
  // Add the table holder element to the DOM
  render() {
      return (<div ref={el => (this.el = el)} />);
  }
}

/**
 * React component for displaying a genomic table.
 */
class GenomicTable extends React.Component {
  constructor(props) {
    super(props);
    this.url = props.data_url; // URL for fetching data
    this.demo_id = props.demo_id;
    this.gosRef = props.gosRef; // Reference to an external component
  }
  render() {
    return (
      <Table
          url={this.url}
          gosRef={this.gosRef}
          demo_id={this.demo_id}
      />
    );
  }
}


export default GenomicTable;

