// import React from "react";
// import styles from "./Spinner.module.css";

// const Spinner = () => {
//   return (
//     <div className="spinner-container">
//       <div className="loading-spinner"></div>
//     </div>
//   );
// };
// export default Spinner;
import React from "react";
import spinner from "./spinner.gif";

function Spinner() {
  return (
    <div>
      <img
        src={spinner.src}
        style={{ width: "100px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
}

export default Spinner;
