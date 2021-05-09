import React from 'react'
import { Redirect } from 'react-router'

const Users = ({ isLogin, users }) => {
  return (
    <section id="users">
      {!isLogin && <Redirect to="/" />}
      <div className="container mt-4">

        <h3 className="mb-3">All Users</h3>

        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Website</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <>
                <tr className="table-light shadow-sm mb-5">
                  <th scope="row">{index + 1}</th>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                </tr>
                <tr >
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>


      </div>
    </section>
  )
}

export default Users
