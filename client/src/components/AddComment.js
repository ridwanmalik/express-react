import { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'

const AddComment = ({ user, token, addComment }) => {
  const [comment, setComment] = useState('')
  const [errorComment, setErrorComment] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    //Validation
    if (!comment) {
      setErrorComment(true)
      return
    } else {
      setErrorComment(false)
    }
    const data = {
      body: comment,
      userId: user.id
    }
    addComment(data)
    setComment('')
  }
  return (
    <div className="d-flex mb-3">
      <BiUserCircle className="user-icon" />
      <div className="ml-2 bg-light px-3 py-2 rounded flex-grow-1">
        <h6 className="">{`${user.firstName} ${user.lastName}`}</h6>
        <div className="d-flex justify-content-between">
        </div>
        <form onSubmit={onSubmit}>
          <div className="d-flex">
            <input type="text" className={errorComment ? "form-control is-invalid" : "form-control"} id="comment" name="body" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add Comment" />
            <button type="submit" className="btn btn-primary ml-3">Comment</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddComment
