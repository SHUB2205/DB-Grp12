import React, { useState } from "react";

export default function InsertUpdateDelete() {
  const [table, setTable] = useState("account");
  const [action, setAction] = useState("insert");
  const [fields, setFields] = useState("");
  const [where, setWhere] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let url = `http://localhost:5000/api/${action}`;
    try {
      var payload = {
        table,
        fields: action === "delete" ? [] : Object.keys(JSON.parse(fields)),
        values: action === "delete" ? [] : Object.values(JSON.parse(fields)),
      };
    } catch (error) {
      setMessage("Invalid JSON format for fields.");
      return;
    }
    if (action !== "insert") payload["where"] = where;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setMessage(res.ok ? result.message : result.error);
  };

  return (
    <div>
      <h4>Insert / Update / Delete</h4>
      <div className="mb-3">
        <select
          className="form-select"
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
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="insert">Insert</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>
      {action !== "delete" && (
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder='Fields JSON e.g. {"id":1,"name":"Alice"}'
            value={fields}
            onChange={(e) => setFields(e.target.value)}
          />
        </div>
      )}
      {(action === "update" || action === "delete") && (
        <div className="mb-3">
          <input
            className="form-control"
            placeholder='WHERE clause e.g. {"creditcardid": 12, ...} (JSON format)'
            onChange={(e) => setWhere(e.target.value)}
          />
        </div>
      )}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
      <p className="mt-3">{message}</p>
    </div>
  );
}
