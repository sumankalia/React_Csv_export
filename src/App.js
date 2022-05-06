import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
];

const App = () => {
  const [data, setData] = useState([]);
  const [downloadedData, setDownloadedData] = useState([]);
  const csvDownloadRef = useRef(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDataToDownload = () => {
    axios
      .get("http://localhost:4000/users/get")
      .then(({ data }) => {
        setDownloadedData(data);
        setTimeout(() => {
          csvDownloadRef.current.link.click();
        }, 500);
      })
      .catch((error) => alert("Error happened"));
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/users/get")
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => alert("Error happened"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <CSVLink data={data} headers={headers} filename="parents.csv">
          <button className="btn btn-primary mb-2">Export</button>
        </CSVLink>
        <CSVLink
          headers={headers}
          data={downloadedData}
          filename="parents.csv"
          className="hidden"
          ref={csvDownloadRef}
          target="_blank"
        />
        <button
          className="btn btn-primary mb-2"
          onClick={fetchDataToDownload}
          style={{ marginLeft: "5px" }}
        >
          Export Async
        </button>
      </div>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row?._id}>
              <td>{row?.name}</td>
              <td>{row?.age}</td>
              <td>{row?.phone}</td>
              <td>{row?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
