import React, { createContext, useContext, useState, useEffect} from "react";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { UseMutationResult, } from "@tanstack/react-query/build/lib/types";
import { StreamChat } from "stream-chat";
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage";

type AuthContext = {
    user?: User
    streamChat?: StreamChat
    signup: UseMutationResult<AxiosResponse, unknown, User>
    login: UseMutationResult<{ token: string; user: User }, unknown, string>
    logout: UseMutationResult<AxiosResponse, unknown, void>
}

export type User = {
    id: string 
    name: string
    fullName: string
    image?: string
    hashedPassword: string
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

const URL = 'http://localhost:5000/auth';

export default function UserProvider({children} : UserProviderProps){
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage<User>("user");
    const [token, setToken] = useLocalStorage<string>("token");
    const [streamChat, setStreamChat] = useState<StreamChat>();

    const signup = useMutation({
        mutationFn: (user: User) => {
            return axios.post(`${URL}/signup`, user);
        },
        onSuccess() {
            navigate("/login");
        },
    })

    const login = useMutation({
        mutationFn: (id: string) => {
            return axios.post(`${URL}/login`, { id })
                .then(res => {
                    return res.data as { token: string; user: User }
                }
            )
        },
        onSuccess(data) {
            setToken(data.token);
            setUser(data.user);
        },
    })

    const logout = useMutation({
        mutationFn: () => {
            return axios.post(`${URL}/logout`, { token })
        },
        onSuccess() {
            setToken(undefined);
            setUser(undefined);
            setStreamChat(undefined);
        },
    })

    useEffect(() => {
        if (token == null || user == null) return;

        const chat = new StreamChat(process.env.REACT_APP_STREAM_API_KEY!);

        // prevent re-login
        if (chat.tokenManager.token === token && chat.userID === user.id) return;
    
        let isInterrupted = false;

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
        <UserContext.Provider value={{ user, signup, login, streamChat, logout }}>
            {children}
        </UserContext.Provider>
    )
}