import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Star, Coins, HelpCircle, CheckCircle2, AlertCircle, Play, Home, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScreenCapture } from 'react-screen-capture';
import { useUser } from '../context/UserContext';

const SnackShop = () => {
    // Game State
    const [gameState, setGameState] = useState('setup'); // setup, playing, summary
    const [level, setLevel] = useState('Easy');
    const [errorFree, setErrorFree] = useState(true);
    const [calmMode, setCalmMode] = useState(false);
    const [timerOn, setTimerOn] = useState(true);

    // Round State
    const [round, setRound] = useState(1);
    const [screenCapture, setScreenCapture] = useState('');
    const [mode, setMode] = useState(1); // 1: Make ₹X, 2: Buy 2, 3: Change
    const [target, setTarget] = useState(0);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [message, setMessage] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct', 'wrong', null

    // Stats
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [results, setResults] = useState([]);

    const levelConfigs = {
        Easy: { coins: [1, 2, 5, 10], range: [5, 15] },
        Medium: { coins: [1, 2, 5, 10, 20], range: [15, 30] },
        Hard: { coins: [1, 2, 5, 10, 20, 50], range: [30, 100] }
    };

    const snacks = [
        { name: 'Apple', price: 4, emoji: '🍎' },
        { name: 'Cookie', price: 6, emoji: '🍪' },
        { name: 'Juice', price: 10, emoji: '🧃' },
        { name: 'Cake', price: 15, emoji: '🍰' },
        { name: 'Chips', price: 8, emoji: '🍟' }
    ];

    // Logic: Initialize a round
    const startNewRound = (nextRoundNum) => {
        const config = levelConfigs[level];
        const newMode = Math.floor(Math.random() * 3) + 1;
        setMode(newMode);
        setRound(nextRoundNum);
        setSelectedCoins([]);
        setCurrentTotal(0);
        setFeedback(null);
        setShowHint(false);
        setStartTime(Date.now());

        if (newMode === 1) {
            const t = Math.floor(Math.random() * (config.range[1] - config.range[0])) + config.range[0];
            setTarget(t);
            setMessage(`Task: Put exactly ₹${t} in the collection box.`);
        } else if (newMode === 2) {
            const s1 = snacks[Math.floor(Math.random() * snacks.length)];
            const s2 = snacks[Math.floor(Math.random() * snacks.length)];
            setTarget(s1.price + s2.price);
            setMessage(`Buy: ${s1.name} (₹${s1.price}) and ${s2.name} (₹${s2.price})`);
        } else {
            // MODE 3: Refined Subtraction Logic
            let paid, itemPrice;
            if (level === 'Easy') {
                paid = 10;
                itemPrice = Math.floor(Math.random() * 9) + 1;
            } else if (level === 'Medium') {
                paid = 20;
                itemPrice = Math.floor(Math.random() * 13) + 5;
            } else {
                paid = 50;
                itemPrice = Math.floor(Math.random() * 38) + 11;
            }

            const snack = snacks[Math.floor(Math.random() * snacks.length)];
            const changeTarget = paid - itemPrice;
            setTarget(changeTarget);

            const styles = [
                `The ${snack.name} costs ₹${itemPrice}. The customer gave ₹${paid}. How much change should you give back?`,
                `You bought a ${snack.name} for ₹${itemPrice}. You paid with ₹${paid}. How much money will the shop return to you?`,
                `Ravi bought a ${snack.name} for ₹${itemPrice}. He gave the shopkeeper ₹${paid}. Help the shopkeeper give the correct change.`,
                `The ${snack.name} costs ₹${itemPrice}. The customer paid ₹${paid}. Pick the coins to give the right change.`,
                `${snack.name} price: ₹${itemPrice} | Customer paid: ₹${paid}. Drag coins to give the change.`
            ];

            setMessage(styles[Math.floor(Math.random() * styles.length)]);

            setResults(prev => [...prev.slice(0, -1), {
                ...results[results.length - 1],
                hintDetails: {
                    paid, itemPrice, target: changeTarget,
                    countUp: Array.from({ length: changeTarget + 1 }, (_, i) => itemPrice + i).join(' → ')
                }
            }]);
        }
    };

    const handleScreenCapture = (screenCapture) => {
        setScreenCapture(screenCapture);
    };

    const handleDownload = () => {
        const base64Parts = screenCapture.split(',');
        const contentType = base64Parts[0].split(':')[1].split(';')[0];
        const base64Data = base64Parts[1];

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = 'my-math-achievement.png';
        link.href = url;
        link.click();

        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    const handleStart = () => {
        setGameState('playing');
        startNewRound(1);
    };

    const addCoin = (val) => {
        const newStack = [...selectedCoins, val];
        setSelectedCoins(newStack);
        setCurrentTotal(currentTotal + val);
    };

    const removeCoin = (index) => {
        const val = selectedCoins[index];
        const newStack = [...selectedCoins];
        newStack.splice(index, 1);
        setSelectedCoins(newStack);
        setCurrentTotal(currentTotal - val);
    };

    const { updateProgress } = useUser();

    const handleSubmit = () => {
        if (currentTotal === target) {
            setFeedback('correct');
            setScore(score + 10);
            setStars(stars + 3);
            setResults(prev => [...prev.slice(0, -1), { ...prev[prev.length - 1], status: 'correct', time: (Date.now() - startTime) / 1000 }]);

            setTimeout(() => {
                if (round < 5) {
                    startNewRound(round + 1);
                } else {
                    const finalResults = [...results.slice(0, -1), { ...results[results.length - 1], status: 'correct', time: (Date.now() - startTime) / 1000 }];
                    const accuracy = Math.round((finalResults.filter(r => r.status === 'correct').length / 5) * 100);
                    updateProgress({
                        gameType: 'snack',
                        score: score + 10,
                        stars: stars + 3,
                        accuracy: accuracy,
                        time: finalResults.reduce((acc, r) => acc + (r.time || 0), 0)
                    });
                    setGameState('summary');
                }
            }, 2000);
        } else {
            setFeedback('wrong');
            setResults(prev => [...prev.slice(0, -1), { ...prev[prev.length - 1], status: 'wrong', time: (Date.now() - startTime) / 1000 }]);
            if (errorFree) {
                setMessage("Let's try again! Maybe remove some coins?");
            } else {
                setMessage("Almost! Check your total again.");
            }
        }
    };

    // Keyboard Accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing') return;

            // Mapping number keys 1-6 to available coins
            const keyMap = { '1': 1, '2': 2, '3': 5, '4': 10, '5': 20, '6': 50 };
            const val = keyMap[e.key];

            if (val && levelConfigs[level].coins.includes(val)) {
                addCoin(val);
            }

            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Backspace') {
                if (selectedCoins.length > 0) removeCoin(selectedCoins.length - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, level, selectedCoins, currentTotal]);

    if (gameState === 'setup') {
        return (
            <div className="game-container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>Snack Shop Setup</h1>
                    <p>Prepare your shop for customers!</p>
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
                            <label>Accessibility</label>
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
                        <button className="btn btn-primary" style={{ padding: '1.2rem', fontSize: '1.2rem', justifyContent: 'center', marginTop: 'auto' }} onClick={handleStart}><Play size={24} /> START SHOPPING</button>
                    </div>

                    <div className="card" style={{ background: '#f8f9fa', border: '1px solid #e1e8ed' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><HelpCircle size={20} color="var(--primary)" /> How to Play</h3>
                        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem', color: '#444' }}>
                            <li><strong>Level Easy:</strong> Use coins up to ₹10 for small snacks.</li>
                            <li><strong>Level Medium:</strong> Handles values up to ₹30.</li>
                            <li><strong>Level Hard:</strong> Challenge yourself with change up to ₹100.</li>
                            <li style={{ marginTop: '0.5rem' }}><strong>Modes:</strong>
                                <ul style={{ fontSize: '0.9rem' }}>
                                    <li><em>Make ₹X:</em> Put exact amount in the box.</li>
                                    <li><em>Buy 2:</em> Add two item prices together.</li>
                                    <li><em>Change:</em> Give the customer back their change.</li>
                                </ul>
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>Tap a coin to add it to your basket. Tap it again in your basket to remove it!</li>
                        </ul>
                        <div style={{ background: '#eef2ff', padding: '1rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid #c7d2fe' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4338ca' }}>⌨️ Keyboard Shortcuts</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', margin: 0 }}>
                                <li><strong>1-6:</strong> Pick available coins</li>
                                <li><strong>Enter:</strong> Submit payment</li>
                                <li><strong>Backspace:</strong> Remove last coin</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'summary') {
        return (
            <div className="game-container" style={{ textAlign: 'center' }}>
                <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
                <h1>Shop Day Complete!</h1>
                <div className="home-grid" style={{ marginTop: '2rem' }}>
                    <div className="card"><h2>{score}</h2><p>Total Score</p></div>
                    <div className="card"><h2>{stars}</h2><p>Stars Earned</p></div>
                    <div className="card"><h2>{level}</h2><p>Difficulty</p></div>
                </div>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-secondary"><Home size={18} /> Exit to Home</Link>
                    <button className="btn btn-primary" onClick={() => setGameState('setup')}>Play Again</button>
                </div>
            </div>
        );
    }

    return (
        <ScreenCapture onEndCapture={handleScreenCapture}>
            {({ onStartCapture }) => (
                <div className={`game-layout ${calmMode ? 'calm-mode' : ''}`}>
                    {/* Game Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <div className="btn" style={{ background: '#f1c40f', padding: '0.4rem 0.8rem' }}><Star size={18} /> {stars}</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Round {round}/5</div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-secondary" onClick={onStartCapture} style={{ fontSize: '0.8rem' }}>📸 Save Result</button>
                            {timerOn && <div className="timer-display" style={{ background: '#f8f9fa', padding: '0.4rem 0.8rem', borderRadius: '8px' }}><Clock size={16} /> Round Timer</div>}
                        </div>
                    </div>

                    <div className="game-responsive-grid">
                        <div className="main-area">
                            <div className="card" style={{ border: '3px solid var(--primary)', textAlign: 'left', alignItems: 'flex-start' }}>
                                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{message}</h2>
                                {showHint && (
                                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid var(--primary)', width: '100%' }}>
                                        <strong>Hint:</strong> {mode === 3 ? `Target: ₹${target}` : `Try adding ₹2 or ₹5 coins.`}
                                    </div>
                                )}
                                {feedback === 'correct' && <div style={{ color: 'var(--success)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 /> Great Job!</div>}
                                {feedback === 'wrong' && <div style={{ color: 'var(--danger)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle /> Try again!</div>}
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <h3>Your Basket:</h3>
                                <div className="tray-container" style={{ minHeight: '100px', marginBottom: '1rem' }}>
                                    {selectedCoins.length === 0 && <span style={{ color: '#94a3b8' }}>Tap coins below or use numbers 1-6</span>}
                                    {selectedCoins.map((c, i) => (
                                        <div key={i} className="coin" onClick={() => removeCoin(i)} style={{ width: '50px', height: '50px', fontSize: '0.8rem' }}>₹{c}</div>
                                    ))}
                                </div>

                                <h3>Available Coins:</h3>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {levelConfigs[level].coins.map(c => (
                                        <div key={c} className="coin" onClick={() => addCoin(c)}>₹{c}</div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center', minWidth: '150px' }} onClick={handleSubmit}>SUBMIT PAYMENT (Enter)</button>
                                    <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowHint(true)}><HelpCircle size={18} /> Hint</button>
                                    <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setSelectedCoins([]); setCurrentTotal(0); }}><RefreshCw size={18} /> Clear</button>
                                </div>
                            </div>
                        </div>

                        <div className="side-area">
                            <div className="card" style={{ height: 'fit-content', background: 'var(--primary)', color: '#fff', padding: '1.5rem' }}>
                                <h3>Total Paid</h3>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0' }}>₹{currentTotal}</div>
                                <div style={{ background: 'rgba(255,255,255,0.2)', height: '120px', width: '30px', borderRadius: '15px', overflow: 'hidden', margin: '0 auto', position: 'relative' }}>
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', background: '#fff', height: `${Math.min((currentTotal / target) * 100, 100)}%`, transition: 'height 0.3s' }}></div>
                                </div>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>Target: ₹{target}</p>
                            </div>
                        </div>
                    </div>

                    {screenCapture && (
                        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 2000, background: 'white', padding: '10px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxWidth: '200px' }}>
                            <img src={screenCapture} alt="Achievement" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button className="btn btn-primary" onClick={handleDownload} style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem', flex: 1 }}>Download</button>
                                <button className="btn btn-secondary" onClick={() => setScreenCapture('')} style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </ScreenCapture>
    );
};

export default SnackShop;
