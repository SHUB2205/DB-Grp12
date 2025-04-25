import React, { useState } from "react";

export default function SelectQuery() {
  const [table, setTable] = useState("account");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log(table);

    const res = await fetch(`http://localhost:5000/api/select?table=${table}`);
    const result = await res.json();
    console.log(result);
    setData(result);
  };

  return (
    <div>
      <h4>Select Table Data</h4>
      <select
        className="form-select mb-3"
        onChange={(e) => setTable(e.target.value)}
      >
        <option value="account">account</option>
        <option value="accountlog">accountlog</option>
        <option value="address">address</option>
        <option value="auditlog">auditlog</option>
        <option value="branch">branch</option>
        <option value="creditcard">creditcard</option>
        <option value="customer">customer</option>
        <option value="deletedcustomers">deletedcustomers</option>
        <option value="employee">employee</option>
        <option value="loan">loan</option>
        <option value="loanapplication">loanapplication</option>
        <option value="transaction">transaction</option>
      </select>
      <button className="btn btn-primary mb-3" onClick={fetchData}>
        Fetch
      </button>

      {data && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {data.columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
