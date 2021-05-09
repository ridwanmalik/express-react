import { useState } from "react"

const AddPost = ({ user, token, onLoad, setErrorPost }) => {
  const [postTitle, setPostTitle] = useState('')
  const [postDesc, setPostDesc] = useState('')
  const [postStatus, setPostStatus] = useState('')
  const [postExpirationDate, setPostExpirationDate] = useState('')
  const [errorPostTitle, setErrorPostTitle] = useState(false)
  const [errorPostDesc, setErrorPostDesc] = useState(false)
  const [errorPostStatus, setErrorPostStatus] = useState(false)
  const [errorPostExpirationDate, setErrorPostExpirationDate] = useState(false)
  const addPost = async (e) => {
    e.preventDefault()
    //Validation
    if (!postTitle) {
      setErrorPostTitle(true)
      return
    } else {
      setErrorPostTitle(false)
    }
    if (!postDesc) {
      setErrorPostDesc(true)
      return
    } else {
      setErrorPostDesc(false)
    }
    if (!postStatus) {
      setErrorPostStatus(true)
      return
    } else {
      setErrorPostStatus(false)
    }
    if (!postExpirationDate) {
      setErrorPostExpirationDate(true)
      return
    } else {
      setErrorPostExpirationDate(false)
    }
    const bodyData = {
      postTitle,
      postDesc,
      postStatus,
      postExpirationDate,
      userId: user.id
    }
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    if (data.success) {
      setPostTitle('')
      setPostDesc('')
      setPostStatus('')
      setPostExpirationDate('')
      onLoad()
    } else {
      setErrorPost(data.msg)
    }
  }

  return (
    <div className="add-post">
      <form className="mt-2" onSubmit={addPost}>
        <div className="form-group">
          <input type="text" className={errorPostTitle ? "form-control is-invalid" : "form-control"} id="postTitle" name="postTitle" placeholder="Post Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} aria-describedby="postTitleFeedback" />
          <div id="postTitleFeedback" className="invalid-feedback">
            Please Provide Your Post Title.
          </div>
        </div>
        <div className="form-group">
          <textarea className={errorPostDesc ? "form-control is-invalid" : "form-control"} id="postDesc" name="postDesc" placeholder="Post Description" value={postDesc} onChange={(e) => setPostDesc(e.target.value)} aria-describedby="postDescFeedback"></textarea>
          <div id="postDescFeedback" className="invalid-feedback">
            Please Provide Your Post Description.
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <select className={errorPostStatus ? "form-control is-invalid" : "form-control"} id="postStatus" name="postStatus" value={postStatus} onChange={(e) => setPostStatus(e.target.value)} aria-describedby="postStatusFeedback">
              <option value="">Post Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div id="postStatusFeedback" className="invalid-feedback">
              Please Provide Your Post Status.
            </div>
          </div>
          <div className="form-group col-md-6">
            <div className="d-flex align-items-start">
              <div className="flex-grow-1">
                <input type="date" className={errorPostExpirationDate ? "form-control is-invalid" : "form-control"} id="postExpirationDate" name="postExpirationDate" placeholder="Post Expiration Date" value={postExpirationDate} onChange={(e) => setPostExpirationDate(e.target.value)} aria-describedby="postExpirationDateFeedback" />
                <div id="postExpirationDateFeedback" className="invalid-feedback">
                  Please Provide Your Post Expiration Date.
                </div>
              </div>
              <button type="submit" className="btn btn-primary ml-3">Post</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPost
