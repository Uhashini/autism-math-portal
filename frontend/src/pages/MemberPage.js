import React from 'react';
import { useUser } from '../context/UserContext';
import { Mail, GraduationCap, MapPin, Award } from 'lucide-react';

const MemberPage = () => {
    const { user } = useUser();

    return (
        <div className="member-page" style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
            <div className="card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f7fa)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '3rem'
            }}>
                <div style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '6px solid var(--primary)',
                    padding: '5px',
                    marginBottom: '2rem',
                    boxShadow: '0 10px 20px rgba(107, 70, 193, 0.2)'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200"
                        alt={user.name}
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                </div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{user.name}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '2rem', fontWeight: 'bold' }}>{user.rollNo}</p>

                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                    <div className="card" style={{ background: 'white', textAlign: 'left', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                            <GraduationCap size={20} />
                            <h3 style={{ margin: 0 }}>Academic Details</h3>
                        </div>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Course Code:</strong> 22CSE314</p>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Course Name:</strong> Full Stack Web Development</p>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}><strong>Batch:</strong> 2022-2026</p>
                    </div>

                    <div className="card" style={{ background: 'white', textAlign: 'left', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                            <Award size={20} />
                            <h3 style={{ margin: 0 }}>Institution</h3>
                        </div>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>Amrita School of Computing</p>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>Amrita Vishwa Vidyapeetham</p>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem' }}>Coimbatore, Tamil Nadu</p>
                    </div>
                </div>

                <div style={{
                    marginTop: '3rem',
                    padding: '1.5rem',
                    background: 'rgba(107, 70, 193, 0.05)',
                    borderRadius: '16px',
                    width: '100%',
                    textAlign: 'left'
                }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Contact Information</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <Mail size={18} color="var(--secondary)" />
                        <span>{user.rollNo.toLowerCase()}@cb.students.amrita.edu</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <MapPin size={18} color="var(--secondary)" />
                        <span>Campus: Ettimadai, Coimbatore</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberPage;
