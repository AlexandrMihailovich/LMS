/* eslint max-len: 0 */
import React, { PropTypes } from 'react';

const svg = {
  checkbox: 'm5 22.5h5v-5h-5v5z m0-10h5v-5h-5v5z m0 20h5v-5h-5v5z m10-10h20v-5h-20v5z m0-10h20v-5h-20v5z m0 20h20v-5h-20v5z',
  formula: 'm19.6 23l-9.6-3v6.3s4.5 3.7 10 3.7 10-1.2 10-3.7v-6.3l-9.6 3c-0.2 0-0.6 0-0.9 0h0.1z m0.7-16c-0.2 0-0.4 0-0.5 0l-19.1 5.9c-0.9 0.3-0.9 1.4 0 1.7l4.3 1.4v4.4c-0.7 0.4-1.2 1.2-1.2 2.1 0 0.5 0.1 0.9 0.3 1.3-0.2 0.3-0.4 0.8-0.4 1.2v6.5c0 1.4 5.1 1.4 5.1 0v-6.5c0-0.4-0.2-0.9-0.4-1.2 0.2-0.4 0.3-0.8 0.3-1.3 0-0.9-0.5-1.7-1.2-2.1v-3.6l12.2 3.8c0.2 0 0.4 0 0.5 0l19.1-5.9c0.9-0.3 0.9-1.5 0-1.7l-19-6z m-0.3 8c-1.3 0-2.5-0.5-2.5-1.2s1.2-1.3 2.5-1.3 2.5 0.5 2.5 1.3-1.1 1.2-2.5 1.2z',
  select: 'm5 15l15 15 15-15h-30z',
  remove: 'm32.5 5h-10v-1.2c0-0.7-0.6-1.3-1.2-1.3s-1.3 0.6-1.3 1.3v1.2h-10c-1.4 0-2.5 1.1-2.5 2.5v2.5c0 1.4 1.1 2.5 2.5 2.5v22.5c0 1.4 1.1 2.5 2.5 2.5h17.5c1.4 0 2.5-1.1 2.5-2.5v-22.5c1.4 0 2.5-1.1 2.5-2.5v-2.5c0-1.4-1.1-2.5-2.5-2.5z m-2.5 28.8c0 0.6-0.6 1.2-1.2 1.2h-15c-0.7 0-1.3-0.6-1.3-1.2v-21.3h2.5v18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2l0-18.8h2.5v18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2l0-18.8h2.5l0 18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2v-18.8h2.5v21.3z m2.5-24.4c0 0.3-0.3 0.6-0.6 0.6h-21.3c-0.3 0-0.6-0.3-0.6-0.6v-1.3c0-0.3 0.3-0.6 0.6-0.6h21.3c0.3 0 0.6 0.3 0.6 0.6v1.3z',
  radio: 'm5 7.5v5h30v-5h-30z m0 15h30v-5h-30v5z m0 10h30v-5h-30v5z',
  video: 'm22.5 7.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z m12.5 7.5l-5 5v-2.5c0-1.2-0.8-2.2-2-2.4 1.3-1.4 2-3.2 2-5.1 0-4.1-3.4-7.5-7.5-7.5-3.9 0-7.2 3.1-7.5 6.9-1.3-1.2-3.1-1.9-5-1.9-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5h-2.5v5h2.5v5c0 1.4 1.1 2.5 2.5 2.5h15c1.4 0 2.5-1.1 2.5-2.5v-2.5l5 5h2.5v-20h-2.5z m-25-2.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5v2.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5h-2.5c0-1.4-1.1-2.5-2.5-2.5z m12.5 15h-5v-5h5v5z m5-4.3l-2.9-2.8c-0.2-0.3-0.5-0.4-0.8-0.4h-7.5c-0.7 0-1.3 0.6-1.3 1.3v7.5c0 0.3 0.1 0.6 0.3 0.8 0 0 1.6 1.5 2.9 2.9h-4.4c-0.7 0-1.3-0.6-1.3-1.2v-12.5c0-0.7 0.6-1.3 1.3-1.3h12.5c0.6 0 1.2 0.6 1.2 1.3v4.4z m-5-8.2c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z m12.5 12.5l-2.5-2.5 0-5 2.5-2.5v10z',
  image: 'm27.5 2.5h-22.5v35h30v-27.5l-7.5-7.5z m5 32.5h-25v-30h17.5l7.5 7.5v22.5z m-22.5-25v20h5c0-2.8 2.2-5 5-5-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5c2.8 0 5 2.2 5 5h5v-15l-5-5h-15z',
  photo: 'm20 15c-2.8 0-5 2.2-5 5s2.2 5 5 5c0.2 0 0.4 0 0.7 0-1.9-0.3-3.2-1.9-3.2-3.8 0-2 1.7-3.7 3.7-3.7 1.9 0 3.5 1.4 3.8 3.2 0-0.3 0-0.5 0-0.7 0-2.8-2.2-5-5-5z m15-5h-5l-5-5h-10l-5 5h-5c-1.4 0-2.5 1.1-2.5 2.5v17.5c0 1.4 1.1 2.5 2.5 2.5h30c1.4 0 2.5-1.1 2.5-2.5v-17.5c0-1.4-1.1-2.5-2.5-2.5z m-18.7-2.5h7.5l2.5 2.5h-12.5l2.5-2.5z m-10 22.5c-0.7 0-1.3-0.6-1.3-1.3v-11.2h2.5v-2.5h-2.5v-1.2c0-0.7 0.6-1.3 1.3-1.3h7.1c-0.2 0.1-0.3 0.3-0.5 0.4-3.9 3.9-3.9 10.3 0 14.2l3 2.9h-9.6z m13.7-2.5c-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5 7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5z m12.5-8.7l-5.9-6.3h5.9v6.3z',
  input: 'm35 5h-30c-1.4 0-2.5 1.1-2.5 2.5v25c0 1.3 1.1 2.5 2.5 2.5h30c1.3 0 2.5-1.2 2.5-2.5v-25c0-1.4-1.2-2.5-2.5-2.5z m-27.5 17.5l5-5-5-5 2.5-2.5 7.5 7.5-7.5 7.5-2.5-2.5z m20 2.5h-10v-2.5h10v2.5z',
  clone: 'm27.5 7.5c-2.8 0-5 2.2-5 5 0 1.8 1 3.4 2.5 4.3v0.7c0 2.5-2.5 5-5 5-2.1 0-3.7 0.4-5 1.1v-11.8c1.5-0.9 2.5-2.5 2.5-4.3 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.8 1 3.4 2.5 4.3v16.4c-1.5 0.8-2.5 2.4-2.5 4.3 0 2.7 2.2 5 5 5s5-2.3 5-5c0-1.4-0.5-2.5-1.3-3.4 0.7-0.9 1.9-1.6 3.8-1.6 5 0 10-5 10-10v-0.7c1.5-0.9 2.5-2.5 2.5-4.3 0-2.8-2.2-5-5-5z m-15-2.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m0 30c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z m15-20c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z',
  edit: 'm30 2.5l-5 5 7.5 7.5 5-5-7.5-7.5z m-27.5 27.5l0 7.5 7.5 0 20-20-7.5-7.5-20 20z m7.5 5h-5v-5h2.5v2.5h2.5v2.5z',
  link: 'm30 10h-5.4c1.9 1.3 3.6 3.5 4.2 5h1.2c2.5 0 5 2.5 5 5s-2.6 5-5 5h-7.5c-2.5 0-5-2.5-5-5 0-0.9 0.2-1.8 0.7-2.5h-5.4c-0.2 0.8-0.3 1.6-0.3 2.5 0 5 5 10 10 10h7.5s10-5 10-10-5-10-10-10z m-18.8 15h-1.2c-2.5 0-5-2.5-5-5s2.6-5 5-5h7.5c2.5 0 5 2.5 5 5 0 0.9-0.2 1.8-0.7 2.5h5.4c0.2-0.8 0.3-1.6 0.3-2.5 0-5-5-10-10-10h-7.5s-10 5-10 10 5 10 10 10h5.4c-1.9-1.2-3.6-3.5-4.2-5z',
  hint: 'm20 15c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5z m0-12.5c-9.6 0-17.5 7.9-17.5 17.5s7.9 17.5 17.5 17.5 17.5-7.9 17.5-17.5-7.9-17.5-17.5-17.5z m0 30c-6.9 0-12.5-5.6-12.5-12.5s5.6-12.5 12.5-12.5 12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5z m2.5-12.5c0-1.2-1.2-2.5-2.5-2.5h-2.5s-2.5 1.3-2.5 2.5h2.5v7.5s1.3 2.5 2.5 2.5h2.5s2.5-1.2 2.5-2.5h-2.5v-7.5z',
  add: 'm22.5 17.5v-10h-5v10h-10v5h10v10h5v-10h10v-5h-10z',
};

const Icon = ({
  action,
  color,
  size,
  type,
}) => (
  <span onClick={action}>
    <svg
      style={{ color }}
      width={size + 7.5}
      height={size}
      viewBox="0 0 45 45"
    >
      <path d={svg[type]} />
    </svg>
  </span>
);

Icon.propTypes = {
  action: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Icon;
