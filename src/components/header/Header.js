import React, { useRef, useState, useEffect } from 'react';
import { AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

import { RiMessengerLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';
function Header() {
  const [display, setDisplay] = useState(false);
  const { photoUrl, id } = useSelector((state) => state.auth);

  // const handleClickOutSide = (e) => {
  //   if (display && !e.target.closest('li.nav-avatar')) {
  //     setDisplay(!display);
  //   } else {
  //     console.log('false');
  //   }
  // };
  useEffect(() => {
    // window.addEventListener('click', (e) => {
    //   const is_exist = e.target.closest('li.nav-avatar');

    //   if (display && is_exist) {
    //     setDisplay(!display);
    //   }
    // });
  }, []);
  return (
    <HeaderWrapper className='bg-white'>
      <HeaderContent className='d-flex justify-content-between align-items-center'>
        <HeaderLogo>
          <Link
            to='/'
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <img src='/img/logo.png' alt='ins-logo' />
          </Link>
        </HeaderLogo>
        {/* <HeaderSearch className='d-md-flex align-items-center d-none'>
          <BiSearch className='search-icon' />
          <input type='text' placeholder='Search' />
          <MdClear className='clear-icon ml-auto' />
        </HeaderSearch> */}
        <HeaderNav className='d-flex align-items-center'>
          <NavItem className='d-none d-sm-block'>
            <NavLink
              to='/'
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              <AiFillHome />
            </NavLink>
          </NavItem>
          <NavItem className='nav-messenger'>
            <RiMessengerLine />
            {/* <NavLink to='/'></NavLink> */}
          </NavItem>
          <NavItem className='d-none d-sm-block'>
            <AiOutlineHeart />
            {/* <NavLink to='/'></NavLink> */}
          </NavItem>
          <NavItem
            onClick={() => {
              setDisplay(!display);
            }}
            photoUrl={photoUrl}
            className='nav-avatar'
          >
            {display && (
              <Options className='options'>
                <OptionItem className='option-profile'>
                  <Link
                    to={`/profile/${id}`}
                    className='d-flex align-items-center'
                  >
                    <CgProfile />
                    <OptionName>Profile</OptionName>
                  </Link>
                </OptionItem>

                <OptionItem
                  onClick={() => {
                    auth.signOut().then(() => {
                      console.log('sign out success');
                    });
                  }}
                  className='option-logout'
                >
                  <OptionName>Log Out</OptionName>
                </OptionItem>
              </Options>
            )}
          </NavItem>
        </HeaderNav>
      </HeaderContent>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  height: 54px;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 30px;
`;

const HeaderContent = styled.div`
  max-width: 945px;
  margin: 0 auto;
  height: 100%;
  padding: 0 15px;
`;

const HeaderLogo = styled.div`
  a:active {
    opacity: 0.5;
  }
`;

const HeaderSearch = styled.div`
  max-width: 215px;
  width: 100%;
  color: #bcbdbf;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  font-size: 0.85rem;

  input {
    flex: 1;
    padding-right: 5px;
  }
  .search-icon,
  .clear-icon {
    margin: 0 5px;
  }
`;

const HeaderNav = styled.ul`
  position: relative;
`;

const NavItem = styled.li`
  margin-right: 17px;
  cursor: pointer;
  svg {
    font-size: 1.7rem;
    color: #333333;
  }
  &.nav-avatar {
    position: relative;
    margin-right: 0;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${(props) =>
      `#dbdbdb url(${props.photoUrl}) no-repeat center / cover`};
    box-shadow: 0 0 0 2px white, 0 0 0 4px #999;
  }
`;

const Options = styled.ul`
  position: absolute;
  left: -183px;
  right: -13px;
  top: calc(100% + 11px);
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 6px 0px rgb(0 0 0 / 23%);

  &::before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background: #ffffff;
    right: 22px;
    top: -4px;
    transform: rotate(45deg);
    box-shadow: 0 0 6px 0px rgb(0 0 0 / 23%);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;

    border-bottom: 8px solid #ffffff;
    right: 22px;
    top: -8px;
  }

  @media screen and (max-width: 576px) {
    left: -54px;
  }
`;

const OptionItem = styled.li`
  &.option-logout {
    padding: 10px;
    border-top: 1px solid #dbdbdb;
    cursor: pointer;
  }
  a {
    padding: 10px;
    svg {
      margin-right: 10px;
      font-size: 1.1rem;
    }
  }
  &:hover {
    background: rgb(224 215 215 / 10%);
  }
`;

const OptionName = styled.div``;
