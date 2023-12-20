import React, { createContext, useState } from 'react';

const DynamicContext = createContext();

const DynamicContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <DynamicContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </DynamicContext.Provider>
    );
};

export { DynamicContext, DynamicContextProvider };
