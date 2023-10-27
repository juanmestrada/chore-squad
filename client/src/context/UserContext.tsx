import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction} from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { UseMutationResult, } from "@tanstack/react-query/build/lib/types";
import { StreamChat } from "stream-chat";
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage";

type AuthContext = {
    user?: User
    streamChat?: StreamChat
    successMessage: string | null
    setSuccessMessage: Dispatch<SetStateAction<string | null>>
    errorMessage: string | null
    setErrorMessage: Dispatch<SetStateAction<string | null>>
    signup: UseMutationResult<AxiosResponse, unknown, User>
    login: UseMutationResult<{ token: string; user: User }, unknown, User>
    logout: UseMutationResult<AxiosResponse, unknown, void>
    update: UseMutationResult<AxiosResponse, unknown, User>
}

export type User = {
    id: string 
    username?: string
    fullName?: string
    image?: string
    hashedPassword?: string
    skills?: string[]
    bio?: string
    site?: string
    instagram?: string
    twitter?: string
} 

const UserContext = createContext<AuthContext | null>(null);

export function useAuth() {
    return useContext(UserContext) as AuthContext
}

export function useLoggedInAuth() {
    return useContext(UserContext) as AuthContext &
      Required<Pick<AuthContext, "user">>
}

type UserProviderProps = {
    children: React.ReactNode
} 

const URL = 'https://chore-squad-365c5f832289.herokuapp.com/auth';

export default function UserProvider({children} : UserProviderProps){
    // user
    const [user, setUser] = useLocalStorage<User>("user");
    // user token
    const [token, setToken] = useLocalStorage<string>("token");
    // streamchat instance
    const [streamChat, setStreamChat] = useState<StreamChat>();
    // success message
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    // error message
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const signup = useMutation({
        mutationFn: (user: User) => {
            // server request
            return axios.post(`${URL}/signup`, user);
        },
        onSuccess() {
            // redirect user to login page on signup success
            navigate("/choresquad/login");

            // set success message
            setSuccessMessage("Account created");
        },
        onError(error) {
            // typescript error type
            const err = error as AxiosError;
            
            // stringify json error message
            const str = String(err.response?.data);

            // set error message
            setErrorMessage(str);
        },
    })

    const login = useMutation({
        mutationFn: (user: User) => {
            // server request
            return axios.post(`${URL}/login`, user).then((res) => {
                return res.data as { token: string; user: User };
            })
        },
        onSuccess(data) {
            // set state with user data
            setUser(data.user);
            setToken(data.token);
        },
        onError(error) {
            // typescript error type
            const err = error as AxiosError;
            
            // stringify json error message
            const str = String(err.response?.data);
            
            // set error message
            setErrorMessage(str);
        },
        
    })

    const logout = useMutation({
        mutationFn: () => {
            // server request
            return axios.post(`${URL}/logout`, { token });
        },
        onSuccess() {
            // clear user data
            setToken(undefined);
            setUser(undefined);
            setStreamChat(undefined);

            // set success message
            setSuccessMessage("Logged out successfully");
        },
    })

    const update = useMutation({
        mutationFn: (user: User) => {
            // server request
            return axios.post(`${URL}/update`, {token, user}).then((res) => {
                return res.data;
            })
        },
        onSuccess(data) {
            // set state with user data
            setUser(data.user);

            // set success message
            setSuccessMessage("Profile updated");
        },
        onError(error) {
            // typescript error type
            const err = error as AxiosError;
            
            // stringify json error message
            const str = String(err.response?.data);

            // set error message
            setErrorMessage(str);
        },
        
    })

    useEffect(() => {
        // only log in user if user state and token state is set
        if (token == null || user == null) return;

        const chat = new StreamChat(process.env.REACT_APP_STREAM_API_KEY!);

        // prevent re-login
        if (chat.tokenManager.token === token && chat.userID === user.id) {
            return;
        }
        
        let isInterrupted = false;

        // log in user
        const connectPromise = chat.connectUser(user, token).then(() => {
            if (isInterrupted) return;

            setStreamChat(chat);
        })
        
        // cleanup function
        return () => {
            isInterrupted = true;

            setStreamChat(undefined);

            connectPromise.then(() => {
                chat.disconnectUser()
            });
        }
      }, [token, user])
    
    return (
        <UserContext.Provider value={{ user, signup, login, streamChat, logout, update, errorMessage, setErrorMessage, successMessage, setSuccessMessage }}>
            {children}
        </UserContext.Provider>
    )
}