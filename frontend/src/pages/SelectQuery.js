import React, { useState } from "react";

export default function SelectQuery() {
  const [table, setTable] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/api/select?table=${table}`);
    const result = await res.json();
    setData(result);
  };

  return (
    <div>
      <h4>Select Table Data</h4>
      <input className="form-control mb-3" placeholder="Enter table name" onChange={(e) => setTable(e.target.value)} />
      <button className="btn btn-primary mb-3" onClick={fetchData}>Fetch</button>

      {data && (
        <table className="table table-bordered table-striped">
          <thead><tr>{data.columns.map((col, i) => <th key={i}>{col}</th>)}</tr></thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>{row.map((val, j) => <td key={j}>{val}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
