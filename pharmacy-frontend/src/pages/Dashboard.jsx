import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear(); // Delete the token
    navigate('/');
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Welcome to your Dashboard</h2>
      <p>You are logged in as: <strong>{role}</strong></p>

      {/* HIDING UI BASED ON ROLE (Note: Backend still enforces this!) */}
      {role === 'admin' && (
        <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '10px 0' }}>
          Create New User (Admin Only)
        </button>
      )}

      {role === 'sales_attendant' && (
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', margin: '10px 0' }}>
          Record a Sale
        </button>
      )}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}