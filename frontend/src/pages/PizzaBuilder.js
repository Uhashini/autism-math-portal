import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Star, Layers, CheckCircle2, AlertCircle, Play, Home, HelpCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PizzaBuilder = () => {
    // Game State
    const [gameState, setGameState] = useState('setup'); // setup, playing, summary
    const [level, setLevel] = useState('Easy');
    const [errorFree, setErrorFree] = useState(true);
    const [calmMode, setCalmMode] = useState(false);
    const [timerOn, setTimerOn] = useState(true);

    // Round State
    const [round, setRound] = useState(1);
    const [mode, setMode] = useState('build'); // build, match, identify, mixed
    const [denominator, setDenominator] = useState(4);
    const [targetSlices, setTargetSlices] = useState(2);
    const [slices, setSlices] = useState(0);
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [options, setOptions] = useState([]); // For identification mode
    const [targetLabel, setTargetLabel] = useState("");

    // Stats
    const [score, setScore] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [results, setResults] = useState([]);

    const roundPrompts = {
        Easy: [
            { label: "HALF", numerator: 1, denominator: 2 },
            { label: "1/4", numerator: 1, denominator: 4 },
            { label: "3/4", numerator: 3, denominator: 4 },
            { label: "FULL", numerator: 1, denominator: 1 }
        ],
        Medium: [
            { label: "2/4", numerator: 2, denominator: 4 },
            { label: "1/4", numerator: 1, denominator: 4 },
            { label: "3/8", numerator: 3, denominator: 8 },
            { label: "5/8", numerator: 5, denominator: 8 }
        ],
        Hard: [
            { mode: 'identify', label: "Identify", denominator: 4 },
            { mode: 'match', label: "Compare", denominator: 8 },
            { mode: 'mixed', label: "Mixed 1/2 + 1/4", numerator: 3, denominator: 4 }
        ]
    };

    const startNewRound = (nextRoundNum) => {
        setRound(nextRoundNum);
        setSlices(0);
        setFeedback(null);
        setShowHint(false);
        setStartTime(Date.now());

        if (level === 'Easy' || level === 'Medium') {
            setMode('build');
            const configs = roundPrompts[level];
            const config = configs[Math.floor(Math.random() * configs.length)];
            setDenominator(config.denominator);
            setTargetSlices(config.numerator);
            setTargetLabel(config.label);
            setMessage(level === 'Easy' ? `Make ${config.label} pizza` : `Build ${config.numerator}/${config.denominator} pizza`);
        } else {
            // Hard Logic
            const hardConfigs = roundPrompts['Hard'];
            const config = hardConfigs[Math.floor(Math.random() * hardConfigs.length)];
            setMode(config.mode);
            setDenominator(config.denominator);

            if (config.mode === 'identify') {
                const target = Math.floor(Math.random() * (config.denominator - 1)) + 1;
                setSlices(target);
                setTargetSlices(target);
                setOptions([`${target}/${config.denominator}`, `${(target + 1) % config.denominator || 1}/${config.denominator}`, `1/2`]);
                setMessage("Which fraction is this pizza?");
            } else if (config.mode === 'match') {
                setTargetSlices(4); // Fixed comparison for simplicity
                setMessage("Which pizza has more?");
            } else {
                setTargetSlices(3);
                setDenominator(4);
                setMessage("Make 1/2 + 1/4 pizza");
            }
        }
    };

    useEffect(() => {
        if (feedback === 'correct') {
            const timeTaken = (Date.now() - startTime) / 1000;
            console.log(`Round ${round} completed in ${timeTaken} seconds.`);
        }
    }, [feedback, round, startTime]);

    const handleStart = () => {
        setGameState('playing');
        startNewRound(1);
    };

    const toggleSlice = (i) => {
        if (slices === i + 1) setSlices(i); // Remove top slice
        else setSlices(i + 1); // Add up to this slice
    };

    const { updateProgress } = useUser();

    const handleSubmit = (selectedVal) => {
        const isCorrect = mode === 'identify' ? selectedVal === `${targetSlices}/${denominator}` : slices === targetSlices;

        if (isCorrect) {
            setFeedback('correct');
            setTotalStars(totalStars + 3);
            setScore(score + 10);

            // Store result for internal tracking
            const roundTime = (Date.now() - startTime) / 1000;
            const newRes = [...results, { round, isCorrect, time: roundTime }];
            setResults(newRes);

            setTimeout(() => {
                if (round < 5) startNewRound(round + 1);
                else {
                    // Update Global State
                    updateProgress({
                        gameType: 'pizza',
                        score: score + 10,
                        stars: totalStars + 3,
                        accuracy: Math.round((newRes.filter(r => r.isCorrect).length / 5) * 100),
                        time: newRes.reduce((acc, r) => acc + (r.time || 0), 0)
                    });
                    setGameState('summary');
                }
            }, 2000);
        } else {
            setFeedback('wrong');
        }
    };

    if (gameState === 'setup') {
        return (
            <div className="game-container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>Pizza Builder Setup</h1>
                    <p>Learn fractions with delicious pizza!</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="card" style={{ gap: '1.5rem', alignItems: 'stretch' }}>
                        <div className="form-group">
                            <label>Choose Level</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Easy', 'Medium', 'Hard'].map(l => (
                                    <button key={l} className={`btn ${level === l ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setLevel(l)} style={{ flex: 1 }}>{l}</button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Accessibility & Structure</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                                <input type="checkbox" checked={errorFree} onChange={e => setErrorFree(e.target.checked)} /> Error-Free Mode
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                                <input type="checkbox" checked={calmMode} onChange={e => setCalmMode(e.target.checked)} /> Calm Mode
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                                <input type="checkbox" checked={timerOn} onChange={e => setTimerOn(e.target.checked)} /> Timer Enabled
                            </label>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '1.2rem', fontSize: '1.2rem', justifyContent: 'center', marginTop: 'auto' }} onClick={handleStart}><Play size={24} /> START BUILDING</button>
                    </div>

                    <div className="card" style={{ background: '#fff9f3', border: '1px solid #ffe8cc' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><HelpCircle size={20} color="#e67e22" /> How to Play</h3>
                        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem', color: '#5c3e2e' }}>
                            <li><strong>Level Easy:</strong> Explore basic fractions like HALF and 1/4 using simple slices.</li>
                            <li><strong>Level Medium:</strong> Build more complex fractions (e.g., 3/8) by tapping the tray.</li>
                            <li><strong>Level Hard:</strong> Identify fractions and compare which pizza has more!</li>
                            <li style={{ marginTop: '0.5rem' }}><strong>Interactions:</strong>
                                <ul style={{ fontSize: '0.9rem' }}>
                                    <li><em>Building:</em> Tap slices in the tray to add them to the pizza.</li>
                                    <li><em>Visuals:</em> Watch the <strong>Fraction Meter</strong> fill up as you add slices.</li>
                                    <li><em>Snapping:</em> Slices automatically snap into the correct position.</li>
                                </ul>
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>Try to get all 5 rounds correct to earn bonus stars!</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'summary') {
        return (
            <div className="game-container" style={{ textAlign: 'center' }}>
                <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
                <h1>Fraction Master!</h1>
                <div className="home-grid" style={{ marginTop: '2rem' }}>
                    <div className="card"><h2>{totalStars}</h2><p>Stars Earned</p></div>
                    <div className="card"><h2>{score}</h2><p>Total Score</p></div>
                    <div className="card"><h2>{level}</h2><p>Difficulty Level</p></div>
                </div>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-secondary"><Home size={18} /> Exit to Home</Link>
                    <button className="btn btn-primary" onClick={() => setGameState('setup')}>Play Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`game-layout ${calmMode ? 'calm-mode' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <div className="btn" style={{ background: '#f39c12', color: 'white', padding: '0.4rem 0.8rem' }}><Layers size={18} /> Level: {level}</div>
                    <div className="btn" style={{ background: '#f1c40f', padding: '0.4rem 0.8rem' }}><Star size={18} /> {totalStars}</div>
                    <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Round {round}/5</div>
                </div>
                {timerOn && <div className="timer-display" style={{ background: '#f8f9fa', padding: '0.4rem 0.8rem', borderRadius: '8px' }}><Clock size={16} /> Round Timer</div>}
            </div>

            <div className="game-responsive-grid">
                <div className="main-area">
                    <div className="card" style={{ border: '3px solid #e67e22', textAlign: 'left', alignItems: 'flex-start' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>Task: {message}</h3>
                        {feedback === 'correct' && <p style={{ color: 'var(--success)', fontWeight: 'bold', margin: '0.5rem 0' }}>Fantastic! NICE BUILDING!</p>}
                        {feedback === 'wrong' && <p style={{ color: 'var(--danger)', margin: '0.5rem 0' }}>Try again! Count the slices.</p>}
                        {showHint && (
                            <div style={{ marginTop: '0.5rem', padding: '0.8rem', background: '#fff9f3', borderRadius: '8px', borderLeft: '4px solid #e67e22', width: '100%' }}>
                                {level === 'Easy' ? `Make ${targetLabel} pizza.` : `You need ${targetSlices} out of ${denominator} slices.`}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                        <div className="pizza-area">
                            <svg width="100%" height="100%" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="#f3e5ab" stroke="#8b4513" strokeWidth="2" />
                                {[...Array(denominator)].map((_, i) => {
                                    const angle = (i * 360) / denominator;
                                    return (
                                        <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos((angle * Math.PI) / 180)} y2={50 + 45 * Math.sin((angle * Math.PI) / 180)} stroke="#8b4513" strokeOpacity="0.2" strokeWidth="0.5" />
                                    );
                                })}
                                {[...Array(slices)].map((_, i) => {
                                    const startAngle = (i * 360) / denominator;
                                    const endAngle = ((i + 1) * 360) / denominator;
                                    const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
                                    const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
                                    const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180);
                                    const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180);
                                    const d = `M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`;
                                    return <path key={i} d={d} fill="#ff5733" stroke="#c0392b" strokeWidth="0.5" className="pizza-slice-anim" />;
                                })}
                            </svg>
                        </div>
                    </div>

                    <div className="tray-container" style={{ marginTop: '1rem' }}>
                        {[...Array(denominator)].map((_, i) => (
                            <div
                                key={i}
                                onClick={() => toggleSlice(i)}
                                className="coin"
                                style={{
                                    background: i < slices ? '#ff5733' : '#fff',
                                    border: '2px solid #e67e22', borderRadius: '8px',
                                    color: i < slices ? '#fff' : '#e67e22',
                                    width: '45px', height: '45px'
                                }}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="side-area">
                    <div className="card" style={{ background: '#f8f9fa', padding: '1.5rem', border: 'none', boxShadow: 'none' }}>
                        <h3>Progress Meter</h3>
                        <div style={{ border: '2px solid #ddd', borderRadius: '15px', height: '150px', width: '30px', margin: '1rem auto', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${(slices / denominator) * 100}%`, background: '#e67e22', transition: 'height 0.3s' }}></div>
                        </div>
                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{slices} / {denominator}</p>

                        <button className='btn btn-primary' style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }} onClick={() => handleSubmit()}>SUBMIT</button>
                        <button className='btn btn-secondary' style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }} onClick={() => setShowHint(!showHint)}><HelpCircle size={16} /> Hint</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaBuilder;
