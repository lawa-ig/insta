import React from 'react';
import ProfilePanel from './ProfilePanel.jsx';
import PictureGrid from './PictureGrid.jsx';

const UserProfile = (props) => (

  <div>
    <ProfilePanel user={props.user} />
    <PictureGrid user={props.user} />
  </div>
    
);
  
export default UserProfile;