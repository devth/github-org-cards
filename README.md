# @bit/devth.github.git-hub-org-cards

Obtains members of a GitHub Org using the GitHub Orgs API, optionally shuffles
them, retrieves the user profile for each member and renders a card in a
responsive 12-column-based layout with an optionally-provided number of columns
per card.

[![bit](https://img.shields.io/badge/%40bit%2Fdevth.github.git--hub--org--cards-bit.dev-blue)](https://bit.dev/devth/github/git-hub-org-cards)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![github-org-cards](github-org-cards.png)

- View usage in the wild on [Yetibot Community](https://yetibot.com/community).

## Install

Requires [adding Bit as a scoped
registry](https://docs.bit.dev/docs/installing-components.html):

```bash
npm config set '@bit:registry' https://node.bit.dev
```

Then:

```bash
yarn add @bit/devth.github.git-hub-org-cards
```

## Usage

See [example/src/App.js](example/src/App.js) for a full example.

```jsx
import React from 'react'

import {GitHubOrgCards} from 'github-org-cards'

const Example = () => {
  return (
    <GitHubOrgCards columns={2} org='github' />
  );
}
```



## bit usage

```
bit status
bit list

bit add src/components/GitHubOrgCards

bit build
version=0.0.6
bit tag --all $version

bit show git-hub-org-cards

bit export devth.github
```

## Update or install bit

```
yarn global add bit-bin
```

## License

MIT © [devth](https://github.com/devth)

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app). Generated docs are below.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App
documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here:
https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here:
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here:
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here:
https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here:
https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here:
https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
