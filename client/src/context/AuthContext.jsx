import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext(null);
//Context API is acentralized, application-wide state management system or a central announcement system for your entire React application. Instead of whispering information from one component to its direct child, you can make a global announcement that any component, no matter how deeply nested, can listen to.This context will be responsible for:
//- Holding the authentication state (Is the user logged in? What is their token?).
//- Providing functions to login and logout.
//- Automatically checking localStorage when the app starts to see if the user is already logged in


// This component will wrap our entire application and provide the auth state to all components inside it.
export const AuthProvider = ({ children }) => {//provide the context value to all components rendered inside it children.

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);// 'isAuthenticated' is a boolean derived from the presence of a token.
    const [isLoading, setIsLoading] = useState(true); // 'isLoading' state to handle the initial check,  This flag tells the rest of our app to wait until that check is complete.

    //The !! operator in JavaScript is used to explicitly convert any value into its corresponding boolean true or false equivalent
    // Conceptually let token = undefined; !token is logically false but conditonally true. to avoid this use !!
    // In !! operator, 1st ! converts the value to its equivalent boolean and then its reversed, 2nd ! inverts the same value again.
    // This results in actual truthfulness check, token=null=false(explicit value)  1st!=> true 2nd!=> false, hence !!token=false;


    // useEffect to run on initial app load.This effect runs once when the AuthProvider is first mounted.
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
        setIsLoading(false);// Finished loading, set isLoading to false
    }, []); // The empty dependency array ensures this runs only once.


    // This function will be called from our LoginPage.
    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    };


    // This function can be called from a Navbar or Dashboard.
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };


    // We package up our state and functions into an object.
    const contextValue = {token, isAuthenticated, isLoading, login, logout, };


    // We return the AuthContext.Provider, which makes the 'contextValue' available to all of its children components.
    // We don't render anything if it's still loading to avoid rendering incorrect UI (e.g., showing a "Login" button for a split second to a logged-in user).
    return (
        <AuthContext.Provider value={contextValue}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

//Create a custom hook for easy consumption. This is a best practice. Instead of components needing to import both useContext and AuthContext, they can just use this single hook.
export const useAuth = () => {
    const context = useContext(AuthContext); // This check ensures that any component using this hook is a child of the AuthProvider,preventing common errors.
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};