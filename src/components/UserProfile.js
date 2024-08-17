import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import './UserProfile.css';
import { FaPen } from 'react-icons/fa';
import Footer from "./Footer";

function UserProfile() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [user, setUser] = useState({
        // setting defalt state of user
        id: '',
        username: '',
        email: '',
        password: '',
        profileImage: 'https://via.placeholder.com/150', 
    });
    // State to track which fields are being edited
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        password: false,
    });

    // fetching user and checking if he is logged in
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://users1-o2el.onrender.com/users'); 
                const users = await response.json();
                const currentUser = users.find(user => user.username === 'kil'); 

                if (currentUser) {
                    setUser({
                        ...currentUser,
                        profileImage: currentUser.profileImage || 'https://via.placeholder.com/150'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        // Only fetch user data if the user is logged in
        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn]);

    // Handle input field changes for user data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    //handling the change of profile picture
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prevUser => ({
                    ...prevUser,
                    profileImage: reader.result 
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission to update user profile
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(`https://users1-o2el.onrender.com/users${user.id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    profileImage: user.profileImage, 
                }),
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                setIsEditing({
                    name: false,
                    email: false,
                    password: false,
                });
            } else {
                const errorText = await response.text();
                console.error('Failed to update profile:', errorText);
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile.');
        }
    };

    // rendering 
    return (
        <div className="user-profile-container">
            <div className="user-profile-card">
                <form onSubmit={handleSubmit}> 
                    <img src={user.profileImage} alt="User Profile" className="profile-picture" /> 
                    <div className="profile-field">
                        <label>Profile Picture:</label>
                        <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    </div>
                    <h2>User Profile</h2>

                    <div className="profile-field">
                        <label>Username:</label>
                        <div className="editable-field">
                            {isEditing.name ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{user.username}</span>
                            )}
                            <FaPen
                                className="edit-icon"
                                onClick={() => setIsEditing(prev => ({ ...prev, name: !prev.name }))}
                            />
                        </div>
                    </div>

                    <div className="profile-field">
                        <label>Email:</label>
                        <div className="editable-field">
                            {isEditing.email ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{user.email}</span>
                            )}
                            <FaPen
                                className="edit-icon"
                                onClick={() => setIsEditing(prev => ({ ...prev, email: !prev.email }))}
                            />
                        </div>
                    </div>

                    <div className="profile-field">
                        <label>Password:</label>
                        <div className="editable-field">
                            {isEditing.password ? (
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>********</span>
                            )}
                            <FaPen
                                className="edit-icon"
                                onClick={() => setIsEditing(prev => ({ ...prev, password: !prev.password }))}
                            />
                        </div>
                    </div>

                    <button type="submit" className="save-button">
                        Save Changes
                    </button>
                </form>
                <button onClick={logout} className="logout-button">
                    Sign Out
                </button>
            </div>
            <Footer /> 
        </div>
    );
}

export default UserProfile;
