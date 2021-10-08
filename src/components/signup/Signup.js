import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import firebase, { auth, db, provider } from '../../firebase';
import { compressImage } from '../../index';

// export const handleLoginWithFb = () => {
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       console.log(result);
//       const cres = result.additionalUserInfo.profile;
//       const user = db.collection('users').doc(result.user.uid);
//       if (!user) {
//         user.set({
//           id: result.user.uid,
//           fullName: cres.first_name + ' ' + cres.last_name,
//           displayName: cres.name,
//           photoUrl: cres.picture.data.url,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         });
//       } else {
//         console.log('user exist');
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

function Signup() {
  const history = useHistory();
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [pseodoPhotoUrl, setPseodoPhotoUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [err, setErr] = useState('');
  const isValid =
    fullName === '' ||
    displayName === '' ||
    email === '' ||
    password === '' ||
    pseodoPhotoUrl === '' ||
    photoUrl === '';

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cres) => {
        db.collection('users').doc(cres.user.uid).set({
          full_name: fullName,
          display_name: displayName,
          photoUrl: photoUrl,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user_follower: [],
          user_following: [],
        });
        history.push('/');
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  return (
    <SignupWrapper className='d-flex align-items-center flex-column'>
      <ContenFirstSection>
        <ContenFirstSectionTitle>
          <h1>Instagram</h1>
          <p>Sign up to see photos and videos from your friends.</p>
        </ContenFirstSectionTitle>

        <ButtonLoginWithFacebook>Log in with facebook</ButtonLoginWithFacebook>
        <hr />
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <FormGroup onSubmit={handleSubmit}>
          <FormItem>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <InputText isExist={fullName}>Full Name</InputText>
          </FormItem>
          <FormItem>
            <input
              type='text'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <InputText isExist={displayName}>Display Name</InputText>
          </FormItem>
          <FormItem
            className='upload-avatar'
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            {pseodoPhotoUrl ? (
              <div className='limit-one-line'>{pseodoPhotoUrl}</div>
            ) : (
              'Upload Avatar'
            )}
            <input
              type='file'
              hidden
              value={pseodoPhotoUrl}
              accept='image/*'
              required
              onChange={(e) => {
                setPseodoPhotoUrl(e.target.value);
                if (e.target.files[0]) {
                  compressImage(e.target.files[0], setPhotoUrl);
                } else {
                  setPhotoUrl('');
                }
              }}
            />
          </FormItem>
          <FormItem>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputText isExist={email}>Email</InputText>
          </FormItem>
          <FormItem>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
            <InputText isExist={password}>Pass Word</InputText>
          </FormItem>

          <ButtonSignUp type='submit' disabled={isValid}>
            Sign Up
          </ButtonSignUp>
        </FormGroup>
        <PolicySignup>
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </PolicySignup>
      </ContenFirstSection>
      <ContentSecondSection>
        Have an account? <Link to='/'>Log in</Link>
      </ContentSecondSection>
      <ContentThirdSection>
        <ContentThirdSectionHeading>Get the app</ContentThirdSectionHeading>

        <AppsDownload>
          <Link to='/'>
            <img
              src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png'
              alt=''
            />
          </Link>
          <Link to='/'>
            <img
              src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png'
              alt=''
            />
          </Link>
        </AppsDownload>
      </ContentThirdSection>
      <ContentFourSection>© 2021 Instagram from Facebook</ContentFourSection>
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 0 10px;
`;

const ContenFirstSection = styled.div`
  max-width: 350px;
  background: #fff;
  border: 1px solid #dbdbdb;
  padding: 20px 30px;
  margin-bottom: 20px;
  hr {
    margin: 30px 0;
    position: relative;
    &::after {
      content: 'OR';
      position: absolute;
      padding: 5px 20px;
      background: #fff;
      top: 50%;
      left: 50%;
      color: #999;
      transform: translate(-50%, -50%);
    }
  }
`;

const ContenFirstSectionTitle = styled.div`
  h1 {
    font-family: 'Caveat', cursive;
    font-weight: 700;
  }
  p {
    color: #999;
    font-weight: 500;
    font-size: 1.1rem;
  }
`;

const ButtonLoginWithFacebook = styled.button`
  width: 100%;
  background: rgb(0, 149, 246);
  padding: 6px 0;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 500;

  &:hover {
    opacity: 0.7;
  }
`;

const FormGroup = styled.form`
  margin-bottom: 20px;
`;

const FormItem = styled.div`
  background: rgb(250, 250, 250);
  padding: 10px 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  font-size: 0.8rem;
  position: relative;
  margin-bottom: 10px;
  input {
    width: 100%;
    line-height: 1.3;
  }
  &.upload-avatar {
    text-align: left;
    cursor: pointer;
    input {
      cursor: pointer;
    }
  }
`;

const InputText = styled.div`
  position: absolute;
  left: 15px;
  font-size: ${(props) => (!props.isExist ? '0.75rem' : '0.65rem')};
  top: ${(props) => (!props.isExist ? '11px' : '-1px')};
  transition: all 0.1s linear;
  pointer-events: none;
`;

const UploadAvatar = styled.div`
  text-align: left;
`;

const ButtonSignUp = styled(ButtonLoginWithFacebook)`
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const PolicySignup = styled.div`
  font-size: 0.75rem;
`;

const ContentSecondSection = styled.div`
  max-width: 350px;
  width: 100%;
  padding: 20px 0;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;
  a {
    color: rgb(0, 178, 249);
  }
`;

const ContentThirdSection = styled.div`
  margin-bottom: 20px;
`;

const ContentThirdSectionHeading = styled.div`
  margin-bottom: 20px;
`;

const AppsDownload = styled.div`
  a + a {
    margin-left: 10px;
  }
  img {
    width: 150px;
  }
  @media screen and (max-width: 350px) {
    img {
      width: 90px;
    }
  }
`;

const ContentFourSection = styled.div`
  margin-bottom: 30px;
  color: #999;
  font-size: 0.8rem;
`;
