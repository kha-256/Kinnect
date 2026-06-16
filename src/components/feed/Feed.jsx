import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { getTimelinePost, getProfilePosts } from "../../store/slices/PostSlice";
import { getUser } from "../../store/slices/PostUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Feed({ username }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const users = useSelector((state) => state.postUser.postUser);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    if (username) {
      dispatch(getProfilePosts(username));
    } else {
      dispatch(getTimelinePost());
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (posts?.length) {
      posts.forEach((post) => {
        dispatch(getUser(post.userId));
      });
    }
  }, [dispatch, posts]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
      </div>
      {loading && <span className="feedLoading">Loading posts...</span>}
      {posts?.map((post) => (
        <Post key={post.id} post={post} user={users[post.userId]} />
      ))}
    </div>
  );
}
