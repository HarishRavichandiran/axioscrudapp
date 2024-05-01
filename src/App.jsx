// App.jsx
import React, { useState, useEffect } from 'react';
import { getUsers, addUser, editUser, deleteUser } from './UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS file for additional styling

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (userId, updatedUser) => {
    try {
      const editedUser = await editUser(userId, updatedUser);
      setUsers(users.map(user => (user.id === userId ? editedUser : user)));
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3">
        <h1 className="mb-4">User Management</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            className="form-control mt-2"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button className="btn btn-primary mt-2" onClick={handleAddUser}>
            Add User
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditUser(user.id, { name: 'Updated Name', email: 'updated@example.com' })}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
