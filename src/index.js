import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import styles from './styles.css';
import bulma from './bulma.css';

const baseUrl = 'https://api.github.com';

export class GitHubOrg extends Component {
  static propTypes = {
    org: PropTypes.string,
    columns: PropTypes.number
  }

  state = {
    orgMembers: undefined,
    status: undefined
  }

  componentDidMount() {
    const { org } = this.props;
    // TODO fetch github org
    fetch(`${baseUrl}/orgs/${org}/members`)
      .then(res => {
        console.log('org status', res.status);
        this.setState({status: res.status});
        return res.json();
      })
      .then(body => {
        // console.log('org response', JSON.stringify(body));
        if (isArray(body)) {
          console.log(`found ${body.length} members`);
          this.setState({orgMembers: shuffle(body)});
        } else {
          const {message} = body;
          if (message) {
            this.setState({message});
          }
        }
      }).catch(err => {
        console.log('error fetching org', err);
      });
  }

  render() {
    const { message, status, orgMembers } = this.state;
    const { columns, org } = this.props;

    // wait for response for initial render
    if (status === undefined) return <div />;

    return (
      <div className={styles.org}>
        {status === 200
          ? <div className={`${bulma.columns} ${bulma['is-multiline']}`}>
              {orgMembers && orgMembers.map(user =>
                <ProfileCard columns={columns} user={user} key={user.login} />
              )}
            </div>
          : null}
        {status !== 200
          ? <div className={`${bulma.notification} ${bulma['is-danger']}`}>
              <p className={`${bulma.title}`}>
                {status}
              </p>
              <p className={`${bulma.subtitle}`}>
                {org}
              </p>
              <p>{message}</p>
            </div>
          : null}
      </div>
    );
  }
}

export class ProfileCard extends Component {
  static propTypes = {
    user: PropTypes.object,
    columns: PropTypes.number
  }

  state = {
    user: undefined
  }

  componentDidMount() {
    const {login} = this.props.user;
    fetch(`${baseUrl}/users/${login}`)
      .then(res => res.json())
      .then(user => this.setState({user}))
      .catch(err => console.error('error fetching user', err));
  }

  render() {
    const {user} = this.state;
    const {columns} = this.props;
    const columnClass = `is-${columns}`;
    if (user) {
      return (
        <div className={`${bulma.column} ${bulma[columnClass]}`}>
          <div className={bulma.card}>
            <div className={bulma['card-image']}>
              <figure className={`${bulma.image} ${bulma['is-4by4']}`}>
                <img src={user.avatar_url} alt={user.name} />
              </figure>
            </div>
            <header className={bulma['card-header']}>
              <p className={bulma['card-header-title']}>
                <a href={user.html_url}>@{user.login}</a>
              </p>
            </header>
            <div className={bulma['card-content']}>
              <div className={bulma.content}>
                <p className={`${bulma.title}`}><strong>{user.name}</strong></p>
                {user ? user.bio : null}
              </div>
            </div>
            <footer className={bulma['card-footer']}>
              {user.company
                ? <div className={bulma['card-footer-item']}>{user.company}</div>
                : null}
              {user.location
                ? <div className={bulma['card-footer-item']}>{user.location}</div>
                : null}
            </footer>
            <footer className={bulma['card-footer']}>
              {user.blog
                ? <div className={bulma['card-footer-item']}>
                    <a href={user.blog}>{user.blog}</a>
                  </div>
              : null}
            </footer>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
