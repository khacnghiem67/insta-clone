import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import { handleUserLike } from './Posts';

const fetchMeComment = (post_id, id, setMeComment) => {
  db.collection('posts')
    .doc(post_id)
    .collection('user_comment')
    .where('user_id', '==', id)
    .orderBy('timestamp')
    .onSnapshot(
      (querySnapshot) => {
        setMeComment(
          querySnapshot.docs.map((query) => {
            const { user_id, display_name, content } = query.data();
            return { user_id, display_name, content };
          })
        );
      },
      (err) => {
        console.log(err.message);
      }
    );
};

function Post({ post }) {
  const {
    display_name: meName,
    photoUrl: mePhoto,
    id,
  } = useSelector((state) => state.auth);

  const [content, setContent] = useState('');
  const [meComment, setMeComment] = useState('');
  const {
    img,
    isLike,
    user_id,
    title,
    display_name,
    avatar,
    user_like,
    post_id,
  } = post;

  useEffect(() => {
    fetchMeComment(post_id, id, setMeComment);

    return () => {
      setMeComment('');
      setContent('');
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setContent('');
    const useRef = db.collection('posts').doc(post_id);
    Promise.all(
      [
        useRef.collection('user_comment').add({
          user_id: id,
          display_name: meName,
          photoUrl: mePhoto,
          content: content,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }),
      ],
      useRef.update({
        comment_number: firebase.firestore.FieldValue.increment(1),
      })
    );
  };

  return (
    <PostWrapper>
      <PostHeader className='d-flex justify-content-between align-items-center bg-white'>
        <PostUser className='d-flex align-items-center'>
          <Link to={`profile/${user_id}`}>
            <PostUserAvatar photoUrl={avatar}></PostUserAvatar>
          </Link>
          <PostUserName>
            <Link to={`profile/${user_id}`}>{display_name}</Link>
          </PostUserName>
        </PostUser>

        <PostOption>...</PostOption>
      </PostHeader>

      <PostImage>
        <img src={img} alt='' />
      </PostImage>

      <PostCommentAndOthers className='bg-white'>
        <PostOptions className='d-flex align-items-center'>
          <OptionsItem
            onClick={() => {
              handleUserLike(post_id, id);
            }}
          >
            {isLike ? (
              <AiFillHeart style={{ color: 'rgb(237,73,86)' }} />
            ) : (
              <AiOutlineHeart style={{ color: '#333' }} />
            )}
          </OptionsItem>
          {/* <OptionsItem>
            <FiSend />
          </OptionsItem>
          <OptionsItem className='ml-auto'>
            <AiOutlineSave />
          </OptionsItem> */}
        </PostOptions>
        <PostLike className='d-flex align-items-center'>
          {user_like.length} {user_like.length > 1 ? 'likes' : 'like'}
          {/* <Link to='/' className='post__likes'></Link> */}
        </PostLike>

        <PostTitle className='limit-one-line'>
          <Link to={`profile/${user_id}`} className='post__title-name'>
            {display_name}
          </Link>
          {title}
        </PostTitle>

        <PostDetails>
          <Link to={`/post/${post_id}`}>Post Details</Link>
        </PostDetails>
        <PostComments>
          {meComment &&
            meComment.map((cmt, index) => (
              <Comment className='limit-two-line' key={index}>
                <Link
                  to={`profile/${cmt.user_id}`}
                  className='post__title-name'
                >
                  {cmt.display_name}
                </Link>
                <span>{cmt.content}</span>
              </Comment>
            ))}
        </PostComments>
      </PostCommentAndOthers>

      <PostCreateComment className='d-flex align-items-center'>
        <GrEmoji />
        <form className='d-flex align-items-center' onSubmit={handleSubmit}>
          <input
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Add a comment'
          />

          <AddButton disabled={!content}>Post</AddButton>
        </form>
      </PostCreateComment>
    </PostWrapper>
  );
}

export default Post;

const PostWrapper = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin-bottom: 30px;
`;

const PostHeader = styled.div`
  padding: 15px;
`;

const PostUser = styled.div`
  .post__avatar {
    margin-right: 10px;
    img {
      width: 30px;
      height: 30xp;
      border-radius: 50%;
      object-fit: contain;
    }
  }
  .post__name {
    font-weight: 500;
    font-size: 0.9rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PostUserAvatar = styled.div`
  position: relative;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};
`;

const PostUserName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const PostOption = styled.div`
  font-size: 1.3rem;
  cursor: pointer;
`;

const PostImage = styled.div`
  padding: 1px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const PostCommentAndOthers = styled.div`
  padding: 10px 15px;
`;

const PostOptions = styled.ul``;

const OptionsItem = styled.li`
  cursor: pointer;
  &:not(last-child) {
    margin-right: 10px;
  }

  svg {
    font-size: 1.6rem;
  }
`;

const PostLike = styled.div`
  font-weight: 500;
`;

const PostDetails = styled.div`
  a {
    color: #999;
    font-size: 0.95rem;
  }
`;

const PostTitle = styled.div`
  font-size: 0.9rem;
  a {
    font-weight: 500;
    margin-right: 5px;
  }
  @media screen and (max-width: 576px) {
    & {
      font-size: 0.8rem;
    }
  }
`;

const PostComments = styled.div``;

const Comment = styled(PostTitle)``;

const PostCreateComment = styled.div`
  height: 60px;
  background: #fff;
  border-top: 1px solid #dbdbdb;
  padding: 7px 20px;
  svg {
    font-size: 1.6rem;
    margin-right: 10px;
  }
  form {
    flex: 1;
    input {
      flex: 1;
    }
  }

  @media screen and (max-width: 360px) {
    & {
      padding: 7px 10px;
      svg {
        font-size: 1.3rem;
      }
      input::placeholder {
        font-size: 0.8rem;
      }
      span {
        font-size: 0.8rem;
      }
    }
  }
`;

const AddButton = styled.button`
  font-size: 0.95rem;
  color: rgb(0, 149, 246);
  font-weight: 500;
  padding: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;
