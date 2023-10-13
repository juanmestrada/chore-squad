import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/UserContext";
import './LandingPage.css';
import carpenter from "../../assets/carpenter.jpeg";

const LandingPage = () => {
    const { user } = useAuth();
    
    return (
        <div className="LandingPage">
            <div className="container LandingPage-hero">
                <h5 className='hero-color'>ChoreSquad</h5>
                <h1>Help when you need it.</h1>
                {user ? <h2>
                    Welcome Back, {user.firstName || user.username}
                </h2> : (<button className="LandingPage-start-btn"><NavLink to="/choresquad/login">Get Started</NavLink></button>)}
            </div>
            <div className='LandingPage-marquee inView'>
                <div className="marquee_images">
						<div className="marquee_images_wr_l">
							<div className="m_images_l">
								<img src="https://images.pexels.com/photos/4353615/pexels-photo-4353615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="cleaning"/>
							</div>
							<div className="m_images_r">
								<img src="https://images.pexels.com/photos/5767926/pexels-photo-5767926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="handyman"/>
							</div>
							<div className="m_images_c">
								<img src="https://images.pexels.com/photos/4481944/pexels-photo-4481944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="mechanic"/>
							</div>
						</div>
						<div className="marquee_images_wr_r">
							<div className="m_images_c">
								<img src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="programming"/>
							</div>
							<div className="m_images_l">
								<img src="https://images.pexels.com/photos/8629097/pexels-photo-8629097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="baking"/>
							</div>
							<div className="m_images_r">
								<img src="https://images.pexels.com/photos/5029923/pexels-photo-5029923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="gardening"/>
							</div>
						</div>
					</div>
            </div>
            <div className='container LandingPage-intro'>
                <div className='lft'>
                    <h1>Meet trusted people from your community to get the job done.</h1>
                </div>
                <div className='rght'>
                    <p>When you're short on time but your home project must get done, get help from skilled people in your community and support small businesses.</p>
                    <button className="LandingPage-start-btn"><NavLink to="/choresquad/login">Find help</NavLink></button>
                </div>
            </div>
            <div className='LandingPage-join-intro'>
                <h1>Find your next side hustle</h1>
                <p>Whether you're starting your own business or just looking for a little extra cash.</p>
            </div>
            <div className='container LandingPage-join'>
                <div className='lft'>
                    <h1>Earn extra income doing what you already know.</h1>
                    <p>Put your skills to work and get paid doing what you're good at.</p>
                    <button className="LandingPage-start-btn"><NavLink to="/choresquad/login">Join today</NavLink></button>
                </div>
                <div className='rght'>
                    <div className='join-img-container'>
                        <img src={carpenter} />
                    </div>
                </div>
            </div>
            <div className='LandingPage-getStarted'>
                <h1>Join ChoreSquad today.</h1>
                <button className="LandingPage-start-btn"><NavLink to="/choresquad/login">Get Started</NavLink></button>
            </div>
            <div className='container LandingPage-footer'>
                <div className='LandingPage-placeholder-socials'>
                    <div  className='LandingPage-placeholder-logo'>
                        <p className='hero-color'>Chore Squad</p>
                    </div>
                    <div className='LandingPage-placeholder-container'>
                        <p className="footer-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="acpqu1gvzbcpd52ovsvqrsdbik6s7lo8" role="img" viewBox="0 0 24 24" className="icon "><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
                        </p>
                        <p className="footer-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="aohz0pcdpnkczl81c21xv0t5z1dgysz4" role="img" viewBox="0 0 24 24" className="icon "><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path></svg>
                        </p>
                        <p className="footer-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" role="img" className="icon "><path d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42c-.526.204-.973.478-1.417.923-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372.526-.204.973-.478 1.417-.923.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942-.204-.526-.478-.973-.923-1.417-.444-.445-.89-.72-1.417-.923-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.048 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.01-3.233-.048c-.78-.036-1.203-.166-1.485-.276-.374-.145-.64-.318-.92-.598-.28-.28-.453-.546-.598-.92-.11-.282-.24-.705-.276-1.485C1.45 10.39 1.44 10.136 1.44 8s.01-2.39.048-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276C5.61 1.45 5.864 1.44 8 1.44zm0 2.452c-2.27 0-4.108 1.84-4.108 4.108 0 2.27 1.84 4.108 4.108 4.108 2.27 0 4.108-1.84 4.108-4.108 0-2.27-1.84-4.108-4.108-4.108zm0 6.775c-1.473 0-2.667-1.194-2.667-2.667 0-1.473 1.194-2.667 2.667-2.667 1.473 0 2.667 1.194 2.667 2.667 0 1.473-1.194 2.667-2.667 2.667zm5.23-6.937c0 .53-.43.96-.96.96s-.96-.43-.96-.96.43-.96.96-.96.96.43.96.96z"></path></svg>
                        </p>
                        <p className="footer-social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="aabh633vm6akibk6pt13gz3pdkk5g63w" role="img" viewBox="0 0 24 24" className="icon "><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"></path></svg>
                        </p>
                    </div>
                </div>
                <div className='LandingPage-placeholder-links'>
                    <p>@2023 ChoreSquad</p>
                    <p>Terms</p>
                    <p>Privacy</p>
                    <p>Cookies</p>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;