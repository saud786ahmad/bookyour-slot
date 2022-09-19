import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { appRoutes } from "./routes";

export default function App() {
  return (
    <Router>
        <Routes>
            {
                appRoutes.map((each,idx) => <Route path={each.path} element={each.component}/>)
            }
           <Route path="/" element={<Navigate to="/landing"/>}/>
        </Routes>
    </Router>
  );
}