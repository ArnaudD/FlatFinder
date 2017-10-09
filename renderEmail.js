import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';

import EmailTemplate from './EmailTemplate';

export default function render(props = {}) {
  const element = React.createElement(EmailTemplate, props);
  const content = ReactDOMServer.renderToStaticMarkup(element);

  const layout = fs.readFileSync(`${__dirname}/layout.html`, 'utf8');
  return layout.replace('<%body%>', content);

  return content;
}
