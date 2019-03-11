import React, { Component } from 'react'
import {GitHubOrg} from 'github-org-cards'
// eslint-disable-next-line
import bulma from './bulma.css';
import debounce from 'lodash/debounce';

const defaultOrg = 'yetibot';
const defaultColumns = 3;

export default class App extends Component {
  state = {
    org: defaultOrg,
    orgInput: defaultOrg,
    columns: defaultColumns,
    columnsInput: defaultColumns
  }

  handleOrgChange = debounce(org => {
    console.log('handle org change', org);
    this.setState({org});
  }, 500);

  handleOrgInputChange = (e) => {
    const {value} = e.target;
    console.log('change org input', value);
    this.handleOrgChange(value);
    this.setState({orgInput: value});
  }

  handleColumnsChange = debounce(columns => {
    this.setState({columns});
  }, 100);

  handleColumnsInputChange = (e) => {
    const {value} = e.target;
    console.log(value);
    const parsed = parseInt(value, 10);
    const columnsInput = isNaN(parsed)
      ? defaultColumns
      : Math.min(12, parsed);
    console.log('columns input', parsed, columnsInput);
    this.setState({columnsInput: columnsInput});
    this.handleColumnsChange(columnsInput);
  }

  render () {
    const {org, orgInput, columnsInput, columns} = this.state;
    console.log('render example', org);
    return (
      <div className="container">
        <h1 className="title is-size-2">github-org-cards</h1>
        <p className="subtitle">
          Obtains members of a GitHub Org using the GitHub Orgs API, shuffles
          them, retrieves the user profile for each member and renders a card in
          a responsive 12-column-based layout with an optionally-provided number
          of columns per card.
        </p>

        <p>
          Try the demo below by putting your own GitHub Org in and playing with
          the columns!
        </p>

        <div className="columns">

          <div className="column is-3">
            <div className="field">
              <label className="label">GitHub Org</label>
              <div className="control">
                <input className="input"
                  type="text"
                  placeholder="Text input"
                  onChange={this.handleOrgInputChange}
                  value={orgInput}
                />
              </div>
            </div>
          </div>

          <div className="column is-3">
            <div className="field">
              <label className="label">Columns per card</label>
              <div className="control">
                <input className="input"
                  type="text"
                  placeholder="Text input"
                  onChange={this.handleColumnsInputChange}
                  value={columnsInput}
                />
              </div>
            </div>
          </div>

        </div>

        <GitHubOrg key={org} columns={columns} org={org} />
      </div>
    )
  }
}
