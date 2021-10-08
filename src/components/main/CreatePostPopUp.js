import React, { useEffect, useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { compressImage } from '../../index';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
function CreatePostPopUp({ popUp, setPopUp, handleSubmit }) {
  const { photoUrl, display_name, id, full_name } = useSelector(
    (state) => state.auth
  );
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [pseodoImg, setPseodoImg] = useState('');
  const name = full_name?.split(' ');

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      setImg('');
      setTitle('');
      setPseodoImg('');
      document.querySelector('body').style.overflow = 'auto';
    };
  }, []);

  return (
    <PopUpWrapper>
      <PopUpContent>
        <PopUpHeader className='d-flex align-items-center'>
          Create Post{' '}
          <MdClear onClick={() => setPopUp(!popUp)} className='ml-auto' />
        </PopUpHeader>

        <PopUpAvatarAndName className='d-flex align-items-center'>
          <Link to={`profile/${id}`}>
            <PopUpAvatar photoUrl={photoUrl}></PopUpAvatar>
          </Link>
          <Link to={`profile/${id}`}>
            <PopUpName>{display_name}</PopUpName>
          </Link>
        </PopUpAvatarAndName>

        <PopUpInput>
          <textarea
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            rows='5'
            placeholder={`What's on your mind,${
              name && name[name.length - 1]
            } ?`}
          />
        </PopUpInput>

        <AdditionImage
          className='d-flex align-items-center'
          onClick={() => {
            document.querySelector('#popUpIdFile').click();
          }}
        >
          <AdditionText className='limit-one-line'>
            {pseodoImg || 'Add to your post'}
          </AdditionText>
          <input
            id='popUpIdFile'
            value={pseodoImg}
            onChange={(e) => {
              setPseodoImg(e.target.value);
              if (e.target.files[0]) {
                compressImage(e.target.files[0], setImg);
              } else {
                setImg('');
              }
            }}
            type='file'
            hidden
            accept='image/*'
          />
          <AdditionItem className='ml-auto'>
            {!img && <BsFillImageFill />}
          </AdditionItem>
        </AdditionImage>

        <PopUpFooter>
          <PopUpButtonPost
            onMouseUp={() => {
              handleSubmit(title, img);
            }}
            disabled={!title || !img}
          >
            Post
          </PopUpButtonPost>
        </PopUpFooter>
      </PopUpContent>
    </PopUpWrapper>
  );
}

export default CreatePostPopUp;

const PopUpWrapper = styled.div`
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

const PopUpContent = styled.div`
  max-width: 505px;
  width: 100%;
  background: #fff;
  border-radius: 7px;
  padding: 15px;
`;

const PopUpHeader = styled.div`
  text-align: center !important;
  color: #333;
  font-size: 1.3rem;
  font-weight: 500;
  border-bottom: 1px solid #dbdbdb;
  min-height: 40px;
  margin-bottom: 15px;
  svg {
    cursor: pointer;
  }
`;

const PopUpAvatarAndName = styled.div`
  margin-bottom: 15px;
`;

const PopUpAvatar = styled.div`
  position: relative;
  margin-right: 10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};
`;

const PopUpName = styled.div`
  font-weight: 500;
`;

const PopUpInput = styled.div`
  margin-bottom: 10px;
  textarea {
    width: 100%;
    resize: none;
  }
`;

const AdditionImage = styled.div`
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 0.95rem;
  cursor: pointer;
`;

const AdditionText = styled.div`
  font-weight: 500;
  color: #333;
`;

const AdditionItem = styled.div`
  svg {
    color: green;
    font-size: 1.2rem;
  }
`;

const PopUpFooter = styled.div``;

const PopUpButtonPost = styled.button`
  width: 100%;
  background: ${(props) =>
    !props.disabled ? 'rgb(23, 113, 230)' : 'rgb(228,230,235)'};
  padding: 5px 0;
  border-radius: 5px;
  cursor: ${(props) => props.disabled && 'not-allowed'};
  color: ${(props) => (!props.disabled ? '#fff' : '#999')};
  &:hover {
    opacity: ${(props) => !props.disabled && '0.8'};
  }
`;
