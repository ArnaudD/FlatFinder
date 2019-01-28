const React = require('react');
const ReactDOMServer = require('react-dom/server');
const nodemailer = require('nodemailer');
const { promisify } = require('util');
const fs = require('fs');

const EmailTemplate = require('./EmailTemplate');

// console.log(Email);

module.exports = exports = {};

exports.render = async function render(props = {}) {
  const element = React.createElement(EmailTemplate.default, props);
  const content = ReactDOMServer.renderToStaticMarkup(element);

  const layout = await promisify(fs.readFile)(`${__dirname}/layout.html`, 'utf8');
  return layout.replace('<%body%>', content);

  return content;
};

exports.send = function send(mailOptions) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter.sendMail(mailOptions);
};
