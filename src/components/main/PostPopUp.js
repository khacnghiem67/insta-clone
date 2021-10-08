import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { MdClear } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import { handleUserLike } from './Posts';

const fetchDetailsPost = (postId, setPostDetails, id) => {
  db.collection('posts')
    .doc(postId)
    .onSnapshot((querySnapshot) => {
      const isLike = querySnapshot.data().user_like.some((x) => x === id);
      setPostDetails({ isLike, ...querySnapshot.data() });
    });
};

const fetchCommentsPost = (postId, setComments) => {
  db.collection('posts')
    .doc(postId)
    .collection('user_comment')
    .orderBy('timestamp')
    .onSnapshot((querySnapshot) => {
      setComments(
        querySnapshot.docs.map((query) => {
          return {
            ...query.data(),
          };
        })
      );
    });
};

function PostPopUp() {
  const {
    display_name: meName,
    photoUrl: mePhoto,
    id,
  } = useSelector((state) => state.auth);
  const history = useHistory();
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState('');
  const [comments, setComments] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    fetchDetailsPost(postId, setPostDetails, id);
    fetchCommentsPost(postId, setComments);
    return () => {
      document.querySelector('body').style.overflow = 'auto';
      setComments(null);
      setPostDetails(null);
      setContent(null);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent('');
    db.collection('posts')
      .doc(postId)
      .collection('user_comment')
      .add({
        user_id: id,
        display_name: meName,
        photoUrl: mePhoto,
        content: content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {});
  };
  return (
    <PostPopUpWrapper className='d-flex align-center justify-content-center'>
      {postDetails && comments && (
        <>
          <PostPopUpContent className='row'>
            <PopUpLeft className='col-6 col-md-7 p-0'>
              <img src={postDetails.img} alt='' />
            </PopUpLeft>
            <PopUpRight className='col-6 col-md-5 p-0'>
              <Header className='d-flex align-items-center'>
                <UserOfPost className='d-flex align-items-center'>
                  <Link to={`/profile/${postDetails.user_id}`}>
                    <UserAvatar photoUrl={postDetails.avatar}></UserAvatar>
                  </Link>
                  <UserName>
                    <Link to={`/profile/${postDetails.user_id}`}>
                      {postDetails.display_name}
                    </Link>
                  </UserName>
                </UserOfPost>
                <UserOption className='ml-auto'>...</UserOption>
              </Header>
              <PeopleComment>
                <Title className='d-flex'>
                  <Link to={`/profile/${postDetails.user_id}`}>
                    <UserAvatar photoUrl={postDetails.avatar}></UserAvatar>
                  </Link>
                  <UserNameAndContent>
                    <Link to={`/profile/${postDetails.user_id}`}>
                      {postDetails.display_name}
                    </Link>
                    {postDetails.title}
                  </UserNameAndContent>
                </Title>
                {comments &&
                  comments.map((cmt, index) => (
                    <Comment className='d-flex' key={index}>
                      <Link to={`/profile/${cmt.user_id}`}>
                        <UserAvatar photoUrl={cmt.photoUrl}></UserAvatar>
                      </Link>
                      <UserNameAndContent>
                        <Link to={`/profile/${cmt.user_id}`}>
                          {cmt.display_name}
                        </Link>
                        {cmt.content}
                      </UserNameAndContent>
                    </Comment>
                  ))}
              </PeopleComment>
              <Options>
                <LikeAndOther onClick={() => handleUserLike(postId, id)}>
                  {postDetails.isLike ? (
                    <AiFillHeart style={{ color: 'rgb(237,73,86)' }} />
                  ) : (
                    <AiOutlineHeart style={{ color: '#333' }} />
                  )}
                </LikeAndOther>
                <LikeNumber>
                  {postDetails.user_like.length}
                  {postDetails.user_like.length > 1 ? ' likes' : ' like'}
                </LikeNumber>
              </Options>

              <AddComment className='d-flex align-items-center'>
                <AddEmoji>
                  <GrEmoji />
                </AddEmoji>
                <form
                  className='d-flex align-items-center'
                  onSubmit={handleSubmit}
                >
                  <AddInput>
                    <input
                      type='text'
                      value={content}
                      placeholder='Add a comment'
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </AddInput>
                  <AddButton className='ml-auto' disabled={!content}>
                    Post
                  </AddButton>
                </form>
              </AddComment>
            </PopUpRight>
          </PostPopUpContent>
          <PostPopUpClear
            onClick={() => {
              history.go(-1);
            }}
          >
            <MdClear />
          </PostPopUpClear>
        </>
      )}
    </PostPopUpWrapper>
  );
}

export default PostPopUp;

const PostPopUpWrapper = styled.div`
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  background: rgba(109, 96, 96, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
  top: 0;
  left: 0;
`;

const PostPopUpContent = styled.div`
  max-width: 817px;
  height: 600px;
  width: 100%;
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 20%);

  @media screen and (max-width: 850px) {
    margin: 5vh 15px;
  }
`;

const PopUpLeft = styled.div`
  height: 100%;
  background: rgba(169, 161, 161, 0.8);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const PopUpRight = styled.div`
  background: #ffffff;
  height: 100%;
`;

const Header = styled.div`
  height: 10%;
  padding: 10px;
  border-bottom: 1px solid #dbdbdb;
`;

const UserOfPost = styled.div``;

const UserAvatar = styled.div`
  position: relative;
  margin-right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #999;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};

  @media screen and (max-width: 576px) {
    & {
      width: 25px;
      height: 25px;
    }
  }
`;

const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const UserOption = styled.div`
  cursor: pointer;
  font-weight: bold;
  cursor: pointer;
`;

const PeopleComment = styled(Header)`
  height: 65%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Comment = styled.div`
  margin-bottom: 20px;
`;

const Title = styled(Comment)``;

const UserNameAndContent = styled(UserName)`
  font-weight: normal;
  line-height: 1.3;
  a {
    font-weight: 500;
    margin-right: 8px;
  }

  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const Options = styled(Header)`
  height: 15%;
`;

const LikeAndOther = styled.div`
  margin-bottom: 5px;
  display: inline-block;
  svg {
    cursor: pointer;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 576px) {
    svg {
      font-size: 1rem;
    }
  }
`;

const LikeNumber = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const AddComment = styled(Header)`
  height: 10%;
  form {
    flex: 1;
  }
`;

const AddEmoji = styled.div`
  margin-right: 5px;
  svg {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 576px) {
    svg {
      display: none;
    }
  }
`;

const AddInput = styled.div`
  flex: 1;
  padding-right: 10px;
  font-size: 0.9rem;
  input {
    width: 100%;
  }
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const AddButton = styled.button`
  color: rgb(59, 174, 248);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: ${(props) => props.disabled && 'not-allowed'};
  opacity: ${(props) => props.disabled && '0.5'};
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const PostPopUpClear = styled.div`
  position: absolute;
  top: 1%;
  right: 5%;
  cursor: pointer;
  svg {
    font-size: 2.5rem;
    color: #fff;
  }
`;
