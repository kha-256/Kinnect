import "./profile.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { getUserByUsername } from "../../store/slices/PostUser";

export default function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) =>
    Object.values(state.postUser.postUser).find((u) => u.username === username)
  );

  useEffect(() => {
    if (username) {
      dispatch(getUserByUsername(username));
    }
  }, [dispatch, username]);

  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={`${PF}post/3.jpeg`} alt="" />
              <img
                className="profileUserImg"
                src={`${PF}${profileUser?.profilePicture || "person/7.jpeg"}`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser?.username || username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
