import React, { useState, useRef, useEffect } from 'react';
import { GoslingComponent, GoslingRef } from 'gosling.js';
import UploadDataComponent from '../griet_figures_components/upload-data';
import ShowTilesetsComponent from '../griet_figures_components/show-tilesets-component';
import ExportButton from '../griet_figures_components/export-component';
import updateSpec from '../griet_figures_components/update-spec-func';


function GrietFigures(props) {
  // Use the useState hook to manage the loading state
  const [loading, setLoading] = useState(false);
  const [selectedTileset, setSelectedTileset] = useState<string>("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(300);
  const [yMax, setYMax] = useState(103);
  const [yMin, setYMin] = useState(-3); 
  const [lowerBoundary, setLowerBoundary] = useState(2.5)
  const [upperBoundary, setUpperBoundary] = useState(7.5)
  const [lowerColor, setLowerColor] = useState("#ff5733") //red
  const [midColor, setMidColor] = useState("#566573") //grey
  const [upperColor, setUpperColor] = useState("#6495ED") //blue
  const [spec, setSpec] = useState(updateSpec(selectedTileset, width, height, yMax, yMin, lowerBoundary, upperBoundary, lowerColor, midColor, upperColor)); // Pass yMax and yMin to updateSpec
  
  // Use the useRef hook to create a reference to the GoslingComponent
  const gosRef = useRef<GoslingRef>();

  // Define a function to update the selected tileset
  const handleTilesetChange = (tileset: string) => {
    console.log(tileset)
    setSelectedTileset(tileset);
  };
  
  // Use the useEffect hook to update the spec whenever the width, height, yMax or yMin changes
  useEffect(() => {
    setSpec(updateSpec(selectedTileset, width, height, yMax, yMin, lowerBoundary, upperBoundary, lowerColor, midColor, upperColor)); // Pass yMax and yMin to updateSpec
  }, [selectedTileset, width, height, yMax, yMin, lowerBoundary, upperBoundary, lowerColor, midColor, upperColor]); // Add yMax and yMin to the dependency array

  // Return the JSX elements
  return (
    <div>
      <UploadDataComponent />
      <ShowTilesetsComponent handleTilesetChange={handleTilesetChange} />
      <input
        type="number"
        id="width"
        name="width"
        onChange={function(e){
          setWidth(Number(e.target.value));
        }}
        placeholder="800" // Add the default value as a placeholder
      /> <b>width</b> <br />
      <input
        type="number"
        id="height"
        name="height"
        onChange={function(e){
          setHeight(Number(e.target.value));
        }}
        placeholder="300" // Add the default value as a placeholder
      /> <b>height</b> <br />
      <input
        type="number"
        id="yMax"
        name="yMax"
        onChange={function(e){
          setYMax(Number(e.target.value));
        }}
        placeholder="103" // Add the default value as a placeholder
      /> <b>yMax</b> <br />
      <input
        type="number"
        id="yMin"
        name="yMin"
        onChange={function(e){
          setYMin(Number(e.target.value));
        }}
        placeholder="-5" // Add the default value as a placeholder
      /> <b>yMin</b> <br />
      <input
        type="number"
        id="lowerBoundary"
        name="lowerBoundary"
        onChange={function(e){
          setLowerBoundary(Number(e.target.value));
        }}
        placeholder="2.5" // Add the default value as a placeholder
      /> <b>Lower Boundary</b> <br />
      <input
        type="number"
        id="upperBoundary"
        name="upperBoundary"
        onChange={function(e){
          setUpperBoundary(Number(e.target.value));
        }}
        placeholder="7.5" // Add the default value as a placeholder
      /> <b>Upper Boundary</b> <br />
      <input
        type="text"
        id = "lowerColor"
        name="lowerColor"
        onChange={function(e){
          setLowerColor(e.target.value);
        }}
        placeholder="#ff5733 (red)" 
      /> <b>Lower Color</b> <br />
      <input
        type="text"
        id = "midColor"
        name="midColor"
        onChange={function(e){
          setMidColor(e.target.value);
        }}
        placeholder="#566573 (dark grey)" 
      /> <b>Mid Color</b> <br />
      <input
        type="text"
        id = "upperColor"
        name="upperColor"
        onChange={function(e){
          setUpperColor(e.target.value);
        }}
        placeholder="#6495ED (blue)"
      /> <b>Upper Color</b> <br />
      <GoslingComponent 
        spec = {spec} 
        ref={gosRef} // Pass the reference to the GoslingComponent
      />
      <ExportButton onClick={function(){
        // Use the reference to access the GoslingComponent API
        gosRef.current?.api.exportPdf();
      }}/>
    </div>
  );
}

export default GrietFigures;


