import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import './Examples.css';

function Examples() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const patientsCol = collection(db, 'patients');
      const snapshot = await getDocs(patientsCol);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatients(list);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditPatient({ ...editPatient, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const ref = doc(db, 'patients', editPatient.id);
      await updateDoc(ref, {
        name: editPatient.name,
        age: editPatient.age,
        condition: editPatient.condition
      });
      setEditPatient(null);
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleAddPatient = async () => {
    try {
      if (!newPatient.name || !newPatient.age || !newPatient.condition) return;
      await addDoc(collection(db, 'patients'), {
        ...newPatient
      });
      setNewPatient({ name: '', age: '', condition: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'patients', id));
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  if (loading) return <p>Loading patients...</p>;

  return (
    <div className="container">
      <h1>You're signed in!</h1>
      <button className="signout-button" onClick={() => signOut(auth)}>Sign Out</button>

      <h2>Patients List</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul className="patient-list">
          {patients.map((patient) => (
            <li key={patient.id} className="patient-card">
              <strong>ID:</strong> {patient.id}<br />
              <strong>Name:</strong> {patient.name || 'N/A'}<br />
              <strong>Age:</strong> {patient.age || 'N/A'}<br />
              <strong>Condition:</strong>{' '}
              <span
                className={
                  patient.condition?.toLowerCase() === 'stable'
                    ? 'condition-stable'
                    : 'condition-unstable'
                }
              >
                {patient.condition || 'N/A'}
                {patient.condition?.toLowerCase() === 'stable' && ' ✅'}
              </span>
              <br />
              <button onClick={() => setEditPatient(patient)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(patient.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      )}

      {patients.length > 0 && (
        <div className="selected-patient">
          <h3>First Patient Details</h3>
          <p><strong>ID:</strong> {patients[0]?.id}</p>
          <p><strong>Name:</strong> {patients[0]?.name || 'N/A'}</p>
          <p><strong>Age:</strong> {patients[0]?.age || 'N/A'}</p>
          <p><strong>Condition:</strong> {patients[0]?.condition || 'N/A'}</p>
        </div>
      )}

      {editPatient && (
        <div className="edit-section">
          <h3>Edit Patient</h3>
          <input
            type="text"
            name="name"
            value={editPatient.name}
            onChange={handleEditChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="age"
            value={editPatient.age}
            onChange={handleEditChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="condition"
            value={editPatient.condition}
            onChange={handleEditChange}
            placeholder="Condition"
          />
          <button onClick={saveEdit}>Save</button>
        </div>
      )}

      <div className="add-section">
        <h3>Add New Patient</h3>
        <input
          type="text"
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Condition"
          value={newPatient.condition}
          onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
        />
        <button onClick={handleAddPatient}>Add Patient</button>
      </div>
    </div>
  );
}

export default Examples;
