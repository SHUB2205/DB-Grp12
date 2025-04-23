import React, { useEffect, useState } from "react";

export default function ViewResult() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/view-result")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  return (
    <div>
      <h4>View Result (from Complex View)</h4>
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
