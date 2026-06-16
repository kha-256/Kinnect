import "./Post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export default function Post({ post, user }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  if (!user) return null;

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={`${PF}${user.profilePicture || "person/Default_Profile_Picture.jpg"}`}
              alt=""
            />
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          {post.desc && <span className="postText">{post.desc}</span>}
          <img className="postImg" src={`${PF}${post.photo}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler} />
            <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
