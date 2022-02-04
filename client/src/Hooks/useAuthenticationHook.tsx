import { useEffect, useState } from 'react';
import { axios } from '../axios';

interface AuthData {
    authStatus: boolean;
    error: boolean;
    id: string;
}

interface ConfigProps {
    getUserID: (id: string) => void;
}

const useAuthenticationHook = (config: ConfigProps) => {
    const [auth_status, setAuthStatus] = useState<boolean | null>(null);

    const ChangeAuthenticationStatus = (to: boolean) => {
        setAuthStatus(to);
    }

    useEffect(() => {
        const AuthenticateUser = async() => {
            const { data }: { data: AuthData } = await axios.post('/checkAuth');
            if (data.error === false) {
                setAuthStatus(data.authStatus)
                config.getUserID(data.id)
            } else {
                setAuthStatus(false);
            }
        }

        AuthenticateUser();
    }, // eslint-disable-next-line 
    []);

    return { auth_status, ChangeAuthenticationStatus }

};

export default useAuthenticationHook;
