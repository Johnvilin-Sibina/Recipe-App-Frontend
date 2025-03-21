import React, { useEffect, useState } from "react";
import { FaUserEdit, FaHeart, FaShare, FaEnvelope, FaCamera } from "react-icons/fa";
import "../CSS/UserProfile.css"; 
import { useSelector } from "react-redux";
import axios from "axios";

const UserProfile = () => {

    const[sharedRecipes,setSharedRecipes] = useState([])

    const {currentUser} = useSelector((state)=>state.user)
    console.log(currentUser)

    const fetchSharedRecipes = async()=>{
        try {
            await axios.get(`http://localhost:5000/api/user/shared-recipes/${currentUser.rest._id}`,
                {
                    headers:{
                        'token':localStorage.getItem('Token')
                    }
                }
            )
            .then((res)=>{
                setSharedRecipes(res.data.sharedRecipes)
                console.log(res.data.sharedRecipes)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchSharedRecipes()
    },[currentUser])


    return (
        <div className="profile-container">
            <div className="profile-card shadow-lg">
                {/* Profile Section */}
                <div className="profile-header text-center">
                    <div className="profile-img-container">
                        <img src={currentUser.rest.profilePicture} alt="Profile" className="profile-img" />
                        <button className="edit-photo-btn">
                            <FaCamera />
                        </button>
                    </div>
                    <h3 className="mt-3">{currentUser.rest.userName}</h3>
                    <p><FaEnvelope className="icon" /> {currentUser.rest.email}</p>
                </div>

                {/* Shared Recipes */}
                <div className="shared-section">
                    <h5><FaShare className="share-icon" size={27} /> Shared Recipes</h5>
                    <ul className="shared-recipes">
                       {sharedRecipes?.map((recipe)=>(
                        <li>{recipe.title}</li>
                       ))}
                    </ul>
                </div>

                {/* Edit Button */}
                <div className="text-center mt-3">
                    <button className="btn btn-primary">
                        <FaUserEdit /> Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
