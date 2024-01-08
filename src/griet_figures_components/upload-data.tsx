import React, { useState } from "react";
import axios from "axios";

const UploadDataComponent = () => {
  // Add type annotations for the state variables
  const [file, setFile] = useState<File | null>(null);

  // Add type annotations for the event handler parameters
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Use the as keyword to cast the event target to HTMLInputElement
    setFile((e.target as HTMLInputElement).files[0]);
  };

  // Add type annotations for the event handler parameters
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // Send a POST request to the localhost:80/ingest/vivar/raw/{uid} endpoint with the formData
    axios
      .post(`http://localhost:80/dev/ingest/griet`, formData)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        // Reload the react component after the upload is completed
        window.location.reload();
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
      });
  };

  return (
    <div className="form-component">
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <strong>Submit</strong>
        </button>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
};

export default UploadDataComponent;
