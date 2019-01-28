'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

var blockWidth = 280;
var resultStyle = {
  background: '#292c40',
  display: 'inline-block',
  color: 'white',
  margin: 10,
  width: blockWidth,
};
var textStyle = {
  padding: '5px 10px 10px',
  height: 70,
};
var paragraphStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'normal',
  padding: 3,
  fontSize: 14,
  boxSizing: 'border-box',
};

var Result = function Result(_ref) {
  var id = _ref.id,
    url = _ref.url,
    title = _ref.title,
    image = _ref.image,
    price = _ref.price;
  return _react.default.createElement(
    'a',
    {
      href: url,
      style: resultStyle,
    },
    _react.default.createElement('img', {
      src: image,
      style: {
        objectFit: 'cover',
      },
      width: blockWidth,
      height: '230',
    }),
    _react.default.createElement(
      'div',
      {
        style: textStyle,
      },
      _react.default.createElement(
        'p',
        {
          style: paragraphStyle,
        },
        _react.default.createElement('b', null, title),
      ),
      _react.default.createElement(
        'p',
        {
          style: paragraphStyle,
        },
        price,
        '\u20AC',
      ),
    ),
  );
};

var containerStyle = {
  maxWidth: 600,
  margin: '10px auto',
  textAlign: 'center',
};

var EmailTemplate = function EmailTemplate(_ref2) {
  var results = _ref2.results;
  return _react.default.createElement(
    'div',
    {
      style: containerStyle,
    },
    results.map(function(result, idx) {
      return _react.default.createElement(
        Result,
        _extends(
          {
            key: idx,
          },
          result,
        ),
      );
    }),
  );
};

var _default = EmailTemplate;
exports.default = _default;
