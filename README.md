# github-org-cards

Obtains members of a GitHub Org using the GitHub Orgs API, shuffles them,
retrieves the user profile for each member and renders a card in a responsive
12-column-based layout with an optionally-provided number of columns per card.

[![NPM](https://img.shields.io/npm/v/github-org-cards.svg)](https://www.npmjs.com/package/github-org-cards) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save github-org-cards
```

## Usage

See [example/src/App.js](example/src/App.js) for a full example.

```jsx
import React, { Component } from 'react'

import {GitHubOrg} from 'github-org-cards'

class Example extends Component {
  render () {
    return (
      <GitHubOrg columns={2} org='reactjs' />
    )
  }
}
```

## License

MIT © [devth](https://github.com/devth)
