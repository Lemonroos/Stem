// PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Forbidden from '../Components/Pages/Error/ErrorPage';
import getUser from '../config/auth';

interface User {
    Avatar: string;
    Name: string;
    Role: string;
    // Add other properties as needed
}

interface PrivateRouteProps {
    // inverted: boolean;
    children: React.ReactNode;
    requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRoles }) => {
    const [user, setUser] = useState<User | any>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            const resObject = await getUser();
            // setIsAuth(resObject.isAuthenticated);
            // console.log(resObject);
            setUser(resObject.user);
            setIsLoading(false);
            // if (resObject.user) {
            localStorage.setItem('success', JSON.stringify(resObject.isAuthenticated));
            setIsAuth(localStorage.getItem('success') === 'true');
            // }
        };
        fetchUser()
    }, [isAuth]);

    if (isLoading) {
        return <div>Loading...</div>; // Or your loading spinner
    }
    // if (inverted) {
    //     return isAuth ? <Navigate to="/login" /> : <>{children}</>;
    // }

    if (user?.Role && !requiredRoles?.some((r) => user?.Role === r)) return <Forbidden />;

    return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
