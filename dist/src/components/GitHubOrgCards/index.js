"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileCard = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _shuffle = _interopRequireDefault(require("lodash/shuffle"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.sass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var baseUrl = 'https://api.github.com';

var GitHubOrgCards = function GitHubOrgCards(_ref) {
  var org = _ref.org,
      columns = _ref.columns,
      shouldShuffle = _ref.shouldShuffle;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      orgMembers = _useState2[0],
      setOrgMembers = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      message = _useState6[0],
      setMessage = _useState6[1];

  (0, _react.useEffect)(function () {
    fetch("".concat(baseUrl, "/orgs/").concat(org, "/members")).then(function (res) {
      console.log('org status', res.status);
      setStatus(res.status);
      return res.json();
    }).then(function (body) {
      // console.log('org response', JSON.stringify(body));
      if ((0, _isArray.default)(body)) {
        console.log("found ".concat(body.length, " members"));
        setOrgMembers(shouldShuffle ? (0, _shuffle.default)(body) : body);
      } else {
        var _message = body.message;
        console.log('error?', body);
        if (_message) setMessage(_message);
      }
    }).catch(function (err) {
      console.log('error fetching org', err);
    });
  }, [org, shouldShuffle]);
  return _react.default.createElement("div", {
    className: _styles.default.org
  }, status === 200 ? _react.default.createElement("div", {
    className: "columns is-multiline"
  }, orgMembers && orgMembers.map(function (user) {
    return _react.default.createElement(ProfileCard, {
      columns: columns,
      user: user,
      key: user.login
    });
  })) : null, status && status !== 200 ? _react.default.createElement("div", {
    className: "notification is-danger"
  }, _react.default.createElement("p", {
    className: "title"
  }, status), _react.default.createElement("p", {
    className: "subtitle"
  }, org), _react.default.createElement("p", null, message)) : null);
};

GitHubOrgCards.defaultProps = {
  columns: 6,
  shouldShuffle: true
};
GitHubOrgCards.propTypes = {
  org: _propTypes.default.string,
  columns: _propTypes.default.number
};
var _default = GitHubOrgCards; // user prop is not fully hydrated
// user state represents the hydrated version

exports.default = _default;

var ProfileCard = function ProfileCard(_ref2) {
  var login = _ref2.user.login,
      columns = _ref2.columns;

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      user = _useState8[0],
      setUser = _useState8[1];

  var columnClass = "is-".concat(columns);
  (0, _react.useEffect)(function () {
    fetch("".concat(baseUrl, "/users/").concat(login)).then(function (res) {
      return res.json();
    }).then(function (user) {
      return setUser(user);
    }).catch(function (err) {
      return console.error('error fetching user', err);
    });
  }, [login, columns]);

  if (user && user.avatar_url) {
    return _react.default.createElement("div", {
      className: "column ".concat(columnClass)
    }, _react.default.createElement("div", {
      className: "card"
    }, _react.default.createElement("div", {
      className: "card-image"
    }, _react.default.createElement("figure", {
      className: "image is-4by4"
    }, _react.default.createElement("img", {
      src: user.avatar_url,
      alt: user.name
    }))), _react.default.createElement("header", {
      className: "card-header"
    }, _react.default.createElement("p", {
      className: "card-header-title"
    }, _react.default.createElement("a", {
      href: user.html_url
    }, "@", user.login))), _react.default.createElement("div", {
      className: "card-content"
    }, _react.default.createElement("div", {
      className: "content"
    }, _react.default.createElement("p", {
      className: "title"
    }, _react.default.createElement("strong", null, user.name)), user ? user.bio : null)), _react.default.createElement("footer", {
      className: "card-footer"
    }, user.company ? _react.default.createElement("div", {
      className: "card-footer-item"
    }, user.company) : null, user.location ? _react.default.createElement("div", {
      className: "card-footer-item"
    }, user.location) : null), user.blog ? _react.default.createElement("footer", {
      className: "card-footer"
    }, _react.default.createElement("div", {
      className: "card-footer-item"
    }, _react.default.createElement("a", {
      href: user.blog
    }, user.blog))) : null));
  } else {
    return _react.default.createElement("div", null);
  }
};

exports.ProfileCard = ProfileCard;
ProfileCard.propTypes = {
  user: _propTypes.default.object,
  columns: _propTypes.default.number
};

//# sourceMappingURL=index.js.map