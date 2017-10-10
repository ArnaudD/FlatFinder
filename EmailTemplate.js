import React from 'react';

const Result = ({ id, url, title, image, price }) => (
  <tr>
    <td>
      <a href={url}>
        <img width="250" src={image} style={{ width: 250 }}/>
      </a>
    </td>
    <td>
      <a href={url}>
        <p><b>{title}</b></p>
        <p>{price}€</p>
      </a>
    </td>
  </tr>
)

const EmailTemplate = ({ results }) => (
  <table>
    <tbody>
      {results.map((result, idx) => <Result key={idx} {...result} />)}
    </tbody>
  </table>
);

export default EmailTemplate;
