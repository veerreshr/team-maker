import React from "react";

const Loader = () => {
  return (
    <div class="spinner-border" role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
