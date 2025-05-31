import React, { useState } from 'react';

interface TriageFormProps {
  onSubmit: (data: {firstname: string; lastname:string; age: string; gender: string; phone: string; condition: string }) => void;
}

export default function TriageForm({ onSubmit }: TriageFormProps) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [condition, setCondition] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstname || !lastname || !age || !gender || !phone || !condition) {
      alert('Please fill all fields');
      return;
    }
    onSubmit({ firstname, lastname, age, gender, phone, condition });
    setFirstname('');
    setLastname('');
    setAge('');
    setGender('');
    setPhone('');
    setCondition('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="string"
          className="form-control"
          placeholder="Patient First Name"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="string"
          className="form-control"
          placeholder="Patient Last Name"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="string"
          className="form-control"
          placeholder="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="string"
          className="form-control"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="string"
          className="form-control"
          placeholder="Condition"
          value={condition}
          onChange={e => setCondition(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Patient
      </button>
    </form>
  );
}
