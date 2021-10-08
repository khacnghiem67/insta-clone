import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { db, auth } from '../../firebase';
import SidebarProfile from './SidebarProfile';

function Sidebar() {
  const userInfo = useSelector((state) => state.auth);
  const id = useSelector((state) => state.auth.id);
  const [people, setPeople] = useState('');

  useEffect(() => {
    db.collection('users')
      .limit(6)
      .get()
      .then((querySnapshot) => {
        setPeople(
          querySnapshot.docs.filter((query) => {
            return query.id !== id;
          })
        );
      });
  }, []);

  return (
    <SidebarWrapper>
      <UserProfile>
        <SidebarProfile isUser userInfo={userInfo} />
      </UserProfile>
      <SuggestionProfileWrapper>
        <SuggestionProfileTitle className='d-flex justify-content-between align-items-center'>
          <SuggestionProfileTitleLeft>
            Suggestions For You
          </SuggestionProfileTitleLeft>
          {/* <Link to=''>See All</Link> */}
        </SuggestionProfileTitle>

        <SuggestionProfiles>
          {people &&
            people.map((p) => (
              <SidebarProfile key={p.id} userInfo={{ id: p.id, ...p.data() }} />
            ))}
        </SuggestionProfiles>
      </SuggestionProfileWrapper>
      <DocumentsReferences className='d-flex flex-wrap'>
        <DocumentField>
          <Link to='https://about.instagram.com/'>About</Link>
        </DocumentField>

        <DocumentField>
          <Link to='https://developers.facebook.com/docs/instagram'>API</Link>
        </DocumentField>
      </DocumentsReferences>
      <AppDesc>© 2021 Instagram from Facebook</AppDesc>
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.div`
  position: sticky;
  top: calc(54px + 35px);
`;

const UserProfile = styled.div`
  margin-bottom: 20px;
`;

const SuggestionProfileWrapper = styled.div``;

const SuggestionProfileTitle = styled.div`
  margin-bottom: 15px;
  a {
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const SuggestionProfileTitleLeft = styled.div`
  color: #999;
  font-size: 0.95rem;
  font-weight: 500;
`;

const SuggestionProfiles = styled.div`
  margin-bottom: 20px;
`;

const DocumentsReferences = styled.ul``;

const DocumentField = styled.li`
  position: relative;
  margin-right: 12px;
  a {
    color: #cdcdcd;
    font-size: 0.75rem;
  }
  &:not(:last-child):after {
    content: '';
    position: absolute;

    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #cdcdcd;
    top: 50%;
    transform: translateY(50%);
    right: -6px;
  }
`;

const AppDesc = styled.span`
  color: #cdcdcd;
  font-size: 0.8rem;
  cursor: default;
`;
