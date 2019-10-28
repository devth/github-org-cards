import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const baseUrl = 'https://api.github.com';

const GitHubOrgCards = ({org, columns, shouldShuffle}) => {
  const [orgMembers, setOrgMembers] = useState([]);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch(`${baseUrl}/orgs/${org}/members`)
      .then(res => {
        console.log('org status', res.status);
        setStatus(res.status);
        return res.json();
      })
      .then(body => {
        // console.log('org response', JSON.stringify(body));
        if (isArray(body)) {
          console.log(`found ${body.length} members`);
          setOrgMembers(shouldShuffle ? shuffle(body) : body);
        } else {
          const {message} = body;
          console.log('error?', body);
          if (message) setMessage(message);
        }
      }).catch(err => {
        console.log('error fetching org', err);
      });
  }, [org, shouldShuffle])

  return (
    <div className={styles.org}>
      {status === 200
        ? <div className='columns is-multiline'>
            {orgMembers && orgMembers.map(user =>
              <ProfileCard columns={columns} user={user} key={user.login} />
            )}
          </div>
        : null}
      {status && status !== 200
        ? <div className='notification is-danger'>
            <p className='title'>
              {status}
            </p>
            <p className='subtitle'>
              {org}
            </p>
            <p>{message}</p>
          </div>
        : null}
    </div>
  );
}

GitHubOrgCards.defaultProps = {columns: 6, shouldShuffle: true};

GitHubOrgCards.propTypes = {
  org: PropTypes.string,
  columns: PropTypes.number
};

export default GitHubOrgCards;

// user prop is not fully hydrated
// user state represents the hydrated version
export const ProfileCard = ({user: {login}, columns}) => {
  const [user, setUser] = useState({});
  const columnClass = `is-${columns}`;

  useEffect(() => {
    fetch(`${baseUrl}/users/${login}`)
      .then(res => res.json())
      .then(user => setUser(user))
      .catch(err => console.error('error fetching user', err));
  }, [login, columns]);

  if (user && user.avatar_url) {
    return (
      <div className={`column ${columnClass}`}>
        <div className='card'>
          <div className='card-image'>
            <figure className={`image is-4by4`}>
              <img src={user.avatar_url} alt={user.name} />
            </figure>
          </div>
          <header className='card-header'>
            <p className='card-header-title'>
              <a href={user.html_url}>@{user.login}</a>
            </p>
          </header>
          <div className='card-content'>
            <div className='content'>
              <p className={`title`}><strong>{user.name}</strong></p>
              {user ? user.bio : null}
            </div>
          </div>
          <footer className='card-footer'>
            {user.company
              ? <div className='card-footer-item'>{user.company}</div>
              : null}
            {user.location
              ? <div className='card-footer-item'>{user.location}</div>
              : null}
          </footer>
          {user.blog
            ? <footer className='card-footer'>
                <div className='card-footer-item'>
                  <a href={user.blog}>{user.blog}</a>
                </div>
              </footer>
            : null}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  columns: PropTypes.number
}
