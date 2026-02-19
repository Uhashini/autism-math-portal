import React from 'react';
import { Trophy, Star, Target, Flame, PieChart, ShoppingBag, Clock, BookOpen } from 'lucide-react';
import { useUser } from '../context/UserContext';

// Functional Wrapper to provide context to Class Component
const DashboardWrapper = () => {
    const { progress, user } = useUser();
    return <Dashboard progress={progress} user={user} />;
};

class Dashboard extends React.Component {
    render() {
        const { progress, user } = this.props;

        const stats = [
            { title: 'Total Score', value: progress.totalScore, icon: <Trophy color="#f1c40f" />, color: '#fff9e6' },
            { title: 'Stars Earned', value: progress.totalStars, icon: <Star color="#f39c12" />, color: '#fff5e6' },
            { title: 'Accuracy', value: `${progress.snackShopAccuracy}%`, icon: <Target color="#e74c3c" />, color: '#ffe6e6' },
            { title: 'Streak', value: progress.streak, icon: <Flame color="#e67e22" />, color: '#fff0e6' },
        ];

        const gameStats = [
            { name: 'Snack Shop', acc: progress.snackShopAccuracy, icon: <ShoppingBag />, color: '#4a90e2' },
            { name: 'Pizza Builder', acc: progress.pizzaBuilderAccuracy, icon: <PieChart />, color: '#f39c12' }
        ];

        return (
            <div className="dashboard-container">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1>Learning Progress</h1>
                        <p>Keep going, {user.name.split(' ')[0]}! You're doing great.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {stats.map((s, i) => (
                        <div key={i} className="card" style={{ background: s.color, border: 'none', padding: '1rem' }}>
                            <div style={{ marginBottom: '0.2rem' }}>{s.icon}</div>
                            <h2 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>{s.value}</h2>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 'bold' }}>{s.title}</p>
                        </div>
                    ))}
                </div>

                <div className="game-responsive-grid">
                    <div className="card" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                        <h3>Concept Performance</h3>
                        <div style={{ marginTop: '1rem', width: '100%' }}>
                            {gameStats.map((g, i) => (
                                <div key={i} style={{ marginBottom: '1.2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                            {g.icon} {g.name}
                                        </span>
                                        <span style={{ fontWeight: 'bold' }}>{g.acc}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${g.acc}%`, height: '100%', background: g.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                        <h3>Achievements</h3>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', width: '100%' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Clock size={24} color="#03a9f4" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Morning Master</h4>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--secondary)' }}>Active early learner</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f3e5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <BookOpen size={24} color="#9c27b0" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Math Explorer</h4>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--secondary)' }}>Learning all topics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardWrapper;
