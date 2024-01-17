import React, { useState, useRef, useEffect } from 'react';
import { GoslingComponent, GoslingRef } from 'gosling.js';
import UploadDataComponent from '../dev_2024-01-11_trio-dup-viz/upload-data'
import ShowTilesetsComponent from '../common_components/show-tilesets-component';
import ExportButton from '../common_components/export-component'
import updateSpec from '../dev_2024-01-11_trio-dup-viz/update-spec-func';


function trioDupFig(props) {
  // Use the useState hook to manage the loading state
  const [selectedTileset, setSelectedTileset] = useState<string>("");
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(150);
  const [spec, setSpec] = useState(updateSpec(selectedTileset, width, height)); 
  
  // Use the useRef hook to create a reference to the GoslingComponent
  const gosRef = useRef<GoslingRef>();

  // Define a function to update the selected tileset
  const handleTilesetChange = (tileset: string) => {
    setSelectedTileset(tileset);
  };
  
  useEffect(() => {
    setSpec(updateSpec(selectedTileset, width, height)); 
  }, [selectedTileset, width, height]); 

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
        placeholder="1600" // Add the default value as a placeholder
      /> <b>width</b> <br />
      <input
        type="number"
        id="height"
        name="height"
        onChange={function(e){
          setHeight(Number(e.target.value));
        }}
        placeholder="150" // Add the default value as a placeholder
      /> <b>height</b> <br />
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

export default trioDupFig;


