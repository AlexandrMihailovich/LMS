import React, { PropTypes } from 'react';

const Trash = ({ action, size }) => (
  <span onClick={action}>
    <svg
      width={size + 7.5}
      height={size}
      viewBox="0 0 40 40"
    >
      <path d="m32.5 5h-10v-1.2c0-0.7-0.6-1.3-1.2-1.3s-1.3 0.6-1.3 1.3v1.2h-10c-1.4 0-2.5 1.1-2.5 2.5v2.5c0 1.4 1.1 2.5 2.5 2.5v22.5c0 1.4 1.1 2.5 2.5 2.5h17.5c1.4 0 2.5-1.1 2.5-2.5v-22.5c1.4 0 2.5-1.1 2.5-2.5v-2.5c0-1.4-1.1-2.5-2.5-2.5z m-2.5 28.8c0 0.6-0.6 1.2-1.2 1.2h-15c-0.7 0-1.3-0.6-1.3-1.2v-21.3h2.5v18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2l0-18.8h2.5v18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2l0-18.8h2.5l0 18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2v-18.8h2.5v21.3z m2.5-24.4c0 0.3-0.3 0.6-0.6 0.6h-21.3c-0.3 0-0.6-0.3-0.6-0.6v-1.3c0-0.3 0.3-0.6 0.6-0.6h21.3c0.3 0 0.6 0.3 0.6 0.6v1.3z" />
    </svg>
  </span>
);

Trash.propTypes = {
  action: PropTypes.func,
  size: PropTypes.number.isRequired,
};

export default Trash;

