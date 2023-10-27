import { useState } from 'react';
import './EditProfile.css';
import CustomModal from '../../components/modal/Modal';

import useravatar from '../../assets/user-avatar.svg';
import { useAuth } from "../../context/UserContext";

const EditProfile = () => {

    const { user, update } = useAuth();

    // set form data to user's info
    const [formData, setFormData] = useState({
        username: user?.username,
        fullname: user?.fullName,
        bio: user?.bio,
        skills: user?.skills,
        site: user?.site,
        instagram: user?.instagram,
        twitter: user?.twitter
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // update profile
        update.mutate({id: user!.id, username: user!.id, fullName: formData.fullname, bio: formData.bio, skills: formData.skills, site: formData.site, instagram: formData.instagram, twitter: formData.twitter })
    }
    return (
        <CustomModal show={true} modalTitle="Edit Profile" >
            <div className="Edit-Profile">

                <form className="Edit-Profile-Form" onSubmit={handleSubmit}>
                    <div className="form-group border-b">
                        <div className="Edit-Profile-Avatar">
                            {user ? (<img className="user-image" src={user.image} alt='user avatar'/>) : (<img src={useravatar} alt='user avatar'/>)}
                        </div>
                    </div>

                    <div className='border-b'>
                        <div className='fw-bold py-3'><small>About you</small></div>

                        <div className="row form-group">
                            <label htmlFor="editProfileUsername" className="col-3 col-form-label">Username</label>
                            <div className="col-9">
                                <input type="text" readOnly className="form-control-plaintext" id="editProfileUsername" value={user?.id} />
                            </div>
                        </div>

                        <div className="row form-group">
                            <label htmlFor="editProfileName" className="col-3 col-form-label">Name</label>
                            <div className="col-9">
                                <input name="fullname" type="text" className="form-control" id="editProfileName" placeholder="Name ..." onChange={handleChange} value={formData.fullname} />
                            </div>
                        </div>

                        <div className="row form-group">
                            <label htmlFor="editProfileBio" className="col-3 col-form-label">Bio</label>
                            <div className="col-9">
                                <textarea name="bio" className="form-control" id="editProfileBio" placeholder="Bio ..." onChange={handleChange} value={formData.bio}/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <label htmlFor="editProfileSkills" className="col-3 col-form-label">Skills</label>
                            <div className="col-9">
                                <textarea name="skills" className="form-control" id="editProfileSkills" placeholder="Your skills ..." onChange={handleChange}  value={formData.skills} />
                                <p className="skills-info">Skills must be separated by a comma</p>
                            </div>
                        </div>
                    </div>

                    <div className='border-b'>
                        <div className='fw-bold py-3'><small>Socials</small></div>

                        <div className="row form-group">
                            <label htmlFor="editProfileSite" className="col-3 col-form-label">Site</label>
                            <div className="col-9">
                                <input name="site" type="text" className="form-control" id="editProfileSite" placeholder="Site ..." onChange={handleChange} value={formData.site} />
                            </div>
                        </div>

                        <div className="row form-group">
                            <label htmlFor="editProfileInstagram" className="col-3 col-form-label">Instagram</label>
                            <div className="col-9">
                                <input name="instagram" type="text" className="form-control" id="editProfileInstagram" placeholder="Instagram .." onChange={handleChange} value={formData.instagram} />
                            </div>
                        </div>

                        <div className="row form-group">
                            <label htmlFor="editProfileTwitter" className="col-3 col-form-label">Twitter</label>
                            <div className="col-9">
                                <input name="twitter" type="text" className="form-control" id="editProfileTwitter" placeholder="Twitter ..." onChange={handleChange} value={formData.twitter} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <button name="button" type="submit" className="form-btn-next rounded-pill w-100" disabled={update.isLoading} >Save</button>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default EditProfile;
