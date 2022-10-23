import { useEffect, useState } from "react";
import http from "../../../http-common";

function Logs() {
  const [logs, setLogs] = useState([]);

  const searchLogs = async () => {
    try {
      const response = await http.get("/Log");
      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchLogs();
  }, []);

  return (
    <>
      <div>
        <h1>logs</h1>
        {logs[0] ? (
          <table className="table table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th>Metodo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td> {log.metodo} </td>
                  <td> {log.fecha} </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-danger"> No existen logs</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Logs;
