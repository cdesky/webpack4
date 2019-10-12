import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./index.less";
import Head from "./home/index.js";
import img from "./assets/images/upload.png";
import bg from "./assets/images/big.jpg";

const App = () => {
  var arr = Array.from("foo");
  console.log(arr); // [ 'f', 'o', 'o' ]

  return (
    <div>
      <img src={img} />
      <Head title="cdesky" />
      <p style={{ background: `url(${bg}) 0 0` }}>React here123!</p>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));
