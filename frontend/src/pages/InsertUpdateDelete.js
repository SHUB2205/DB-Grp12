import React, { useState } from "react";

export default function InsertUpdateDelete() {
  const [table, setTable] = useState("");
  const [action, setAction] = useState("insert");
  const [fields, setFields] = useState("{}");
  const [where, setWhere] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let url = `http://localhost:5000/api/${action}`;
    let payload = { table, fields: JSON.parse(fields) };
    if (action !== "insert") payload["where"] = where;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setMessage(result.status || result.error);
  };

  return (
    <div>
      <h4>Insert / Update / Delete</h4>
      <div className="mb-3">
        <input className="form-control" placeholder="Table name" onChange={(e) => setTable(e.target.value)} />
      </div>
      <div className="mb-3">
        <select className="form-select" onChange={(e) => setAction(e.target.value)}>
          <option value="insert">Insert</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>
      <div className="mb-3">
        <textarea className="form-control" rows="3" placeholder='Fields JSON e.g. {"id":1,"name":"Alice"}' value={fields} onChange={(e) => setFields(e.target.value)} />
      </div>
      {(action === "update" || action === "delete") && (
        <div className="mb-3">
          <input className="form-control" placeholder='WHERE clause e.g. id=1' onChange={(e) => setWhere(e.target.value)} />
        </div>
      )}
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      <p className="mt-3">{message}</p>
    </div>
  );
}
