import React, { useState } from 'react';
import './App.scss';
import {GitHubOrgCards} from './components/GitHubOrgCards';

const App = () => {
  const [org, setOrg] = useState('yetibot');
  const [columns, setColumns] = useState(3);
  const [shouldShuffle, setShouldShuffle] = useState(true);

  return (
    <div className="container">
      <h1 className="title is-size-1 is-spaced">github-org-cards</h1>
      <p className="subtitle">
        Obtains members of a GitHub Org using the GitHub Orgs API, optionally
        shuffles them, retrieves the user profile for each member and renders a
        card in a responsive 12-column-based layout with an optionally-provided
        number of columns per card.
      </p>

      <p style={{marginBottom: 16}}>
        Try the demo below by putting your own GitHub Org in and playing with
        the columns!&nbsp;
        <strong>
          Be careful of large orgs or your GitHub API quota can be
          quickly surpassed.
        </strong>
      </p>

      <div className="columns">
        <div className="column is-3">
          <div className="field">
            <label className="label">GitHub Org</label>
            <div className="control">
              <input className="input"
                type="text"
                placeholder="Org"
                onChange={e => setOrg(e.target.value)}
                value={org}
              />
            </div>
          </div>
          Examples:
          {' '}
          <button class="button is-small is-outlined is-primary" onClick={() => setOrg('github')}>github</button>
          {' '}
          <button class="button is-small is-outlined is-primary" onClick={() => setOrg('reactjs')}>reactjs</button>
          {' '}
          <button class="button is-small is-outlined is-primary" onClick={() => setOrg('yetibot')}>yetibot</button>
        </div>

        <div className="column is-3">
          <div className="field">
            <label className="label">Columns per card</label>
            <div className="control">
              <input className="input"
                type="text"
                placeholder="Columns"
                onChange={e => setColumns(e.target.value)}
                value={columns}
              />
            </div>
          </div>
        </div>

        <div className="column is-3">
          <div className="field">
            <label className="label">Shuffle</label>
            <div className="control">
              <label class="checkbox">
                <input type="checkbox"
                  onChange={e => setShouldShuffle(e.target.checked)}
                  checked={shouldShuffle}
                /> Shuffle the list of org members
              </label>
            </div>
          </div>
        </div>



      </div>
      <GitHubOrgCards org={org} columns={columns} shouldShuffle={shouldShuffle} />
    </div>
  );
}

export default App;
