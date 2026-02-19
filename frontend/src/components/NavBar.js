import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, MessageSquare, Info, Star, User, Heart } from 'lucide-react';
import { useUser } from '../context/UserContext';

const NavBar = () => {
    const { user, progress } = useUser();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="top-nav">
            <div className="nav-links">
                <Link to="/" className={isActive('/') ? 'active' : ''}>
                    <Home size={20} />
                    <span>Home</span>
                </Link>
                <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/behavior" className={isActive('/behavior') ? 'active' : ''}>
                    <Heart size={20} />
                    <span>Social</span>
                </Link>
                <Link to="/comprehensive-review" className={isActive('/comprehensive-review') ? 'active' : ''}>
                    <MessageSquare size={20} />
                    <span>Review</span>
                </Link>
                <Link to="/member" className={isActive('/member') ? 'active' : ''}>
                    <User size={20} />
                    <span>Member</span>
                </Link>
                <Link to="/product-page" className={isActive('/product-page') ? 'active' : ''}>
                    <Info size={20} />
                    <span>Details</span>
                </Link>
            </div>

            <div className="profile-section">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>{user.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)' }}>{user.rollNo}</span>
                </div>
                <div className="btn" style={{ background: '#f1c40f', padding: '0.3rem 0.6rem', fontSize: '0.8rem', height: 'fit-content' }}>
                    <Star size={14} fill="white" /> {progress.totalStars}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
