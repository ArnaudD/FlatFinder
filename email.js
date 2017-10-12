import React from 'react';
import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';
import { promisify } from 'util';

import fs from 'fs';

import EmailTemplate from './EmailTemplate';

export async function render(props = {}) {
  const element = React.createElement(EmailTemplate, props);
  const content = ReactDOMServer.renderToStaticMarkup(element);

  const layout = await promisify(fs.readFile)(`${__dirname}/layout.html`, 'utf8');
  return layout.replace('<%body%>', content);

  return content;
}

export function send(mailOptions) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter.sendMail(mailOptions);
}
