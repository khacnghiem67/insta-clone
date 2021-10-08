import React, { useEffect } from 'react';

function useClickOutSide(ref, eleClick, eleDisplay) {
  useEffect(() => {
    function handleClickOutside(event) {
      const element = document.querySelector(eleDisplay);
      if (ref.current && !event.target.closest(eleClick)) {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useClickOutSide;
