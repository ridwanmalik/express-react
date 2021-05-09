import React from 'react'
import { Redirect } from 'react-router-dom'
import AddPost from './AddPost'
import Posts from './Posts'
import ProfileInfo from './ProfileInfo'

const Profile = ({ isLogin, user, token, onLoad, setErrorPost, posts }) => {
  return (
    <section id="profile">
      {!isLogin && <Redirect to="/" />}
      <div className="container mt-4">
        {isLogin &&
          <>
            <ProfileInfo user={user} />
            <hr />
            <h5 className="ml-2 mb-3">Add Post</h5>
            <AddPost user={user} token={token} onLoad={onLoad} setErrorPost={setErrorPost} />
            <h5 className="ml-2 mb-3">All Post</h5>
            {posts.length !== 0 ?
              <Posts posts={posts} user={user} />
              : <p className="text-center text-muted">You Have No Post</p>
            }
          </>
        }
      </div>
    </section>
  )
}

export default Profile
