import { createContext, useState, ReactNode } from "react";

type Props = {
    children?: ReactNode;
}

type AuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void
}

const initial = {
    authenticated: false,
    setAuthenticated: () => { }
}

const AuthContext = createContext<AuthContext>(initial)

const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(initial.authenticated)

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }