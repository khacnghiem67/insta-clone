import React from 'react';
import { Route } from 'react-router-dom';
import CreatePost from './CreatePost';
import PostPopUp from './PostPopUp';
import Posts from './Posts';
import ShareStory from './ShareStory';
import { auth } from '../../firebase';

function Main() {
  return (
    <>
      <CreatePost />
      {/* <ShareStory /> */}
      <Posts />
      <Route path='/post/:postId'>
        <PostPopUp />
      </Route>
    </>
  );
}

export default Main;
