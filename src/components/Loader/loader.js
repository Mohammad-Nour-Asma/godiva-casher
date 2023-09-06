import React from "react";

import "./loader.css";

const Loader = () => {
  return (
    <div className="container-loader">
      <div className="">
        <div class="-mr-20">
          <svg width="400" height="100" viewBox="0 0 400 100">
            <text x="10" y="50" class="text" id="letterG">
              G
            </text>
            <text x="60" y="50" class="text" id="letterO">
              O
            </text>
            <text x="110" y="50" class="text" id="letterD">
              D
            </text>
            <text x="160" y="50" class="text" id="letterI">
              I
            </text>
            <text x="210" y="50" class="text" id="letterV">
              V
            </text>
            <text x="260" y="50" class="text" id="letterA">
              A
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
