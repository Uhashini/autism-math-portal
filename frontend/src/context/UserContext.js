import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Load initial state from localStorage
    const getInitialProgress = () => {
        const saved = localStorage.getItem('autism_portal_progress');
        const defaultProgress = {
            totalStars: 0,
            totalScore: 0,
            streak: 0,
            lastPlayed: null, // YYYY-MM-DD
            snackShopAccuracy: 0,
            pizzaBuilderAccuracy: 0,
            sessions: 0,
            totalTime: 0
        };
        return saved ? JSON.parse(saved) : defaultProgress;
    };

    const getInitialSettings = () => {
        const saved = localStorage.getItem('autism_portal_settings');
        return saved ? JSON.parse(saved) : {
            calmMode: false,
            timerActive: true,
            errorFreeMode: true
        };
    };

    const [user, setUser] = useState({
        name: "N. Uhashini",
        rollNo: "CB.SC.U4CSE23352",
        photo: "/placeholder.jpg"
    });

    const [settings, setSettings] = useState(getInitialSettings);
    const [progress, setProgress] = useState(getInitialProgress);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('autism_portal_progress', JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        localStorage.setItem('autism_portal_settings', JSON.stringify(settings));
    }, [settings]);

    const updateProgress = (gameData) => {
        setProgress(prev => {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

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
            const newSessions = prev.sessions + 1;

            let newSnackAcc = prev.snackShopAccuracy;
            let newPizzaAcc = prev.pizzaBuilderAccuracy;

            if (gameData.gameType === 'snack') {
                newSnackAcc = Math.round((prev.snackShopAccuracy * (newSessions - 1) + gameData.accuracy) / newSessions);
            } else if (gameData.gameType === 'pizza') {
                newPizzaAcc = Math.round((prev.pizzaBuilderAccuracy * (newSessions - 1) + gameData.accuracy) / newSessions);
            }

            return {
                ...prev,
                totalScore: newScore,
                totalStars: newStars,
                sessions: newSessions,
                snackShopAccuracy: newSnackAcc,
                pizzaBuilderAccuracy: newPizzaAcc,
                streak: newStreak,
                lastPlayed: today,
                totalTime: prev.totalTime + (gameData.time || 0)
            };
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
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
