import react, { createContext, useState, useEffect, useCallback } from "react";
import { postRequest, putRequest ,baseUrl } from "../Api/Services";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [user, setUser] = useState(null);



    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });


    const [profileError, setProfileError] = useState(null);
    const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });


    
    

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateRegisterError = useCallback((error) => {
        setRegisterError(error);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const updateLoginError = useCallback((error) => {
        setLoginError(error);
    }, []);

    const updateProfileInfo = useCallback((info) => {
        setProfileInfo(info);
    }, []);

    const updateProfileError = useCallback((error) => {
        setProfileError(error);
    }, []);





    // Register
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setRegisterError(null);

        if (registerInfo.password !== registerInfo.confirmPassword) {
            setRegisterError({
                error: true,
                message: "Passwords do not match",
            });
            return;
        }
        setIsRegisterLoading(true);

        const response = await postRequest(
            `${baseUrl}/users/register`,
            JSON.stringify(registerInfo)
        );
        setIsRegisterLoading(false);

        if (response.error) {
            setRegisterError(response);
        } else {
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
            toast.success("Registration Successful!");
        }

    }, [registerInfo]);



    // Login
    const loginUser = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setIsLoginLoading(true);

        const response = await postRequest(
            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo)
        );
        setIsLoginLoading(false);

        if (response.error) {
            setLoginError(response);
        } else {
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
            toast.success("Login Successful");
        }
    }


    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
        toast.success("Logout Successful");
    }, []);


    // Profile Update

    const updateUserProfile = useCallback(
        async (e) => {
          e.preventDefault();

          setProfileError(null);
    
          if (profileInfo.password !== profileInfo.confirmPassword) {
            setProfileError({
              error: true,
              message: "Passwords do not match",
            });
          } else {
            setIsUpdateProfileLoading(true);
    
            const response = await putRequest(
              `${baseUrl}/users/profile`,
              JSON.stringify(profileInfo),
            );
            setIsUpdateProfileLoading(false);
    
            if (response.error) {
              return setProfileError(response);
            }
    
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
            toast.success("Profile updated successfully");
          }
        },
        [profileInfo],
      );



   
    const authContextValue = {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        updateRegisterError,
        user,

        loginError,
        loginUser,
        isLoginLoading,
        updateLoginInfo,
        updateLoginError,
        loginInfo,
        
        logoutUser,

        profileError,
        profileInfo,
        updateProfileInfo,
        updateProfileError,
        updateUserProfile,
        isUpdateProfileLoading,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

