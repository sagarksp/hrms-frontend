import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:6000');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const createDepartment = async () => {
    try {
      const response = await axios.post('/hrms/departments', { name: newDepartmentName });
      setDepartments([...departments, response.data]);
      setNewDepartmentName('');
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hrms/departments/${id}`);
      setDepartments(departments.filter((department) => department._id !== id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div>
      <h1>Departments</h1>
      <input
        type="text"
        value={newDepartmentName}
        onChange={(e) => setNewDepartmentName(e.target.value)}
        placeholder="New Department Name"
      />
      <button onClick={createDepartment}>Add Department</button>
      <ul>
        {departments.map((department) => (
          <li key={department._id}>
            {department.name}
            <button onClick={() => deleteDepartment(department._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
