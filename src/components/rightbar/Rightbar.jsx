import "./rightbar.css";
import { useSelector } from "react-redux";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
  const allUsers = useSelector((state) => state.postUser.allUsers);
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const HomeRightbar = () => (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Rameesha Khan</b> and <b>2 others</b> have birthday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {allUsers.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </>
  );

  const ProfileRightbar = () => (
    <>
      <h4 className="RightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Country:</span>
          <span className="rightbarInfoValue">Pakistan</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">Karachi</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Age:</span>
          <span className="rightbarInfoValue">26</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {allUsers.slice(0, 6).map((u) => (
          <div key={u.id} className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={`${PF}${u.profilePicture}`} alt="" />
            <span className="rightbarFollowingName">{u.username}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{profile ? <ProfileRightbar /> : <HomeRightbar />}</div>
    </div>
  );
}
