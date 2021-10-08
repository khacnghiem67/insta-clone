import React from 'react';
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import Main from './components/main/Main';
import PostPopUp from './components/main/PostPopUp';
import Sidebar from './components/sidebar/Sidebar';
function Wrapper() {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <div className='app__content row'>
        <div className='col-sm-10 col-md-8 mx-auto'>
          <Main />
        </div>
        <div className='col-lg-4 d-none d-lg-block'>
          <Sidebar />
        </div>
      </div>
      <Route path='/post/:postId'>
        <PostPopUp />
      </Route>
    </div>
  );
}

export default Wrapper;
