import React, { useEffect, useState } from "react";

export default function ViewResult() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchViewResult = async () => {
      const res = await fetch("http://localhost:5000/api/view-result");
      const result = await res.json();
      setData(result);
    };

    fetchViewResult();
  }, []);

  return (
    <div>
      <h4>
        view_totalapprovedloanamountbycustomer (For each customer, sum of all
        loans currently approved)
      </h4>
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
