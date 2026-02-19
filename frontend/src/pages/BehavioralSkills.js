import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Volume2, VolumeX, Clock, CheckCircle, Save, Info, Play, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const activities = [
    {
        key: 'raiseHand',
        title: 'Raise Hand',
        why: 'Teaches turn-taking and patience.',
        steps: ['Look at teacher', 'Raise one hand high', 'Keep still', 'Wait quietly'],
    },
    {
        key: 'staySeated',
        title: 'Stay Seated',
        why: 'Reduces wandering during lessons.',
        steps: ['Feet on floor', 'Back against chair', 'Hands on desk', 'Eyes forward'],
    },
    {
        key: 'takeTurns',
        title: 'Take Turns',
        why: 'Builds sharing and social patience.',
        steps: ["Watch friend's turn", 'Wait for name', 'Go when called', 'Pass to next'],
    },
    {
        key: 'lineUp',
        title: 'Line Up',
        why: 'Safe and calm transitions.',
        steps: ['Stand behind friend', 'Hands at sides', 'Face forward', 'Wait signal'],
    }
];

function speak(text) {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    }
}

const BehavioralSkills = () => {
    const { updateProgress, settings } = useUser();
    const { calmMode } = settings;

    const [phase, setPhase] = useState('home'); // home, tutorial, practice, quiz, reward
    const [selected, setSelected] = useState(null);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [timerSec, setTimerSec] = useState(45);
    const [quizTargetStep, setQuizTargetStep] = useState(0);
    const [quizChoices, setQuizChoices] = useState([]);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
    const [earnedStars, setEarnedStars] = useState(0);
    const [soundOn, setSoundOn] = useState(true);

    // Sound feedback for phase changes
    useEffect(() => {
        if (!soundOn || !selected) return;
        if (phase === 'tutorial') speak(`${selected.title}. Step 1. ${selected.steps[0]}`);
        if (phase === 'practice') speak(`Practice ${selected.title} for forty five seconds`);
        if (phase === 'quiz') speak(`What comes after ${selected.steps[quizTargetStep - 1]}?`);
    }, [phase, selected, soundOn, quizTargetStep]);

    // Tutorial Auto-Advance
    useEffect(() => {
        if (phase !== 'tutorial') return;
        const interval = setInterval(() => {
            setTutorialStep(s => {
                if (s >= 3) {
                    clearInterval(interval);
                    setPhase('practice');
                    return 3;
                }
                if (soundOn && selected) speak(`Step ${s + 2}. ${selected.steps[s + 1]}`);
                return s + 1;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [phase, selected, soundOn]);

    // Practice Timer
    useEffect(() => {
        if (phase !== 'practice') return;
        setTimerSec(45);
        const interval = setInterval(() => {
            setTimerSec(t => {
                if (t <= 1) {
                    clearInterval(interval);
                    setPhase('quiz');
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [phase]);

    // Quiz Setup
    useEffect(() => {
        if (phase !== 'quiz') return;
        const target = Math.floor(Math.random() * 3) + 1; // Pick step 2, 3, or 4
        setQuizTargetStep(target);
        const correct = selected.steps[target];
        const wrong = selected.steps.filter(s => s !== correct);
        setQuizChoices([...wrong, correct].sort(() => Math.random() - 0.5));
    }, [phase, selected]);

    const handleStart = (activity) => {
        setSelected(activity);
        setPhase('tutorial');
        setTutorialStep(0);
    };

    const onAnswer = (choice) => {
        const isCorrect = choice === selected.steps[quizTargetStep];
        setLastAnswerCorrect(isCorrect);
        const stars = isCorrect ? 5 : 3;
        setEarnedStars(stars);

        // Update Global Progress
        updateProgress({
            gameType: 'behavior',
            stars: stars,
            score: stars * 10,
            accuracy: isCorrect ? 100 : 0
        });

        setPhase('reward');
        if (soundOn) {
            speak(isCorrect ? "Correct! You earned five stars!" : "Good effort! You earned three stars.");
        }
    };

    const backToHome = () => {
        setPhase('home');
        setSelected(null);
    };

    if (phase === 'home') {
        return (
            <div className={`game-container ${calmMode ? 'calm-mode' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/dashboard" className="btn btn-secondary"><ArrowLeft size={18} /> Back</Link>
                        <h1>Classroom Behavioral Skills</h1>
                    </div>
                    <button onClick={() => setSoundOn(!soundOn)} className="btn btn-secondary">
                        {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />} {soundOn ? 'Sound On' : 'Sound Off'}
                    </button>
                </div>

                <div className="card" style={{ marginBottom: '2rem', background: '#f0f7ff', border: '1px solid #cce3ff' }}>
                    <h3><Info size={18} /> How it works</h3>
                    <p>Learn social skills used in the classroom. Watch the steps, practice them, and earn stars!</p>
                </div>

                <div className="game-responsive-grid">
                    {activities.map(a => (
                        <div key={a.key} className="card skill-card" style={{ textAlign: 'left', border: '2px solid #e2e8f0', cursor: 'default' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ color: 'var(--primary)' }}>{a.title}</h2>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{a.why}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {a.steps.map((_, i) => <div key={i} className="chip">{i + 1}</div>)}
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleStart(a)}><Play size={16} /> Learn this Skill</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`game-container ${calmMode ? 'calm-mode' : ''}`}>
            <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <button onClick={backToHome} className="btn btn-secondary"><ArrowLeft size={18} /> Back to Library</button>
                <div style={{ fontWeight: 'bold' }}>First {selected.title}, Then Reward</div>
            </div>

            <div className="card main-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {phase === 'tutorial' && (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Step {tutorialStep + 1}</h2>
                        <div className="behavioral-visual" style={{ fontSize: '2rem', padding: '2rem', background: '#f8f9fa', borderRadius: '15px', marginBottom: '2rem', minWidth: '300px' }}>
                            {selected.steps[tutorialStep]}
                        </div>
                        <div className="chips" style={{ justifyContent: 'center' }}>
                            {selected.steps.map((_, i) => (
                                <div key={i} className={`chip ${i === tutorialStep ? 'active' : ''}`} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                            ))}
                        </div>
                        <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>Auto-advancing to next step...</p>
                    </div>
                )}

                {phase === 'practice' && (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <h2>Practice Time!</h2>
                        <div style={{ position: 'relative', width: '150px', height: '150px', margin: '2rem auto' }}>
                            <div style={{
                                fontSize: '3rem', fontWeight: 'bold', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', height: '100%'
                            }}><Clock size={40} style={{ marginRight: '10px' }} /> {timerSec}</div>
                        </div>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Try to {selected.title.toLowerCase()} for 45 seconds.</p>
                        <div className="progressbar">
                            <div className="progressfill" style={{ width: `${((45 - timerSec) / 45) * 100}%` }}></div>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <button className="btn btn-secondary" onClick={() => setPhase('quiz')}>Skip to Quiz</button>
                        </div>
                    </div>
                )}

                {phase === 'quiz' && (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <h2>Fast Quiz!</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>What comes after: <strong>"{selected.steps[quizTargetStep - 1]}"</strong>?</p>
                        <div className="game-responsive-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                            {quizChoices.map((choice, i) => (
                                <button key={i} className="btn btn-secondary" style={{ padding: '1.5rem', height: 'auto' }} onClick={() => onAnswer(choice)}>
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {phase === 'reward' && (
                    <div style={{ textAlign: 'center' }}>
                        <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '1rem' }} />
                        <h2>Fantastic Job!</h2>
                        <p>{lastAnswerCorrect ? 'You remembered the steps perfectly!' : 'You completed the practice and earned stars!'}</p>
                        <div className="stars" style={{ fontSize: '3rem', margin: '1.5rem 0' }}>
                            {'★'.repeat(earnedStars)}{'☆'.repeat(5 - earnedStars)}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button className="btn btn-primary" onClick={() => handleStart(selected)}><RefreshCw size={18} /> Try Again</button>
                            <button className="btn btn-secondary" onClick={backToHome}><Save size={18} /> Back Home</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BehavioralSkills;
