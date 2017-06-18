import React from 'react';

export default function Icon(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      {props.symbol}
    </button>
  );
}
