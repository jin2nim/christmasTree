import React, { useState, useEffect } from "react";
import HttpService from "../../services/HttpService";
import "../adminCss/admin.css";

export default function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  // Fetch logs based on the current search, filter, and date range
  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (filter) params.append("filter", filter);
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);
      params.append("sort_order", sortOrder); // Add sort order parameter

      const response = await HttpService.get(`auditLogAll.php?${params.toString()}`);
  
      if (typeof response.data === 'string') {
        const logsArray = JSON.parse(response.data);
        setLogs(logsArray);
      } else if (Array.isArray(response.data)) {
        setLogs(response.data);
      } else {
        console.error("Response data is not in the expected format", response.data);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch logs when the component first mounts or the search/filter changes
  useEffect(() => {
    fetchLogs();
  }, [search, filter, startDate, endDate, sortOrder]);  // Trigger fetchLogs when any of these change

  // Clear all filters and fetch all logs
  const clearAll = () => {
    setSearch("");
    setFilter("");
    setStartDate("");
    setEndDate("");
    setSortOrder("DESC");
  };

  // Toggle sort order between DESC and ASC
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "DESC" ? "ASC" : "DESC"));
  };

  return (
    <div className="row justify-content-center align-items-start g-2 mt-3">
      <div className="col-11">
        <h2 className="admin-title">User Logs</h2>
      </div>
      <div className="col-11 search-filter-wrap d-flex align-items-center mt-3">
        <div className="search-filter col-11 d-flex align-items-center">
          <label>Seach by</label>
        <input
          type="text"
          placeholder="Email or IP"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failure</option>
        </select>
        </div>
        </div>
        <div className="date-sort col-11 d-flex align-items-center">
          <label className="col-1">Filter between</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <p>~</p>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        </div>
        <button onClick={clearAll} className="searchBtn">
          Search
        </button>
        <button onClick={clearAll} className="searchBtn">
          Clear All
        </button>
      <div className="col-11">
        <div className="table-wrap mt-4">
          <table className="logTable">
            <thead>
              <tr>
                <th className="col-1">Log No.</th>
                <th>Email</th>
                <th>IP Address</th>
                <th>Login State</th>
                <th>Error</th>
                <th onClick={toggleSortOrder}className="cursor">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1}</td>
                    <td>{log.email}</td>
                    <td>{log.ip_address}</td>
                    <td>{log.login_state}</td>
                    <td>{log.error}</td>
                    <td>{log.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
