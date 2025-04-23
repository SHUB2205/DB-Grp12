import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import InsertUpdateDelete from "./pages/InsertUpdateDelete";
import SelectQuery from "./pages/SelectQuery";
import ViewResult from "./pages/ViewResult";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">DB UI</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/edit">Insert/Update/Delete</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/select">Select Table</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/view">View Result</Link></li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h3>Welcome to the Database UI</h3>} />
          <Route path="/edit" element={<InsertUpdateDelete />} />
          <Route path="/select" element={<SelectQuery />} />
          <Route path="/view" element={<ViewResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
