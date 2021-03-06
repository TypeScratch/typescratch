import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
// tslint:disable-next-line:no-import-side-effect
import "./fonts/Curly.ttf";
// tslint:disable-next-line:no-import-side-effect
import "./fonts/Handwriting.ttf";
// tslint:disable-next-line:no-import-side-effect
import "./fonts/Marker.ttf";
// tslint:disable-next-line:no-import-side-effect
import "./fonts/Pixel.ttf";
// tslint:disable-next-line:no-import-side-effect
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
