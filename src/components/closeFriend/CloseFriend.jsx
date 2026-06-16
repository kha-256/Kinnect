import "./closeFriend.css";



export default function CloseFriend({user}) {

    const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
    return (
    <li className="sidebarFriendListItems">
<img className="sidebarFriendImg" src={`${PF}${user.profilePicture}`} alt="friend Image"/>
<span className="sidebarFriendName">{user.username}</span>

</li>
   
    );
}
