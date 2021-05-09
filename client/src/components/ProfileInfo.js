import { BiEnvelope, BiGlobe, BiUserCircle } from 'react-icons/bi'

const ProfileInfo = ({ user }) => {
  return (
    <div className="my-3">
      <div className="d-flex mb-2">
        <BiUserCircle className="user-icon-profile" />
        <div>
          <h4 className="ml-2 mb-0">{`${user.firstName} ${user.lastName}`}</h4>
          <p className="mt-1 ml-2 mb-0 text-secondary">@{user.username}</p>
        </div>
      </div>
      <div className="d-flex mb-2">
        <BiEnvelope className="icon-nav mx-2" />
        <p className="ml-2 mb-0 pl-1">{user.email}</p>
      </div>
      { user.website &&
        <div className="d-flex mb-2">
          <BiGlobe className="icon-nav mx-2" />
          <p className="ml-2 mb-0 pl-1">{user.website}</p>
        </div>
      }
    </div>
  )
}

export default ProfileInfo
