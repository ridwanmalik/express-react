import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link, Redirect, useParams } from 'react-router-dom'
import { BiPencil, BiTrash, BiUserCircle } from "react-icons/bi";
import moment from "moment";
import Comments from '../Comments';
import AddComment from './AddComment';

const ShowPost = ({ isLogin, user, token, fetchPost, fetchPostComments, onDelete }) => {
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [postUser, setPostUser] = useState([])
  let { id } = useParams()
  const [Id, setId] = useState(id)
  let history = useHistory()


  const addComment = async (comment) => {
    //Fetch Auth Data
    const response = await fetch(`/api/posts/${Id}/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(comment)
    })
    const data = await response.json()
    if (data.success) {
      await loadComments(Id)
    }
  }
  const loadComments = async (id) => {
    const postCommentsFormServer = await fetchPostComments(id)
    setComments(postCommentsFormServer)
  }

  useEffect(() => {
    const getPost = async () => {
      const postFormServer = await fetchPost(Id)
      if (!postFormServer) {
        history.goBack()
      } else {
        setPost(postFormServer)
        setPostUser(postFormServer.user)
        loadComments(Id)
      }
      return postFormServer
    }
    getPost()
  }, [onDelete])


  return (
    <section id="showPost">
      {!isLogin && <Redirect to="/" />}
      <div className="container mt-4">
        {isLogin &&
          <div className="post-list-group-item list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between mb-3">
              <h4 className="mb-0">{post.postTitle}</h4>
              <div className="d-flex">
                <BiUserCircle className="user-icon" />
                <div className="ml-2">
                  <h6 className="mb-0">{`${postUser.firstName} ${postUser.lastName}`}</h6>
                  <small className="d-block">{moment(post.createdAt).fromNow()}</small>
                  {postUser.id === user.id &&
                    <>
                      <Link to={`/posts/${post.id}/edit`} className="btn btn-info mt-2">
                        <BiPencil className="icon-btn" />
                      </Link>
                      <button className="btn btn-danger mt-2 ml-2" onClick={() => onDelete(post.id)}>
                        <BiTrash className="icon-btn" />
                      </button>
                    </>
                  }
                </div>
              </div>
            </div>
            <p className="">{post.postDesc}</p>
            <hr className="mx-5" />
            <AddComment user={user} token={token} addComment={addComment} />
            <Comments comments={comments} />
          </div>
        }
      </div>
    </section>
  )
}

export default ShowPost
