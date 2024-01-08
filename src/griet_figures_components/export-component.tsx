// Import React and the button component from React Bootstrap
import React from "react";

// Define the props for the component
interface ExportButtonProps {
  // The function to call when the button is clicked
  onClick: () => void;
}

// Define the component as a functional component
const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => {
  // Return the JSX element for the button
  return (
    <button onClick={onClick}>
      Export
    </button>
  );
};

// Export the component
export default ExportButton;
