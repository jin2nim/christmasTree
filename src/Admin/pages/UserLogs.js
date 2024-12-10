//import HttpService from "../../services/HttpService";
import '../adminCss/admin.css';

export default function UserLogs(){

    return(
        <div className="row justify-content-center align-items-start g-2 mt-3">
            <div className="col-11">
                <h2 className="admin-title">User Logs</h2>
            </div>
            <div className="col-11">
                <div className="searchBar mt-2">
                        <i className="fa-solid fa-magnifying-glass fa-xl customS" style={{ color: "#90a0b0" }}></i>
                        <input type="text" className="searchInput" placeholder="User Email"/>
                        <button type="submit" className="searchBtn">Search</button>
                    </div>
                    <div className="table-wrap mt-4">
                        <table className="logTable">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>User Email</th>
                                    <th>IP Address</th>
                                    <th>Login State</th>
                                    <th>Error</th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* {logs.length > 0 ? (
                                logs.map((log, index) => (
                                    <tr key={index}>
                                        <td>{log.timestamp}</td>
                                        <td>{log.details}</td>
                                        <td>{log.ip_address}</td>
                                        <td>{log.remote_port}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No logs available</td>
                                </tr>
                            )} */}
                        </tbody>
                        </table>
                    </div>
            </div>
        </div>
        
    )
  }