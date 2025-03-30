import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../misc/authProvider";

const VerifyEmailScreen = () => {
    const [emailVerified, setEmailVerified] = useState(false);
    const { checkEmailVerification } = useContext(AuthContext);

    useEffect(() => {
        const interval = setInterval(async () => {
            const verified = await checkEmailVerification();
            if (verified){
                clearInterval(interval);
                setEmailVerified(true);
                navigation.replace('Home');
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);
};
export default VerifyEmailScreen;