import { useEffect, useState } from 'react';
import { axios } from '../axios';

interface AuthData {
    authStatus: boolean;
    error: boolean;
}

const useAuthenticationHook = () => {
    const [auth_status, setAuthStatus] = useState<boolean | null>(null);

    const ChangeAuthenticationStatus = (to: boolean) => {
        setAuthStatus(to);
    }

    useEffect(() => {
        const AuthenticateUser = async() => {
            const { data }: { data: AuthData } = await axios.post('/checkAuth');
            if (data.error === false) {
                setAuthStatus(data.authStatus)
            } else {
                setAuthStatus(false);
            }
        }

        AuthenticateUser();
    }, []);

    return { auth_status, ChangeAuthenticationStatus }

};

export default useAuthenticationHook;
