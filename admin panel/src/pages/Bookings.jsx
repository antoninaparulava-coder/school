import React, { useState, useEffect } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const handleDeleteUI = async (id) => {
  if (window.confirm("Delete permanently from Database?")) {
    const response = await fetch(`http://localhost:5000/api/book/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setBookings(bookings.filter(item => item._id !== id));
    }
  }
};




  const handleCreateUI = async () => {
    const schoolName = prompt("School Name:");
    const destination = prompt("Destination:");
    const students = prompt("Quantity of Students:");
    const teachers = prompt("Quantity of Teachers:");
    const parents = prompt("Quantity of Parents:");
    const menu = prompt("Menu Type:");
    const firstName = prompt("Contact First Name:");
    const lastName = prompt("Contact Last Name:");

    const newBookingData = { 
      schoolName, 
      destination, 
      students, 
      teachers, 
      parents, 
      menu, 
      firstName, 
      lastName 
    };

    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBookingData)
      });

      if (response.ok) {
        const savedBooking = await response.json();
        setBookings([savedBooking, ...bookings]); 
      } else {
        alert("Failed to save. Make sure all fields are filled.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };




  const handleEditUI = async (id) => {
  const current = bookings.find(item => item._id === id);
  if (!current) return;

  const schoolName = prompt("School Name:", current.schoolName) || current.schoolName;
  const destination = prompt("Destination:", current.destination) || current.destination;
  const students = prompt("Students:", current.students) || current.students;
  const teachers = prompt("Teachers:", current.teachers) || current.teachers;
  const parents = prompt("Parents:", current.parents) || current.parents;
  const menu = prompt("Menu:", current.menu) || current.menu;

  const updatedData = {
    schoolName,
    destination,
    students,
    teachers,
    parents,
    menu
  };

  try {
    const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    if (response.ok) {
      const savedData = await response.json();
      
      setBookings(bookings.map(item => item._id === id ? savedData : item));
      alert("Changes saved to Database!");
    }
  } catch (err) {
    console.error("Error updating:", err);
    alert("Could not save changes.");
  }
};



 
  useEffect(() => {
    
    fetch('http://localhost:5000/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  

  if (loading) return <div className="p-10 text-slate-500">Loading bookings...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Manage Bookings</h2>
        <button
        onClick={handleCreateUI} 
        className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-500/20 text-xs">
          + Add Manual Booking
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-50">
                <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest px-2">School</th>
                <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest px-2">Dest.</th>
                <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest px-2">Qty (S/T/P)</th>
                <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest px-2">Menu</th>
                <th className="text-left pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest px-2">Contact</th>
                <th className="text-center pb-4 font-black text-slate-400 text-[10px] uppercase tracking-widest px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-slate-50 hover:bg-slate-50 transition duration-200 group">
                  <td className="py-5 font-bold text-slate-800 px-2">{b.schoolName}</td>
                  <td className="py-5 px-2">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      {b.destination}
                    </span>
                  </td>
                  <td className="py-5 text-slate-600 text-xs font-medium px-2">
                    {b.students} / {b.teachers} / {b.parents}
                  </td>
                  <td className="py-5 text-slate-500 text-xs px-2 italic">
                    {b.menu}
                  </td>
                  <td className="py-5 text-slate-700 font-semibold text-xs px-2">
                    {b.firstName} {b.lastName}
                  </td>
                  <td className="py-5 text-center px-2">
                    <div className="flex justify-center gap-2">
                    <button 
                    onClick={() => handleEditUI(b._id)}
                    className="bg-[#3498db] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                    >
                      Edit
                    </button>
                    <button
                    onClick={() => handleDeleteUI(b._id)}
                    className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;