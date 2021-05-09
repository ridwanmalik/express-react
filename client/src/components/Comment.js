import moment from "moment";
import { BiUserCircle } from "react-icons/bi";

const Comment = ({ comment }) => {
  return (
    <div className="comment d-flex mb-3">
      <BiUserCircle className="user-icon" />
      <div className="ml-2 bg-light px-3 py-2 rounded flex-grow-1">
        <div className="d-flex justify-content-between">
          <h6 className="mb-0">{`${comment.user.firstName} ${comment.user.lastName}`}</h6>
          <small>{moment(comment.createdAt).fromNow()}</small>
        </div>
        <p className="mb-0">{comment.body}</p>
      </div>
    </div>
  )
}

export default Comment
