import * as React from "react";
import "./loading-component.css"; // a custom CSS file that defines the styles for the loading component

function LoadingComponent(): React.ReactElement {
  return (
    <div className="loading-container"> 
      <div className="loading-spinner"> 
        <div className="loading-circle">
        </div> 
      </div>
    </div>
  );
}

export default LoadingComponent;
