import moment from "moment";
import { BiUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`} className="post-list-group-item list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between mb-3">
        <h4 className="mb-0">{post.postTitle}</h4>
        <div className="post-profile d-flex">
          <div className="d-flex flex-column align-items-end mr-2">
            <h6 className="mb-0">{`${post.user.firstName} ${post.user.lastName}`}</h6>
            <small>{moment(post.createdAt).fromNow()}</small>
          </div>
          <BiUserCircle className="user-icon" />
        </div>
      </div>
      <p className="">{post.postDesc}</p>
    </Link>
  )
}

export default Post
