import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TriageForm from './components/TriageForm';

interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  age: string;
  gender: string;
  phone: string;
  condition: string;
  recommendation: string;
}

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  // const [recommendation, setRecommendation] = useState('');

  async function fetchPatients() {
    try {
      setLoading(true);
      const res = await axios.get<Patient[]>('http://localhost:3000/patients');
      setPatients(res.data);
    } catch {
      alert('Failed to load patients');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  async function handleAddPatient(data: {firstname: string; lastname: string; age: string; gender: string; phone: string; condition: string }) {
    try {
      await axios.post('http://localhost:3000/patients', data);
      fetchPatients();
    } catch {
      alert('Failed to add patient');
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lucid Triage</h1>
      <TriageForm onSubmit={handleAddPatient} />
      <h2>Patients List</h2>
      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No patients yet</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Condition</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.firstname}</td>
                <td>{p.lastname}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.condition}</td>
                <td>{p.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
