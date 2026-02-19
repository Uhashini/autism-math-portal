import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, PieChart, LayoutDashboard, FileText, MessageSquare } from 'lucide-react';
import { useUser } from '../context/UserContext';

const HomePage = () => {
    const { user } = useUser();
    const modules = [
        { title: 'Snack Shop Game', icon: <ShoppingBag size={48} />, path: '/snack-shop', color: '#4a90e2', desc: 'Learn addition and subtraction with yummy snacks!' },
        { title: 'Pizza Builder', icon: <PieChart size={48} />, path: '/pizza-builder', color: '#f39c12', desc: 'Interactive fractions with visual pizza slices.' },
        { title: 'Progress Dashboard', icon: <LayoutDashboard size={48} />, path: '/dashboard', color: '#27ae60', desc: 'Check your stars, badges, and learning journey.' },
        { title: 'Product Details', icon: <FileText size={48} />, path: '/product-page', color: '#8e44ad', desc: 'Information about this math portal.' },
        { title: 'Parent Feedback', icon: <MessageSquare size={48} />, path: '/feedback', color: '#e74c3c', desc: 'Share your thoughts and help us improve.' },
    ];

    return (
        <div className="home-container">
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome to Autism Math Portal</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--secondary)' }}>A predictable and fun way to master mathematics.</p>
            </header>

            <div className="home-grid">
                {modules.map((m, i) => (
                    <Link to={m.path} key={i} style={{ textDecoration: 'none' }}>
                        <div className="card">
                            <div style={{ color: m.color, marginBottom: '1rem' }}>{m.icon}</div>
                            <h3 style={{ margin: '0.5rem 0' }}>{m.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>{m.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', background: '#f8f9fa', borderRadius: '12px' }}>
                <h3>Member Details</h3>
                <p><strong>Name:</strong> {user.name} | <strong>Roll No:</strong> {user.rollNo}</p>
            </footer>
        </div>
    );
};

export default HomePage;
