import React, { useEffect, useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';
import { VscDeviceCamera } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import PostPopUp from '../main/PostPopUp';

const fetchPosts = (profileId, setPosts) => {
  db.collection('posts')
    .where('user_id', '==', profileId)
    .orderBy('timestamp', 'desc')
    .onSnapshot((querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => {
          return { postId: doc.id, ...doc.data() };
        })
      );
    });
};

const fetchInfos = (profileId, auth_user, setUserInfo) => {
  if (profileId !== auth_user.id)
    db.collection('users')
      .doc(profileId)
      .onSnapshot((doc) => {
        const is_follow = doc
          .data()
          .user_follower.some((x) => x === auth_user.id);

        setUserInfo({ is_follow, ...doc.data() });
      });
  else setUserInfo(auth_user);
};

const handleUserFollow = async (user_id, meId) => {
  const ref = db.collection('users');
  const docs = await ref.doc(user_id).get();
  const is_exist = docs.data().user_follower.some((x) => x === meId);
  if (!is_exist) {
    Promise.all([
      ref.doc(user_id).update({
        user_follower: firebase.firestore.FieldValue.arrayUnion(meId),
      }),
      ref.doc(meId).update({
        user_following: firebase.firestore.FieldValue.arrayUnion(meId),
      }),
    ]);
  } else {
    const ref = db.collection('users');
    Promise.all([
      ref.doc(user_id).update({
        user_follower: firebase.firestore.FieldValue.arrayRemove(meId),
      }),
      ref.doc(meId).update({
        user_following: firebase.firestore.FieldValue.arrayRemove(meId),
      }),
    ]);
  }
};

function ProfileDetails() {
  const { profileId } = useParams();
  const [posts, setPosts] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const auth_user = useSelector((state) => state.auth);
  const { path, url } = useRouteMatch();

  useEffect(() => {
    Promise.all([
      fetchInfos(profileId, auth_user, setUserInfo),
      fetchPosts(profileId, setPosts),
    ]);

    return () => {
      setUserInfo(null);
      setPosts(null);
    };
  }, []);

  return (
    <ProfileDetailsWrapper>
      {userInfo && posts && (
        <>
          <ProfileDetailsHeader className='d-flex flex-column flex-md-row align-items-center'>
            <HeaderAvatar photoUrl={userInfo.photoUrl}></HeaderAvatar>
            <HeaderDetails>
              <NameAndOption className='d-flex flex-column flex-md-row align-items-center'>
                <Name>{userInfo.display_name}</Name>
                {profileId !== auth_user.id && (
                  <Options className='d-flex flex-column flex-md-row  align-items-center'>
                    {/* <OptionMessenger>Message</OptionMessenger> */}
                    <OptionFollow
                      is_follow={userInfo.is_follow}
                      onClick={() => handleUserFollow(profileId, auth_user.id)}
                    >
                      {userInfo.is_follow ? 'Unfollow' : 'Follow'}
                    </OptionFollow>
                  </Options>
                )}
              </NameAndOption>

              <Fields className='d-flex flex-column flex-md-row align-items-center'>
                <FieldItem>
                  <span>{posts.length}</span>{' '}
                  {posts.length >= 1 ? 'posts' : 'post'}
                </FieldItem>
                <FieldItem>
                  <span>{userInfo.user_follower.length}</span> followers
                </FieldItem>
                <FieldItem>
                  <span>{userInfo.user_following.length}</span> following
                </FieldItem>
              </Fields>
            </HeaderDetails>
          </ProfileDetailsHeader>
          <hr />
          <ProfileDetailsPost>
            <PostHeading>POSTS</PostHeading>
            {posts.length === 0 && (
              <NoPost className='d-flex flex-column align-items-center'>
                <VscDeviceCamera /> No Posts Yet
              </NoPost>
            )}

            <PostContainer className='row'>
              {posts &&
                posts.map((post, index) => (
                  <Post className='col-12 col-sm-6 col-md-4' key={index}>
                    <Link to={`${url}/post/${post.postId}`}>
                      <img src={post.img} alt='' />

                      <LikeAndComment className='post__liAndCo'>
                        <LikeBlock>
                          <BsFillHeartFill /> {post.user_like.length}
                        </LikeBlock>
                        <CommentBlock>
                          <FaCommentAlt /> {post.comment_number}
                        </CommentBlock>
                      </LikeAndComment>
                    </Link>
                  </Post>
                ))}
            </PostContainer>
          </ProfileDetailsPost>

          <AppDescription>© 2021 Instagram from Facebook</AppDescription>
        </>
      )}
      <Switch>
        <Route path={`${path}/post/:postId`}>
          <PostPopUp />
        </Route>
      </Switch>
    </ProfileDetailsWrapper>
  );
}

export default ProfileDetails;

const ProfileDetailsWrapper = styled.div`
  max-width: 945px;
  margin: 0 auto;
  padding: 0 15px;
  hr {
    margin: 30px 0 20px;
  }
`;

const ProfileDetailsHeader = styled.div`
  margin-left: 70px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const HeaderAvatar = styled.div`
  margin-right: 100px;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 80px;
    height: 80px;
  }
`;

const HeaderDetails = styled.div``;

const NameAndOption = styled.div`
  margin-bottom: 20px;
`;

const Name = styled.div`
  margin-right: 20px;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    font-size: 1.3rem;
  }
`;

const Options = styled.div``;

const OptionFollow = styled.button`
  background: ${(props) => (props.is_follow ? '#999' : 'rgb(0, 149, 246)')};
  padding: 5px 0;
  min-width: 100px;
  border-radius: 3px;
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 500;
`;
const OptionMessenger = styled(OptionFollow)`
  background: #ffffff;
  color: #333;
  border: 1px solid #dbdbdb;
  padding: 3px 10px;
  margin-right: 10px;
  @media screen and (max-width: 768px) {
    margin-right: 0;

    margin-bottom: 20px;
  }
`;

const Fields = styled.div``;

const FieldItem = styled.div`
  margin-right: 40px;
  span {
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    margin-right: 0;
    span {
      font-size: 0.9rem;
    }
  }
`;

const ProfileDetailsPost = styled.div`
  margin-bottom: 30px;
`;

const PostHeading = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 500;
`;

const NoPost = styled.div`
  font-size: 1.5rem;
  color: #999;
  svg {
    font-size: 4rem;
  }
`;
const PostContainer = styled.div``;

const Post = styled.div`
  margin-bottom: 20px;
  a {
    position: relative;
    background: rgb(169 161 161 / 10%);
    height: 100%;
    display: block;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      mix-blend-mode: multiply;
    }
    &::before {
      display: none;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgb(0, 0, 0, 0.5);
    }
    &:hover {
      &::before {
        display: block;
      }
      .post__liAndCo {
        display: flex;
      }
    }
  }
`;

const PostBlock = styled.div`
  position: relative;
  background: rgb(169 161 161 / 10%);
  height: 100%;
  display: block;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
  }
  &::before {
    display: none;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(0, 0, 0, 0.5);
  }
  &:hover {
    &::before {
      display: block;
    }
    .post__liAndCo {
      display: flex;
    }
  }
`;

const LikeAndComment = styled.div`
  display: none;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
`;

const LikeBlock = styled.div`
  margin-right: 30px;
`;

const CommentBlock = styled.div``;

const AppDescription = styled.div`
  color: #999;
  text-align: center;
  margin-bottom: 30px;
  font-size: 0.8rem;
`;
