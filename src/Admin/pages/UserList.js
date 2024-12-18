import React, { useEffect, useState } from 'react';
import "../adminCss/admin.css";

export default function UserList() {
    const [users, setUsers] = useState([]); // State to hold the user data
    const [searchTerm, setSearchTerm] = useState(""); // State to handle search input

    // Fetch users from the backend when the component mounts
    useEffect(() => {
        fetch("http://localhost/webdev/test-haru/get-user.php") // Adjust the URL to where your PHP script is hosted
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, []);

    // Handle search (you can expand this to actually search the list)
    const handleSearch = () => {
        const filteredUsers = users.filter(user => 
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filteredUsers);
    };

    return (
        <div className="row justify-content-center align-items-start g-2 mt-3">
            <div className="col-11">
                <h2 className="admin-title">User Data</h2>
                <div className='searchUser d-flex'>
                    <input 
                        type="text" 
                        placeholder="Search by email or name" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className='form-control'
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <table className="logTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
