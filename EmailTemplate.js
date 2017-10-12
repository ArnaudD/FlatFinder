import React from 'react';

const blockWidth = 280;

const resultStyle = {
  background: '#292c40',
  display: 'inline-block',
  color: 'white',
  margin: 10,
  width: blockWidth,
};

const textStyle = {
  padding: '5px 10px 10px',
  height: 70,
};

const paragraphStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'normal',
  padding: 3,
  fontSize: 14,
  boxSizing: 'border-box',
};

const Result = ({ id, url, title, image, price }) => (
  <a href={url} style={resultStyle}>
    <img src={image} style={{ objectFit: 'cover' }} width={blockWidth} height="230" />
    <div style={textStyle}>
      <p style={paragraphStyle}><b>{title}</b></p>
      <p style={paragraphStyle}>{price}€</p>
    </div>
  </a>
);

const containerStyle = {
  maxWidth: 600,
  margin: '10px auto',
  textAlign: 'center',
};

const EmailTemplate = ({ results }) => (
  <div style={containerStyle}>
    {results.map((result, idx) => <Result key={idx} {...result} />)}
  </div>
);

export default EmailTemplate;
