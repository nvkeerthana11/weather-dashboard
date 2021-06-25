import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CssBaseline from "@material-ui/core/CssBaseline";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CssBaseline />
            <Sidebar />
        </Router>
    </React.StrictMode>,
    rootElement
);

