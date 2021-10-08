import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { db, auth } from '../../firebase';

function SidebarProfile({ isUser, userInfo }) {
  const { display_name, photoUrl, id, full_name } = userInfo;
  return (
    <Profile
      className='d-flex justify-content-between align-items-center'
      isUser={isUser}
    >
      <ProfileDetails className='d-flex justify-content-between align-items-center'>
        <Link to={`profile/${id}`}>
          <ProfileAvatar isUser={isUser} photoUrl={photoUrl}></ProfileAvatar>
        </Link>

        <ProfileText className='d-flex flex-column' isUser={isUser}>
          <TextName>
            <Link to={`profile/${id}`}>{display_name}</Link>
          </TextName>
          <TextOther>{full_name}</TextOther>
        </ProfileText>
      </ProfileDetails>
      <ProfileFunc to={`profile/${id}`}>View</ProfileFunc>
    </Profile>
  );
}

export default SidebarProfile;

const Profile = styled.div`
  margin-bottom: ${(props) => (props.isUser ? '0' : '15px')};
`;

const ProfileDetails = styled.div``;

const ProfileAvatar = styled.div`
  position: relative;
  margin-right: 15px;
  width: ${(props) => (props.isUser ? '58px' : '32px')};
  height: ${(props) => (props.isUser ? '58px' : '32px')};
  border-radius: 50%;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};
`;

const ProfileText = styled.div`
  font-size: ${(props) => (props.isUser ? '0.9rem' : '0.75rem')};
`;

const TextName = styled.div`
  a {
    font-weight: 500;
  }
`;

const TextOther = styled.div`
  color: #999;
`;

const ProfileFunc = styled(Link)`
  font-size: 0.8rem;
  color: rgb(0, 149, 246);
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: none;
  }
`;
