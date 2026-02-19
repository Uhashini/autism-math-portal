import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ClipboardList, Star, User, Calendar, MessageSquare, PlusCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const ComprehensiveFeedback = () => {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        childName: user.name,
        parentName: '',
        feedbackDate: new Date().toISOString().split('T')[0],
        gradeLevel: '',

        // Practice details
        atHomePractice: '',
        practiceFrequency: '',
        practiceMinutesPerDay: '',

        // Skill ratings (1-5 scale)
        ratingFocus: '3',
        ratingFollowingDirections: '3',
        ratingTurnTaking: '3',
        ratingEmotionalRegulation: '3',
        ratingSocialInteraction: '3',

        // Challenge Areas
        challengeAttention: false,
        challengeBehavior: false,
        challengeSocial: false,
        challengeAcademic: false,
        challengeMotivation: false,

        // Open-ended fields
        challenges: '',
        successes: '',
        improvementAreas: '',
        additionalComments: '',

        // Support needs
        needsSupport: 'no',
        supportType: '',
        preferredContactMethod: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        // Fetch existing comprehensive feedback from backend if available
        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    // Filter for comprehensive ones if needed, or just show all
                    setFeedbackList(data);
                }
            } catch (err) {
                console.error("Failed to fetch feedback:", err);
            }
        };
        fetchFeedback();
    }, [submitted]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    feedback: {
                        ...formData,
                        type: 'comprehensive',
                        timestamp: new Date().toISOString()
                    }
                })
            });
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error("Submission error:", err);
            setSubmitted(true); // Show success for demo
        }
    };

    if (submitted) {
        return (
            <div className="game-container" style={{ textAlign: 'center', padding: '4rem' }}>
                <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1rem' }} />
                <h1>Feedback Received</h1>
                <p>Thank you for the detailed observations. This data helps customize the student's learning path.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Submit Another</button>
                    <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
                </div>
            </div>
        );
    }

    const inputStyle = {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        marginBottom: '1rem'
    };

    const sectionTitle = {
        marginTop: '2.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--primary)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    return (
        <div className="game-container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1>Comprehensive Student Review</h1>
                <p style={{ color: 'var(--secondary)' }}>Detailed feedback system for Parents & Educators</p>
            </div>

            <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
                <h3 style={sectionTitle}><User size={20} /> Basic Information</h3>
                <div className="game-responsive-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label>Student Name</label>
                        <input type="text" name="childName" style={inputStyle} value={formData.childName} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Parent/Guardian Name</label>
                        <input type="text" name="parentName" style={inputStyle} value={formData.parentName} onChange={handleChange} required />
                    </div>
                </div>
                <div className="game-responsive-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label>Review Date</label>
                        <input type="date" name="feedbackDate" style={inputStyle} value={formData.feedbackDate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Grade Level</label>
                        <select name="gradeLevel" style={inputStyle} value={formData.gradeLevel} onChange={handleChange} required>
                            <option value="">Select Grade</option>
                            <option value="Pre-K">Pre-K</option>
                            <option value="Kindergarten">Kindergarten</option>
                            <option value="1st Grade">1st Grade</option>
                            <option value="2nd Grade">2nd Grade</option>
                            <option value="3rd Grade">3rd Grade</option>
                        </select>
                    </div>
                </div>

                <h3 style={sectionTitle}><Calendar size={20} /> At-Home Practice</h3>
                <label>What skills did you practice at home?</label>
                <textarea name="atHomePractice" style={{ ...inputStyle, height: '100px' }} value={formData.atHomePractice} onChange={handleChange} />
                <div className="game-responsive-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label>Frequency</label>
                        <select name="practiceFrequency" style={inputStyle} value={formData.practiceFrequency} onChange={handleChange}>
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="3-4 times/week">3-4 times/week</option>
                            <option value="Occasionally">Occasionally</option>
                        </select>
                    </div>
                    <div>
                        <label>Minutes Per Day</label>
                        <input type="number" name="practiceMinutesPerDay" style={inputStyle} value={formData.practiceMinutesPerDay} onChange={handleChange} />
                    </div>
                </div>

                <h3 style={sectionTitle}><Star size={20} /> Skill Progress (1-5)</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                        { id: 'ratingFocus', label: 'Focus & Attention' },
                        { id: 'ratingFollowingDirections', label: 'Following Directions' },
                        { id: 'ratingTurnTaking', label: 'Turn-Taking' },
                        { id: 'ratingEmotionalRegulation', label: 'Emotional Regulation' }
                    ].map(field => (
                        <div key={field.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: '#f8f9fa', borderRadius: '8px' }}>
                            <span>{field.label}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map(v => (
                                    <label key={v} style={{ cursor: 'pointer' }}>
                                        <input type="radio" name={field.id} value={v} checked={formData[field.id] === v.toString()} onChange={handleChange} style={{ marginRight: '4px' }} /> {v}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <h3 style={sectionTitle}><AlertCircle size={20} /> Challenge Areas</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '1rem', background: '#fff5f5', borderRadius: '8px' }}>
                    {[
                        { id: 'challengeAttention', label: 'Attention Focus' },
                        { id: 'challengeBehavior', label: 'Behavioral Rules' },
                        { id: 'challengeSocial', label: 'Social Interaction' },
                        { id: 'challengeMotivation', label: 'Motivation' }
                    ].map(field => (
                        <label key={field.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input type="checkbox" name={field.id} checked={formData[field.id]} onChange={handleChange} /> {field.label}
                        </label>
                    ))}
                </div>

                <h3 style={sectionTitle}><MessageSquare size={20} /> Observations</h3>
                <label>Specific Successes/Achievements</label>
                <textarea name="successes" style={{ ...inputStyle, height: '80px' }} value={formData.successes} onChange={handleChange} placeholder="What went well?" />
                <label>Additional Comments</label>
                <textarea name="additionalComments" style={{ ...inputStyle, height: '80px' }} value={formData.additionalComments} onChange={handleChange} />

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f1f4ff', borderRadius: '12px', border: '1px solid #dce2ff' }}>
                    <label style={{ fontWeight: 'bold' }}>Does the student need additional specialized support?</label>
                    <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                        <label><input type="radio" name="needsSupport" value="yes" checked={formData.needsSupport === 'yes'} onChange={handleChange} /> Yes</label>
                        <label><input type="radio" name="needsSupport" value="no" checked={formData.needsSupport === 'no'} onChange={handleChange} /> No</label>
                    </div>
                    {formData.needsSupport === 'yes' && (
                        <input type="text" name="supportType" className="form-control" placeholder="What kind of support? (e.g. Speech Therapy, Counseling)" value={formData.supportType} onChange={handleChange} />
                    )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '3rem', fontSize: '1.1rem', padding: '1rem', justifyContent: 'center' }}>
                    <Send size={20} /> Submit Comprehensive Review
                </button>
            </form>

            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>History of Reviews</h2>
                {feedbackList.filter(f => f.type === 'comprehensive').length === 0 ? (
                    <p>No comprehensive reviews submitted yet.</p>
                ) : (
                    feedbackList.filter(f => f.type === 'comprehensive').reverse().map((f, i) => (
                        <div key={i} className="card" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{f.childName} - {f.gradeLevel}</strong>
                                <span style={{ color: '#666' }}>{new Date(f.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p style={{ marginTop: '0.5rem', color: '#555' }}>
                                Submitted by: {f.parentName} | Focus Rating: {f.ratingFocus}/5
                            </p>
                            {f.needsSupport === 'yes' && <div className="chip" style={{ background: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2' }}>Support Needed: {f.supportType}</div>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ComprehensiveFeedback;
