import React from "react";
import "./CubeLoader.css";

const CubeLoader = () => {
  return (
    <div className="container-loader">
      <div className="cube">
        <div className="top"></div>
        <div>
          <span style={{ "--i": 0 }}></span>
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
        </div>
      </div>
    </div>
  );
};

{
  /**
 <div class="svg-container">
          <svg width="400" height="100">
              <text x="10" y="50" class="text" id="letterG">G</text>
              <text x="60" y="50" class="text" id="letterO">O</text>
              <text x="110" y="50" class="text" id="letterD">D</text>
              <text x="160" y="50" class="text" id="letterI">I</text>
              <text x="210" y="50" class="text" id="letterV">V</text>
              <text x="260" y="50" class="text" id="letterA">A</text>
          </svg>
      </div>
*/
}

export default CubeLoader;
