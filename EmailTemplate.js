import React from 'react';

const resultStyle = {
  width: 250,
  minHeight: 200,
  display: 'inline-block',
  color: 'white',
  margin: 10,
  backgrondColor: 'grey',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
};

const textStyle = {
  background: 'rgba(0,0,0,.4)',
  color: 'white',
  padding: 3,
}

const Result = ({ id, url, title, image, price }) => (
  <a href={url} style={{ ...resultStyle, backgroundImage: `url(${image})` }}>
    <p style={textStyle}><b>{title}</b></p>
    <p style={textStyle}>{price}€</p>
  </a>
)

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
