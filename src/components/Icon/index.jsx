import React from 'react';
import symbols from './symbols';

export default function Icon(props) {
  const {className = '', symbol, onClick} = props;

  return (
    <svg className={className} onClick={onClick}>
      <use xlinkHref={symbols[symbol]} />
    </svg>
  );
}
