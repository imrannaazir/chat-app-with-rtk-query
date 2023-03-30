import { useSelector } from "react-redux";

export default function useAuth() {
    // get auth store from  store
    const auth = useSelector(state => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
};
