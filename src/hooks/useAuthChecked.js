import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../features/auth/authSlice';

export default function useAuthChecked() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
    useEffect(() => {
        const localAuth = localStorage.getItem("auth");
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user,
                }));
            }
        } else {
            dispatch(userLoggedOut());
        }
        setAuthChecked(true);
    }, [dispatch])
    return authChecked;
}
