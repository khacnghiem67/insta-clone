import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { handleStateInfoUser } from '../../features/auth/authSlice';
import { useHistory } from 'react-router-dom';

function FaceBookLogin() {
  const history = useHistory();

  const dispatch = useDispatch();
  const [idUserFb, setIdUserFb] = useState('');
  const responseFacebook = (response) => {
    console.log(response);
    setIdUserFb(response.userID);
    db.collection('users')
      .doc(response.userID)
      .set({
        id: response.userID,
        displayName: response.name,
        photoUrl: response.picture.data.url,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Sign up success');
        dispatch(handleStateInfoUser('3040341689518677'));
        history.push('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <FaceBookLoginWrapper>
      <FacebookLogin
        appId='1172309336579244'
        fields='name,email,picture'
        scope='public_profile'
        textButton='Log in with Facebook'
        callback={responseFacebook}
      />
    </FaceBookLoginWrapper>
  );
}

export default FaceBookLogin;

const FaceBookLoginWrapper = styled.div`
  .kep-login-facebook {
    width: 100%;
    padding: 6px 0;
    border-radius: 5px !important;
    color: #ffffff;
    border: none;
    font-size: 0.9rem;
    &:hover {
      opacity: 0.7;
    }
  }
`;
