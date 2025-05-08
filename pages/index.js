import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar'; // Optional if you have a shared Navbar

export default function Home() {
  return (
    <div>
      <Navbar /> {/* Optional: Remove if you don't want navbar on home */}

      <div className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="text-white">
          <h1 className="display-3 fw-bold mb-4">Welcome to the Task Management System</h1>
          <p className="lead mb-4">Plan, assign, and track your team's tasks with ease and clarity.</p>
          <Link href="/login" className="btn btn-lg btn-light fw-semibold shadow">
            Get Started
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          height: 100vh;
          background: linear-gradient(135deg, #007bff, #00c6ff);
          padding: 2rem;
        }

        .btn-light {
          color: #007bff;
        }

        .btn-light:hover {
          background-color:rgb(247, 253, 253);
          color: #0056b3;
        }
      `}</style>
    </div>
  );
}
