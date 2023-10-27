import Session from "./Sessions";

const loginBtn = "Log In";

const compHeader = (
    <>
        <h2 className="hero-color mb-0"><strong> ChoreSquad</strong></h2>
        <h6>Help when you need it</h6>
    </>
);

const loginAltLink = (
    <div>
        Don't have an account? <span className="tr-pri-c"><a href="/chore-squad/signup">Sign up</a></span>
    </div>
);

const LogIn = () => {
    
    return (
        <Session componentHeader={compHeader} btnText={loginBtn} altLink={loginAltLink} isLogin={true} />
    )
}

export default LogIn;