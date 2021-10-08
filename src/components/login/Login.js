import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const isValid = email === '' || password === '';
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  return (
    <LoginWrapper className='d-flex justify-content-center'>
      <LoginBackgroundSlider className='d-none d-lg-block'></LoginBackgroundSlider>
      <LoginContent>
        <ContenFirstSection>
          <ContenFirstSectionTitle>Instagram</ContenFirstSectionTitle>

          {err && <p style={{ color: 'red', fontSize: '0.95rem' }}>{err}</p>}
          <FormGroup onSubmit={handleSubmit}>
            <FormItem>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputText isExist={email}>Email</InputText>
            </FormItem>

            <FormItem>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
              />
              <InputText isExist={password}>Password</InputText>
            </FormItem>
            <ButtonLogin type='submit' disabled={isValid}>
              Log In
            </ButtonLogin>
          </FormGroup>
          <hr />
          <ButtonLoginWithFacebook>
            Log in with Facebook
          </ButtonLoginWithFacebook>
        </ContenFirstSection>
        <ContentSecondSection>
          Don't have an account? <Link to='signup'>Sign up</Link>
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
      </LoginContent>
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div`
  margin-top: 50px;
  text-align: center;
  padding: 0 10px;
`;

const LoginBackgroundSlider = styled.div`
  position: relative;
  width: 500px;
  background: url('/img/iphone-with-profile.jpg') no-repeat top center / contain;
`;

const LoginContent = styled.div`
  margin-top: 30px;
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

const ContenFirstSectionTitle = styled.h1`
  font-family: 'Caveat', cursive;
  font-weight: 700;
  margin-bottom: 30px;
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
`;

const InputText = styled.div`
  position: absolute;
  left: 15px;
  font-size: ${(props) => (!props.isExist ? '0.75rem' : '0.65rem')};
  top: ${(props) => (!props.isExist ? '11px' : '-1px')};
  transition: all 0.1s linear;
  pointer-events: none;
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

const ButtonLogin = styled(ButtonLoginWithFacebook)`
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
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

// const ContentThirdSection = styled.div`
//   margin-bottom: 20px;
//   .app-group {
//     a + a {
//       margin-left: 10px;
//     }
//     img {
//       width: 150px;
//     }
//   }

//   @media screen and (max-width: 350px) {
//     .app-group {
//       img {
//         width: 90px;
//       }
//     }
//   }
// `;
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
