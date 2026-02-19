import React from 'react';
import { useUser } from '../context/UserContext';
import {
    Info,
    Book,
    Layers,
    Cpu,
    Users,
    Globe,
    CheckCircle2,
    ExternalLink,
    GraduationCap,
    Lightbulb
} from 'lucide-react';

const SectionHeader = ({ icon: Icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem' }}>
        <Icon size={24} color="var(--primary)" />
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#2d3748' }}>{title}</h2>
    </div>
);

const InfoCard = ({ title, children, color = 'white' }) => (
    <div className="card" style={{ background: color, height: '100%', textAlign: 'left', alignItems: 'flex-start' }}>
        <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', width: '100%' }}>{title}</h3>
        <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>{children}</div>
    </div>
);

const ProductDescription = () => {
    const { user } = useUser();

    return (
        <div className="product-page-container" style={{ paddingBottom: '4rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Product Documentation</h1>
                <p style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>Detailed overview of the Autism Math Learning Portal</p>
            </header>

            {/* Student & Project Info */}
            <div className="game-responsive-grid" style={{ marginBottom: '3rem' }}>
                <div className="main-area">
                    <SectionHeader icon={Users} title="Student Details" />
                    <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: 'linear-gradient(135deg, #fff 0%, #f0f4f8 100%)' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '15px', overflow: 'hidden', border: '3px solid var(--primary)', flexShrink: 0 }}>
                            <img src={user.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{user.name}</h2>
                            <p style={{ margin: '0.2rem 0' }}><strong>Roll No:</strong> {user.rollNo}</p>
                            <p style={{ margin: '0.2rem 0' }}><strong>Course Code:</strong> 22CSE314</p>
                            <p style={{ margin: '0.2rem 0' }}><strong>Course Name:</strong> Full Stack Web Development</p>
                        </div>
                    </div>
                </div>
                <div className="side-area">
                    <SectionHeader icon={Info} title="Quick Links" />
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <a href="https://github.com/uhashini/autism-math-portal" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                            <ExternalLink size={18} /> GitHub Repository
                        </a>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                            <strong>Collaborator - Academic:</strong> Amrita School of Computing
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            <strong>Collaborator - Industry:</strong> Microsoft Philanthropies
                        </div>
                    </div>
                </div>
            </div>

            {/* About the Use Case */}
            <SectionHeader icon={Book} title="Strategic Vision" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <InfoCard title="Why This Portal?">
                    Children with Autism Spectrum Disorder (ASD) face challenges with abstract concepts and sensory overload.
                    This portal provides a <strong>predictable, visual environment</strong> that caters to their cognitive styles.
                </InfoCard>
                <InfoCard title="Challenges Addressed">
                    <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                        <li><strong>Sensory Sensitivity:</strong> Managed via "Calm Mode".</li>
                        <li><strong>Executive Function:</strong> Supported through consistent navigation.</li>
                        <li><strong>Working Memory:</strong> Addressed using persistent visual indicators.</li>
                    </ul>
                </InfoCard>
                <InfoCard title="The Innovation">
                    Dual-Mode UI allows instant switching between high-engagement and low-sensory modes.
                    Abstract symbols are replaced with <strong>concrete metaphors</strong> (Coins, Pizza).
                </InfoCard>
            </div>

            {/* Game Mechanics */}
            <SectionHeader icon={Layers} title="Learning Modules" />
            <div className="game-responsive-grid" style={{ marginBottom: '3rem' }}>
                <div className="main-area">
                    <InfoCard title="Snack Shop (Currency Math)">
                        Optimized for an <strong>"Entry → Play → Reward"</strong> loop.
                        <p>Modes include <em>Make Total</em>, <em>Buy 2 Items</em>, and <em>Shop Change</em>. Difficulty scales automatically from ₹10 to ₹50 targets.</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <span className="btn" style={{ fontSize: '0.7rem', background: '#e2e8f0' }}>Adaptive Scaffolding</span>
                            <span className="btn" style={{ fontSize: '0.7rem', background: '#e2e8f0' }}>Real-time Metering</span>
                        </div>
                    </InfoCard>
                    <div style={{ marginTop: '1.5rem' }}>
                        <InfoCard title="Pizza Builder (Fractional Logic)">
                            Translates abstract 1/4 or 3/8 into tangible slices.
                            <p>Features <em>Ghost Outlines</em> for easy mode and <em>Dynamic Fraction Meters</em> to connect numerical fractions to visual parts.</p>
                        </InfoCard>
                    </div>
                </div>
                <div className="side-area">
                    <InfoCard title="Impact Areas" color="#ebf8ff">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle2 size={16} color="#3182ce" /> <span>Memory Retention</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle2 size={16} color="#3182ce" /> <span>Real-world Context</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle2 size={16} color="#3182ce" /> <span>Focus Improvement</span>
                            </div>
                        </div>
                    </InfoCard>
                </div>
            </div>

            {/* Technical Detail */}
            <SectionHeader icon={Cpu} title="Algorithms & Logic" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Global State Hub</h4>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>Uses Context API to sync game results with the dashboard in real-time with zero lag.</p>
                </div>
                <div className="card" style={{ background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Adaptive Difficulty</h4>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>Dynamically adjusts complexity based on weighted average performance history.</p>
                </div>
                <div className="card" style={{ background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Spaced Repetition</h4>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>Reintroduces difficult concepts like "3/8" after intervals of success with simpler tasks.</p>
                </div>
            </div>

            {/* Research & Future */}
            <div className="game-responsive-grid">
                <div className="main-area">
                    <SectionHeader icon={Globe} title="Market Research" />
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                        <thead style={{ background: 'var(--primary)', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '0.75rem 1rem' }}>Competitor</th>
                                <th style={{ padding: '0.75rem 1rem' }}>Core Focus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '0.75rem 1rem' }}>Proloquo2Go</td>
                                <td style={{ padding: '0.75rem 1rem' }}>Symbol-based communication</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '0.75rem 1rem' }}>Khan Academy Kids</td>
                                <td style={{ padding: '0.75rem 1rem' }}>Gamified broad education</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.75rem 1rem' }}>ABCmouse</td>
                                <td style={{ padding: '0.75rem 1rem' }}>Step-by-step learning paths</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="side-area">
                    <SectionHeader icon={Lightbulb} title="Future Scope" />
                    <ul style={{ fontSize: '0.85rem', paddingLeft: '1rem', color: 'var(--secondary)' }}>
                        <li>Bio-feedback Stress Detection</li>
                        <li>AR-integrated Pizza Building</li>
                        <li>Voice-activated Navigation</li>
                        <li>Multi-player Peer Learning</li>
                    </ul>
                </div>
            </div>

            {/* Footer / Teacher */}
            <div style={{ marginTop: '4rem', padding: '2rem', background: '#ed64a610', borderRadius: '15px', border: '1px dashed #ed64a6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    <GraduationCap size={40} color="#ed64a6" />
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ margin: 0 }}>Course Teacher: Dr. T. Senthil Kumar</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#702459' }}>Professor, Amrita School of Computing, Coimbatore</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#702459' }}>Amrita Vishwa Vidyapeetham, Coimbatore - 641112</p>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', fontWeight: 'bold' }}>Email: t_senthilkumar@cb.amrita.edu</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
