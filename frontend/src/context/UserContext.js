import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [user, setUser] = useState({
        name: "N. Uhashini",
        rollNo: "CB.SC.U4CSE23352",
        photo: "/placeholder.jpg"
    });

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('autism_portal_settings');
        return saved ? JSON.parse(saved) : {
            calmMode: false,
            timerActive: true,
            errorFreeMode: true
        };
    });

    const [progress, setProgress] = useState({
        totalStars: 0,
        totalScore: 0,
        streak: 0,
        lastPlayed: null,
        snackShopAccuracy: 0,
        pizzaBuilderAccuracy: 0,
        sessions: 0,
        totalTime: 0
    });

    // 1. Fetch data from Backend on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                if (!response.ok) throw new Error('Failed to connect to backend');
                const data = await response.json();

                if (data.user) setUser(data.user);
                if (data.progress) setProgress(data.progress);
                setLoading(false);
            } catch (err) {
                console.error("Backend error:", err);
                setError("Working in Offline Mode (LocalStorage)");
                // Fallback to localStorage if backend fails
                const saved = localStorage.getItem('autism_portal_progress');
                if (saved) setProgress(JSON.parse(saved));
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. Sync Settings to localStorage (Local concern only)
    useEffect(() => {
        localStorage.setItem('autism_portal_settings', JSON.stringify(settings));
    }, [settings]);

    // 3. Sync Progress to Backend whenever it changes
    const syncToBackend = async (newProgress) => {
        try {
            await fetch('http://localhost:5000/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progress: newProgress })
            });
            localStorage.setItem('autism_portal_progress', JSON.stringify(newProgress));
        } catch (err) {
            console.error("Sync error:", err);
            localStorage.setItem('autism_portal_progress', JSON.stringify(newProgress));
        }
    };

    const updateProgress = (gameData) => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        setProgress(prev => {
            let newStreak = prev.streak;
            if (prev.lastPlayed !== today) {
                if (prev.lastPlayed === yesterdayStr) {
                    newStreak += 1;
                } else if (!prev.lastPlayed) {
                    newStreak = 1;
                } else if (prev.lastPlayed !== yesterdayStr) {
                    newStreak = 1;
                }
            }

            const newScore = prev.totalScore + (gameData.score || 0);
            const newStars = prev.totalStars + (gameData.stars || 0);
            const newSessions = (prev.sessions || 0) + 1;

            let newSnackAcc = prev.snackShopAccuracy || 0;
            let newPizzaAcc = prev.pizzaBuilderAccuracy || 0;

            if (gameData.gameType === 'snack') {
                newSnackAcc = Math.round(((prev.snackShopAccuracy || 0) * (newSessions - 1) + gameData.accuracy) / newSessions);
            } else if (gameData.gameType === 'pizza') {
                newPizzaAcc = Math.round(((prev.pizzaBuilderAccuracy || 0) * (newSessions - 1) + gameData.accuracy) / newSessions);
            }

            const nextProgress = {
                ...prev,
                totalScore: newScore,
                totalStars: newStars,
                sessions: newSessions,
                snackShopAccuracy: newSnackAcc,
                pizzaBuilderAccuracy: newPizzaAcc,
                streak: newStreak,
                lastPlayed: today,
                totalTime: (prev.totalTime || 0) + (gameData.time || 0)
            };

            // Trigger async sync
            syncToBackend(nextProgress);
            return nextProgress;
        });
    };

    const toggleCalmMode = () => setSettings(s => ({ ...s, calmMode: !s.calmMode }));
    const toggleTimer = () => setSettings(s => ({ ...s, timerActive: !s.timerActive }));
    const toggleErrorFree = () => setSettings(s => ({ ...s, errorFreeMode: !s.errorFreeMode }));

    return (
        <UserContext.Provider value={{
            user,
            settings,
            progress,
            updateProgress,
            toggleCalmMode,
            toggleTimer,
            toggleErrorFree,
            setUser,
            loading,
            error
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
