import { NavLink } from "react-router-dom";
import Session from "./Sessions";

const signUpBtn = "Sign Up";

const compHeader = (
    <>
        <h5 className="mb-2">Welcome to <span className="hero-color"><strong>ChoreSquad</strong></span></h5>
        <h3>Let's start with the basics</h3>
    </>
);

const signUpAltLink = (
    <div>
        Already have an account? <span><NavLink to="/chore-squad/login" >Log in</NavLink></span>
    </div>
);

const SignUp = () => {
    
    return (
        <Session componentHeader={compHeader} btnText={signUpBtn} altLink={signUpAltLink} isLogin={false} />
    )
}

export default SignUp;