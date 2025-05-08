import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { removeToken, getToken } from '../utils/auth';
import Link from 'next/link';

const Sidebar = () => {
  const router = useRouter();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    removeToken();
    setShowLogoutMsg(true);
    setTimeout(() => {
      setShowLogoutMsg(false);
      router.push('/');
    }, 2000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken(); // Get token from localStorage or cookies
        const res = await fetch('http://localhost:5000/api/session', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          console.error('Session fetch failed');
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
      }
    };

    fetchUser();
  }, []);

  if (router.pathname === '/login' || router.pathname === '/') {
    return null;
  }

  return (
    <>
      <div style={styles.sidebar}>
        
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            {/* Optionally include avatar */}
          </div>
          <div className="info">
            <a href="#" className="d-block text-white">
              {user ? (
                <div className="sideTitle">
                  <h5 className="mb-0">{user.name}</h5>
                  <small className="loginname">{user.username}</small>
                </div>
              ) : (
                <span className="text-muted">Loading user info...</span>
              )}
            </a>
          </div>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link href="/dashboard" legacyBehavior>
              <a className="nav-link active" aria-current="page">
                Overview
              </a>
            </Link>
          </li>
          {user && user.role === 'admin' && (
            <li className="nav-item">
              <Link href="/register" legacyBehavior>
                <a className="nav-link text-dark">Create User</a>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link href="/taskform" legacyBehavior>
              <a className="nav-link text-dark">Tasks Form</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/tasklist" legacyBehavior>
              <a className="nav-link text-dark">Tasks List</a>
            </Link>
          </li>
        </ul>

        <div style={styles.logoutButtonContainer}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {showLogoutMsg && (
        <div style={styles.popup}>Logged out successfully!</div>
      )}
    </>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#0a1b45',  // changed to dark blue-gray for professional look
    padding: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
    color: '#ecf0f1',  // light gray font color for contrast
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoutButtonContainer: {
    marginTop: 'auto',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#e74c3c',  // slightly softer red for logout button
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  popup: {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#27ae60',  // softer green for success popup
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 9999,
    fontWeight: 'bold',
  },
};

export default Sidebar;
