import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }