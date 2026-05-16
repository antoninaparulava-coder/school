import React, { useState, useEffect } from 'react';

const Trip = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);



 const handleCreateUI = async () => {
  const name = prompt("Enter Trip Name:");
  if (!name) return;

  const description = prompt("Enter Description:");
  const duration = prompt("Enter Duration:");
  const rating = prompt("Enter Rating:");

  const newTripData = { name, description, duration, rating, };

  try {
    const response = await fetch('http://localhost:5000/api/trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTripData)
    });

    if (response.ok) {
      const savedTrip = await response.json();
      
      setTrips(prevTrips => [savedTrip, ...prevTrips]);
    } else {
      alert("Error saving trip to database");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

const handleDeleteUI = async (id) => {
  if (window.confirm("Are you sure you want to delete this trip permanently?")) {
    try {
      const response = await fetch(`http://localhost:5000/api/trip/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTrips(trips.filter(trip => trip._id !== id));
      } else {
        alert("Failed to delete trip from database");
      }
    } catch (err) {
      console.error("Delete fetch error:", err);
    }
  }
};

const handleEditUI = async (item) => { 
  const name = prompt("New Name:", item.name);
  const description = prompt("New Description:", item.description);
  const duration = prompt("New Duration:", item.duration);
  const rating = prompt("New Rating:", item.rating);

  const updatedData = { name, description, duration, rating };

  try {
    const response = await fetch(`http://localhost:5000/api/trip/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    if (response.ok) {
      const saved = await response.json();
      setTrips(trips.map(trip => trip._id === item._id ? saved : trip));
    }
  } catch (err) {
    console.error("Edit failed:", err);
  }
};



  useEffect(() => {
    fetch('http://localhost:5000/trip')
      .then(res => res.json())
      .then(data => {
        setTrips(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching trips:", err));
  }, []);

  if (loading) return <div className="p-10 text-slate-500">Loading Destinations...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Destinations List</h2>
        <button
        onClick={handleCreateUI}
        className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-500/20 text-xs">
          + Add New Trip
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-50">
              <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Name</th>
              <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Description</th>
              <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Duration</th>
              <th className="text-center pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Rating</th>
              <th className="text-center pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t._id} className="border-b border-slate-50 hover:bg-slate-50 transition duration-200">
                <td className="py-5 font-bold text-slate-800">{t.name}</td>
                <td className="py-5 text-slate-500 text-xs max-w-xs truncate">{t.description}</td>
                <td className="py-5">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {t.duration}
                  </span>
                </td>
                <td className="py-5 text-center font-black text-amber-500 text-sm">★ {t.rating}</td>
                <td className="py-5 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                    onClick={() => handleEditUI(t)} 
                    className="bg-[#3498db] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">Edit</button>
                    <button
                    onClick={() => handleDeleteUI(t._id)}
                    className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-red-500 hover:text-white transition">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trip;