import { useState } from 'react'
import { useLocation } from "react-router-dom";
import Post from "./Post";

const Posts = ({ posts, user }) => {
  const [totalPost, setTotalPost] = useState(10)
  let postCount = 1
  const location = useLocation()
  return (
    <div className="post-list-group list-group mb-5">
      {posts.map((post) => {
        if (location.pathname === "/profile") {
          if (post.user.id !== user.id) {
            return null
          }
        } else {
          if (postCount > totalPost) {
            return null
          }
          postCount++
        }
        return (<Post key={post.id} post={post} />)
      })}

      { location.pathname !== "/profile" ? posts.length > totalPost &&
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-light shadow-sm ml-3" onClick={(e) => setTotalPost(totalPost + 10)}>Load More</button>
        </div> : null
      }
    </div>
  );
};

export default Posts;
