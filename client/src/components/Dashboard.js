import AddPost from './AddPost';
import Posts from './Posts'

const Dashboard = ({ user, token, posts, onLoad, errorPost, setErrorPost }) => {

  return (
    <section id="dashboard">
      <div className="container mt-4">
        {errorPost &&
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorPost}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setErrorPost(null)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        <h5 className="ml-2 mb-3">Add Post</h5>
        <AddPost user={user} token={token} onLoad={onLoad} setErrorPost={setErrorPost} />
        <h5 className="ml-2 mb-3">All Post</h5>
        {posts !== 0 ?
          <Posts posts={posts} user={user} />
          : <p className="text-center text-muted">No Post To Show</p>
        }
      </div>
    </section>
  );
};

export default Dashboard;
