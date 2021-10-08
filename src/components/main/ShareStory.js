import React from 'react';
import styled from 'styled-components';
import { FcPlus } from 'react-icons/fc';
import { useSelector } from 'react-redux';

function ShareStory() {
  const { photoUrl } = useSelector((state) => state.auth);
  return (
    <ShareStoryWrapper className='d-flex'>
      <AddUserStory className='d-flex flex-column align-items-center'>
        <StoryProfileImage>
          <ImageBlock photoUrl={photoUrl}></ImageBlock>
        </StoryProfileImage>
        <StoryProfileName className='limit-one-line nameOfMe'>
          Your Story
        </StoryProfileName>
        <FcPlus />
      </AddUserStory>

      <StoryProfile className='d-flex flex-column align-items-center'>
        <StoryProfileImage>
          <ImageBlock photoUrl='https://yt3.ggpht.com/PXkn2YvmRhuXpNJlkw6l4h-rcqf5-fu5oZaydMVPvU4AJEv_S9HdkRiijqL8YyZvun3vuvwVDaY=s88-c-k-c0x00ffffff-no-rj'></ImageBlock>
        </StoryProfileImage>
        <StoryProfileName className='limit-one-line'>
          kimkitty_tran2905 Lorem ipsum dolor sit amet.
        </StoryProfileName>
      </StoryProfile>

      <StoryProfile className='d-flex flex-column align-items-center'>
        <StoryProfileImage>
          <ImageBlock photoUrl='https://yt3.ggpht.com/5CtnhLf1VAPLzWnjk6x7PtBK7lyYi4bHoJPhk5E8u812OVrphAGuWX6Iw-G6UTCrLP_XQ0IE=s88-c-k-c0x00ffffff-no-rj'></ImageBlock>
        </StoryProfileImage>
        <StoryProfileName className='limit-one-line'>
          kimkitty_tran2905 Lorem ipsum dolor sit amet.
        </StoryProfileName>
      </StoryProfile>
    </ShareStoryWrapper>
  );
}

export default ShareStory;

const ShareStoryWrapper = styled.ul`
  padding: 15px;
  background: #ffffff;
  margin-bottom: 30px;
`;

const StoryProfile = styled.li`
  max-width: 60px;
  width: 100%;
  margin-right: 15px;
  cursor: pointer;

  @media screen and (max-width: 360px) {
    & {
      max-width: 50px;
    }
  }
`;

const StoryProfileName = styled.div`
  font-size: 0.7rem;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 360px) {
    font-size: 0.6rem;
  }
`;

const AddUserStory = styled(StoryProfile)`
  position: relative;
  .nameOfMe {
    font-weight: 700;
  }
  svg {
    position: absolute;
    right: -2px;
    bottom: 23px;
  }
`;

const StoryProfileImage = styled.div`
  width: 55px;
  margin-bottom: 5px;
  @media screen and (max-width: 360px) {
    width: 48px;
  }
`;

const ImageBlock = styled.div`
  padding-top: 100%;
  position: relative;
  background: ${(props) =>
    `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};
  border-radius: 50%;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #dc3375;
`;
