import { useState } from 'react';
import './Profile.css';

import useravatar from '../../assets/user-avatar.svg';

const EditProfile = () => {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // todo
    }
    return (
        <div className="Edit-Profile">

            <form className="Edit-Profile-Form" onSubmit={handleSubmit}>
                <div className="form-group border-b">
                    <div className="Edit-Profile-Avatar">
                    <img src={useravatar} alt='user avatar'/>
                    </div>
                </div>

                <div className='border-b'>
                    <div className='fw-bold py-3'><small>About you</small></div>

                    <div className="row form-group">
                        <label htmlFor="editProfileUsername" className="col-3 col-form-label">Username</label>
                        <div className="col-9">
                            <input type="text" readOnly className="form-control-plaintext" id="editProfileUsername" defaultValue="email@example.com"/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="editProfileName" className="col-3 col-form-label">Name</label>
                        <div className="col-9">
                            <input type="text"  className="form-control" id="editProfileName" placeholder="name"/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="editProfileBio" className="col-3 col-form-label">Bio</label>
                        <div className="col-9">
                            <textarea type="text"  className="form-control" id="editProfileBio" placeholder="bio..." />
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="editProfileSkills" className="col-3 col-form-label">Skills</label>
                        <div className="col-9">
                            <textarea type="text"  className="form-control" id="editProfileSkills" placeholder="skills..." />
                        </div>
                    </div>
                </div>

                <div className='border-b'>
                    <div className='fw-bold py-3'><small>Socials</small></div>

                    <div className="row form-group">
                        <label htmlFor="editProfileSite" className="col-3 col-form-label">Site</label>
                        <div className="col-9">
                            <input type="text"  className="form-control" id="editProfileSite" placeholder="website..."/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="editProfileInstagram" className="col-3 col-form-label">Instagram</label>
                        <div className="col-9">
                            <input type="text"  className="form-control" id="editProfileInstagram" placeholder="instagram handle..."/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="editProfileTwitter" className="col-3 col-form-label">Twitter</label>
                        <div className="col-9">
                            <input type="text"  className="form-control" id="editProfileTwitter" placeholder="twitter handle..."/>
                        </div>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <button name="button" type="submit" className="form-btn-next rounded-pill w-100" >Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;
