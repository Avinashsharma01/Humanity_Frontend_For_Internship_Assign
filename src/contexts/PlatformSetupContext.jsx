import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const PlatformSetupContext = createContext();

// Provider component
export const PlatformSetupProvider = ({ children }) => {
    // State to track if setup is complete
    const [setupComplete, setSetupComplete] = useState(false);

    // Check localStorage on initial load
    useEffect(() => {
        const storedStatus = localStorage.getItem("platformSetupComplete");
        if (storedStatus === "true") {
            setSetupComplete(true);
        }
    }, []);

    // Function to mark setup as complete
    const completeSetup = () => {
        localStorage.setItem("platformSetupComplete", "true");
        setSetupComplete(true);
    };

    // Function to reset setup status
    const resetSetup = () => {
        localStorage.removeItem("platformSetupComplete");
        setSetupComplete(false);
    };

    return (
        <PlatformSetupContext.Provider
            value={{
                setupComplete,
                completeSetup,
                resetSetup,
            }}
        >
            {children}
        </PlatformSetupContext.Provider>
    );
};

// Custom hook for using the context
export const usePlatformSetup = () => {
    const context = useContext(PlatformSetupContext);
    if (!context) {
        throw new Error(
            "usePlatformSetup must be used within a PlatformSetupProvider"
        );
    }
    return context;
};

export default PlatformSetupContext;
