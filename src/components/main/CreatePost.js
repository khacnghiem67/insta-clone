import React, { useState } from 'react';
import { FaUserTag } from 'react-icons/fa';
import { GrEmoji } from 'react-icons/gr';
import { MdAddAPhoto } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase, { db, auth } from '../../firebase';
import CreatePostPopUp from './CreatePostPopUp';

function CreatePost() {
  const [popUp, setPopUp] = useState(false);
  const { id, display_name, full_name, photoUrl } = useSelector(
    (state) => state.auth
  );
  const name = full_name?.split(' ');

  const handleSubmit = (title, img) => {
    db.collection('posts')
      .add({
        title,
        img,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // like_number: 0,
        comment_number: 0,
        user_id: id,
        display_name,
        avatar: photoUrl,
        user_like: [],
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        setPopUp(!popUp);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };
  return (
    <CreatePostWrapper className='bg-white'>
      <CreatePostHeader className='d-flex align-items-center'>
        <Link to={`profile/${id}`}>
          <HeaderAvatar photoUrl={photoUrl}></HeaderAvatar>
        </Link>
        <HeaderInput className='flex-grow-1' onClick={() => setPopUp(!popUp)}>
          What's is on your mind,{name && name[name?.length - 1]} ?
        </HeaderInput>
      </CreatePostHeader>

      <hr />
      <CreatePostFooter className='d-flex align-items-center'>
        <AddPhoto
          className='postFooter__item d-flex align-items-center justify-content-center'
          onClick={() => setPopUp(!popUp)}
        >
          <MdAddAPhoto />
          Photo/Video
        </AddPhoto>

        <TagFriends
          className='postFooter__item d-flex align-items-center justify-content-center'
          onClick={() => setPopUp(!popUp)}
        >
          <FaUserTag />
          Tag friends
        </TagFriends>
        <FeelingAndActivity
          className='postFooter__item d-flex align-items-center justify-content-center'
          onClick={() => setPopUp(!popUp)}
        >
          <GrEmoji />
          Feeling/Activity
        </FeelingAndActivity>
      </CreatePostFooter>

      {popUp && (
        <CreatePostPopUp
          popUp={popUp}
          setPopUp={setPopUp}
          handleSubmit={handleSubmit}
        />
      )}
    </CreatePostWrapper>
  );
}

export default CreatePost;

const CreatePostWrapper = styled.div`
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 30px;
`;

const CreatePostHeader = styled.div``;

const HeaderAvatar = styled.div`
  position: relative;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};
`;

const HeaderInput = styled.div`
  background: #f0f2f5;
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #e2e2e2;
  }

  @media screen and (max-width: 360px) {
    & {
      text-align: center;
      font-size: 0.85rem;
    }
  }
`;

const CreatePostFooter = styled.ul`
  .postFooter__item {
    width: calc(100% / 3);
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding: 8px 0;
    &:hover {
      background: #f0f2f5;
    }
    svg {
      font-size: 1.8rem;
      margin-right: 5px;
    }
  }
  @media screen and (max-width: 500px) {
    & {
      flex-direction: column;
      .postFooter__item {
        width: 100%;
      }
    }
  }
`;

const AddPhoto = styled.li``;

const TagFriends = styled.li``;

const FeelingAndActivity = styled.li``;
