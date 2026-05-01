import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
import AddRestaurant from './pages/AddRestaurant';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/add" element={<ProtectedRoute><AddRestaurant /></ProtectedRoute>} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            
            {/* You could add a protected profile/favorites page here if needed */}
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Smart Restaurant Recommendation System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
