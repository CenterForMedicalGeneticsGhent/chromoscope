import React, { useState, useEffect } from "react";
import axios from "axios";

// Add type annotations for the props
type ShowTilesetsComponentProps = {
  // Add a prop for the function passed from the parent component
  handleTilesetChange: (tileset: string) => void;
};

const ShowTilesetsComponent = ({
  // Destructure the props
  handleTilesetChange,
}: ShowTilesetsComponentProps) => {
  // Add type annotations for the state variables
  const [tilesets, setTilesets] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  // Use the useEffect hook to fetch the list of tilesets once the component mounts
  useEffect(() => {

    // Send a GET request to the localhost:80/tilesets/uuids/ endpoint
    axios
      .get("http://localhost:80/tilesets/uuids/")
      .then((response) => {
        // Handle success response
        // Filter the response data to keep only the tilesets that end with _raw
        const filteredTilesets = ["select tileset"].concat(response.data.filter((tileset: string) =>
          tileset != "mane"
        ));
        // Set the tilesets state variable to the filtered data
        setTilesets(filteredTilesets);
        // Set the loading prop to false
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        // Set the loading prop to false
      });
  }, []);

  // Add type annotations for the event handler parameters
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Set the selected state variable to the selected option value
    setSelected(e.target.value);
    // Call the function prop and pass the selected value as an argument
    handleTilesetChange(e.target.value);
  };

  return (
    <div className="list-component">
      <label htmlFor="tilesets">
        <strong>Select a tileset:</strong>
      </label>
      <select
        id="tilesets"
        name="tilesets"
        value={selected}
        onChange={handleSelectChange}
      >
        {tilesets.map((tileset) => (
          <option key={tileset} value={tileset}>
            {tileset}
          </option>
        ))}
      </select>
      <p>
        <strong>You selected: {selected}</strong>
      </p>
    </div>
  );
};

export default ShowTilesetsComponent;