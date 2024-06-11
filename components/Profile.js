import React from 'react';
// import Button from 'react-bootstrap/Button'; // TODO: Uncomment if you decide to put the sign out button back on the user page
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function User() {
  const { user } = useAuth();
  return (
    <>
      <div className="profile-container">
        <div className="text-center my-4">
          <img src={user.photoURL} alt={user.displayName} style={{ borderRadius: '50%', width: 175, height: 175 }} />
        </div>
        <div className="text-center my-4">
          <span><h1>Hello {user.displayName}! </h1><p>{user.email}</p></span>
          {/* SIGN OUT BUTTON. ONLY COMMENT BACK IN IF YOU WANT IT ON THE USER PAGE */}
          {/* <Button variant="danger" onClick={signOut} className="m-2" style={{ width: 100, height: 50 }}>
            SIGN OUT
          </Button> */}
        </div>
      </div>
    </>
  );
}

export default User;
