import React, { useEffect, useState } from 'react';
import { VscDeviceCamera } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import Post from './Post';

export const handleUserLike = async (postId, meId) => {
  // const docs = await db
  //   .collection('posts')
  //   .where('user_like', 'array-contains', meId)
  //   .get();
  // const ref = db.collection('posts').doc(postId);

  // if (docs.size == 0) {
  //   await ref.update({
  //     user_like: firebase.firestore.FieldValue.arrayUnion(meId),
  //   });
  // } else {
  //   ref.update({
  //     user_like: firebase.firestore.FieldValue.arrayRemove(meId),
  //   });
  // }
  const ref = db.collection('posts');
  const docs = await ref.doc(postId).get();
  const is_exist = docs.data().user_like.some((x) => x === meId);
  if (!is_exist) {
    ref.doc(postId).update({
      user_like: firebase.firestore.FieldValue.arrayUnion(meId),
    });
  } else {
    ref.doc(postId).update({
      user_like: firebase.firestore.FieldValue.arrayRemove(meId),
    });
  }
};

function Posts() {
  const [posts, setPosts] = useState(null);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((query) => {
            const isLike = query.data().user_like.some((x) => x === id);
            return {
              isLike,
              post_id: query.id,
              ...query.data(),
            };
          })
        );
      });
    return () => {
      setPosts(null);
    };
  }, [id]);
  return (
    <PostsWrapper>
      {posts?.length > 0 ? (
        posts.map((post) => <Post key={post.post_id} post={post} />)
      ) : (
        <NoPost className='d-flex flex-column align-items-center'>
          <VscDeviceCamera />
          Create Post Or Wait People UpLoad To See Posts
        </NoPost>
      )}
    </PostsWrapper>
  );
}

export default Posts;

const PostsWrapper = styled.div``;

const NoPost = styled.div`
  font-size: 1.5rem;
  color: #999;
  text-align: center;
  svg {
    font-size: 5rem;
  }
`;
