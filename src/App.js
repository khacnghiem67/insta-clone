import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import ProfileDetails from './components/profile/ProfileDetails';
import Signup from './components/signup/Signup';
import useAuthListener from './hooks/useAuthListener';
import NotFound from './NotFound';
import Wrapper from './Wrapper';

function App() {
  const { user } = useAuthListener();
  const { is_loading } = useSelector((state) => state.auth);
  const is_user = localStorage.getItem('is_user') || '';

  if (!is_user)
    return (
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    );
  return (
    <div className='app'>
      {is_loading ? (
        <DisplayLoading>
          <FiInstagram />
        </DisplayLoading>
      ) : (
        <>
          <Header />
          <Switch>
            <Route exact path={['/', '/post/*']}>
              <Wrapper />
            </Route>
            <Route path='/profile/:profileId'>
              <ProfileDetails />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

export const DisplayLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background: #dbdbdb;
  display: grid;
  place-items: center;
  svg {
    font-size: 3rem;
    color: #999;
  }
`;

export default App;
