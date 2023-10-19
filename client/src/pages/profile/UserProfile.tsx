import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./UserProfile.css";

import SeedUsers from "../../api/seed";

import CustomModal from '../../components/modal/Modal';
import Loading from "../../common/Loading";

type MockUSerProps = {
    username: string;
    bio: string;
    fullName: string;
    image: string;
    skills: string [];
    site: string;
    instagram: string;
    twitter: string;
}

const UserProfile = () => {
    const [clickedUser, setClickedUser] = useState<MockUSerProps | undefined>();
    const { name } = useParams();
    
    useEffect(() => {
        const getUsers = async () => {
            try {
                
                const current_user = await SeedUsers.getUser(name);
                
                if(current_user){
                    setClickedUser(current_user[0]);
                }
                
            } catch (error) {
                console.log(error)
            }
        }

        getUsers();
    }, [name])

    
    if(!clickedUser) return <Loading/>;
    
    return (
        <CustomModal show={true} modalTitle={clickedUser.username} >
            <div className="User-Profile">
                <div className="User-Profile-avatar">
                    <img src={clickedUser.image} alt="user" />
                </div>

                <div className="User-Profile-Info">
                    <div className="User-Profile-Bio border-b">
                        <h6>Bio</h6>
                        <p>{clickedUser.bio}</p>
                    </div>

                    <div className="User-Profile-Skills border-b">
                        <h6>Skills</h6>

                        <div className="User-Profile-Skills-container">
                            {clickedUser.skills.map(s => (<div className="User-Profile-skill" key={s} >{s}</div>))}
                        </div>
                    </div>

                    <div className="User-Profile-Socials">
                        <h6>Socials</h6>

                        <div className="User-Profile-Socials-container">
                            <div className="User-Profile-Socials-link">
                                <svg viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" role="img" className="social-icon"><g><path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path></g></svg>

                                <a href={clickedUser.site} target="_blank" rel="noopener noreferrer">{clickedUser.site}</a>
                            </div>

                            <div className="User-Profile-Socials-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" role="img" className="social-icon"><path d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42c-.526.204-.973.478-1.417.923-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372.526-.204.973-.478 1.417-.923.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942-.204-.526-.478-.973-.923-1.417-.444-.445-.89-.72-1.417-.923-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.048 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.01-3.233-.048c-.78-.036-1.203-.166-1.485-.276-.374-.145-.64-.318-.92-.598-.28-.28-.453-.546-.598-.92-.11-.282-.24-.705-.276-1.485C1.45 10.39 1.44 10.136 1.44 8s.01-2.39.048-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276C5.61 1.45 5.864 1.44 8 1.44zm0 2.452c-2.27 0-4.108 1.84-4.108 4.108 0 2.27 1.84 4.108 4.108 4.108 2.27 0 4.108-1.84 4.108-4.108 0-2.27-1.84-4.108-4.108-4.108zm0 6.775c-1.473 0-2.667-1.194-2.667-2.667 0-1.473 1.194-2.667 2.667-2.667 1.473 0 2.667 1.194 2.667 2.667 0 1.473-1.194 2.667-2.667 2.667zm5.23-6.937c0 .53-.43.96-.96.96s-.96-.43-.96-.96.43-.96.96-.96.96.43.96.96z"></path></svg>

                                <a href={clickedUser.instagram} target="_blank" rel="noopener noreferrer">{clickedUser.instagram}</a>
                            </div>

                            <div className="User-Profile-Socials-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" role="img" className="social-icon"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>

                                <a href={clickedUser.twitter} target="_blank" rel="noopener noreferrer">{clickedUser.twitter}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='User-Profile-Mssg-Btn'>
                <svg viewBox="0 0 24 24" className="User-Profile-Mssg-svg"><title>Message</title><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
            </div>
        </ CustomModal>
        
    )
}

export default UserProfile;