import { useRef, useState, useEffect } from "react";
import './Sessions.css';

import { useAuth } from "../context/UserContext";

//validation regex
const USERNAME_REGEX = /^[a-z]{1}[a-z0-9-_]{3,14}$/; 
const FULLNAME_REGEX = /^[a-z]{1}[a-z0-9-_ ]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// interface InitialState{
//     fullName: string;
//     username: string;
//     password: string;
//     confirmPassword: string;
// }

interface SessionProps{
    componentHeader: React.ReactNode;
    btnText: string;
    altLink: React.ReactNode;
    isLogin: boolean;
}

const Session = ({ componentHeader, btnText, altLink, isLogin }: SessionProps) => {
    const { signup, login, setErrorMessage } = useAuth();
 
    const userRef = useRef<HTMLInputElement>(null);

    // username
    const [userName, setUserName] = useState<string>('');
    const [validUserName, setValidUserName] = useState<boolean>(false);
    const [userNameFocus, setUserNameFocus] = useState<boolean>(false);

    // fullName
    const [userFullName, setUserFullName] = useState<string>('');
    const [validUserFullName, setValidUserFullName] = useState<boolean>(false);
    const [userFullNameFocus, setUserFullNameFocus] = useState<boolean>(false);

    // password
    const [pwd, setPwd] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    // password confirmation
    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        // validate UserName
        setValidUserName(USERNAME_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        // validate userName
        setValidUserFullName(FULLNAME_REGEX.test(userFullName));
    }, [userFullName])

    useEffect(() => {
        // validate pwd
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // user data validation
        const check1 = USERNAME_REGEX.test(userName);
        const check2 = FULLNAME_REGEX.test(userFullName);
        const check3 = PWD_REGEX.test(pwd);

        // prevent submission with JS hack
        if(isLogin){
            // prevent submission hack for login
            if (!check1 || !check3) {
                setErrorMessage("Invalid entry.");
                return;
            }
        } else {
            // prevent submission hack for signup
            if (!check1 || !check2 || !check3) {
                setErrorMessage("Invalid entry.");
                return;
            }
        }
        
        // user image
        const imageUrl = `https://getstream.io/random_svg/?name=${userFullName}`;

        // session function for login or signup
        if(isLogin){
            login.mutate({id: userName, hashedPassword: pwd});
        } else {
            signup.mutate({ id: userName, username: userName, hashedPassword: pwd, fullName: userFullName, image: imageUrl });
        }
        
    }
    return (
        <div className="Sessions">
            <div className="mb-5">
                {componentHeader}
            </div>

            <form className="new_user_session needs-validation" id="new_user_session" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <div className="form-floating has-validation">
                        <input
                            type="text"
                            id="floatingUserName"
                            className={`form-control shadow-sm bg-white rounded ${userName && !validUserName ? "is-invalid" : ""}`}
                            ref={userRef}
                            autoComplete="off"
                            placeholder="Username"
                            pattern="\S*"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            aria-invalid={validUserName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserNameFocus(true)}
                            onBlur={() => setUserNameFocus(false)}
                        />
                        <label htmlFor="floatingUserName">Username</label>
                    </div>

                    <p id="uidnote" className={userNameFocus && userName && !validUserName ? "instructions py-0 mb-0" : "offscreen py-0 mb-0"}>
                        4 to 15 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>

                {!isLogin && (<div className="form-group mb-2">
                    <div className="form-floating has-validation">
                        <input
                            type="text"
                            id="floatingFullName"
                            className={`form-control shadow-sm bg-white rounded ${userFullName && !validUserFullName ? "is-invalid" : ""}`}
                            autoComplete="off"
                            placeholder="Full Name"
                            onChange={(e) => setUserFullName(e.target.value)}
                            value={userFullName}
                            required
                            aria-invalid={validUserFullName ? "false" : "true"}
                            aria-describedby="unnote"
                            onFocus={() => setUserFullNameFocus(true)}
                            onBlur={() => setUserFullNameFocus(false)}
                        />
                        <label htmlFor="floatingFullName">Full Name</label>
                    </div>

                    <p id="unnote" className={userFullNameFocus && userFullName && !validUserFullName ? "instructions py-0 mb-0" : "offscreen py-0 mb-0"}>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>)}

                <div className="form-group mb-2">
                    <div className="form-floating has-validation">
                        <input
                            type="password"
                            id="floatingPassword"
                            className={`form-control shadow-sm bg-white rounded ${pwd && !validPwd ? "is-invalid" : ""}`}
                            autoComplete="off"
                            placeholder="Password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions py-0 mb-0" : "offscreen py-0 mb-0"}>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>

                {!isLogin && (<div className="form-group mb-2">
                    <div className="form-floating has-validation">
                        <input
                            type="password"
                            id="floatingConfirmPassword"
                            className={`form-control shadow-sm bg-white rounded ${matchPwd && !validMatch ? "is-invalid" : ""}`}
                            autoComplete="off"
                            placeholder="Confirm Password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                    </div>

                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions py-0 mb-0" : "offscreen py-0 mb-0"}>
                        Must match the first password input field.
                    </p>
                </div>)}

                <div className="form-group mb-2">
                    {isLogin ? 
                        (
                            <button name="button" type="submit" className="form-btn-next rounded-pill w-100" disabled={(login.isLoading || !validUserName || !validPwd)  ? true : false}>{btnText}</button>
                        ) : 
                        (
                            <button name="button" type="submit" className="form-btn-next rounded-pill w-100" disabled={(signup.isLoading || !validUserName || !validUserFullName || !validPwd || !validMatch)  ? true : false}>{btnText}</button>
                        )
                    }
                </div>

                <div className="form-group">
                    {altLink}
                </div>
            </form>
        </div>
    )
}

export default Session;