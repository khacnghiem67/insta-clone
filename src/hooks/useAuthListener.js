import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleStateInfoUser } from '../features/auth/authSlice';
import { auth } from '../firebase';
function useAuthListener() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log('log in');
        localStorage.setItem('is_user', JSON.stringify(true));
        dispatch(handleStateInfoUser(authUser.uid));
        setUser(authUser);
      } else {
        // console.log('log out');
        localStorage.removeItem('is_user');
        setUser(null);
      }
    });
    return () => unscribe();
  }, []);
  return { user };
}

export default useAuthListener;
