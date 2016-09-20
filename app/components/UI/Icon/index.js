/* eslint max-len: 0 */
import React, { PropTypes } from 'react';

const svg = {
  remove: 'm32.5 5h-10v-1.2c0-0.7-0.6-1.3-1.2-1.3s-1.3 0.6-1.3 1.3v1.2h-10c-1.4 0-2.5 1.1-2.5 2.5v2.5c0 1.4 1.1 2.5 2.5 2.5v22.5c0 1.4 1.1 2.5 2.5 2.5h17.5c1.4 0 2.5-1.1 2.5-2.5v-22.5c1.4 0 2.5-1.1 2.5-2.5v-2.5c0-1.4-1.1-2.5-2.5-2.5z m-2.5 28.8c0 0.6-0.6 1.2-1.2 1.2h-15c-0.7 0-1.3-0.6-1.3-1.2v-21.3h2.5v18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2l0-18.8h2.5v18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2l0-18.8h2.5l0 18.8c0 0.6 0.6 1.2 1.3 1.2s1.2-0.6 1.2-1.2v-18.8h2.5v21.3z m2.5-24.4c0 0.3-0.3 0.6-0.6 0.6h-21.3c-0.3 0-0.6-0.3-0.6-0.6v-1.3c0-0.3 0.3-0.6 0.6-0.6h21.3c0.3 0 0.6 0.3 0.6 0.6v1.3z',
  video: 'm22.5 7.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z m12.5 7.5l-5 5v-2.5c0-1.2-0.8-2.2-2-2.4 1.3-1.4 2-3.2 2-5.1 0-4.1-3.4-7.5-7.5-7.5-3.9 0-7.2 3.1-7.5 6.9-1.3-1.2-3.1-1.9-5-1.9-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5h-2.5v5h2.5v5c0 1.4 1.1 2.5 2.5 2.5h15c1.4 0 2.5-1.1 2.5-2.5v-2.5l5 5h2.5v-20h-2.5z m-25-2.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5v2.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5h-2.5c0-1.4-1.1-2.5-2.5-2.5z m12.5 15h-5v-5h5v5z m5-4.3l-2.9-2.8c-0.2-0.3-0.5-0.4-0.8-0.4h-7.5c-0.7 0-1.3 0.6-1.3 1.3v7.5c0 0.3 0.1 0.6 0.3 0.8 0 0 1.6 1.5 2.9 2.9h-4.4c-0.7 0-1.3-0.6-1.3-1.2v-12.5c0-0.7 0.6-1.3 1.3-1.3h12.5c0.6 0 1.2 0.6 1.2 1.3v4.4z m-5-8.2c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z m12.5 12.5l-2.5-2.5 0-5 2.5-2.5v10z',
  image: 'm27.5 2.5h-22.5v35h30v-27.5l-7.5-7.5z m5 32.5h-25v-30h17.5l7.5 7.5v22.5z m-22.5-25v20h5c0-2.8 2.2-5 5-5-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5c2.8 0 5 2.2 5 5h5v-15l-5-5h-15z',
  clone: 'm27.5 7.5c-2.8 0-5 2.2-5 5 0 1.8 1 3.4 2.5 4.3v0.7c0 2.5-2.5 5-5 5-2.1 0-3.7 0.4-5 1.1v-11.8c1.5-0.9 2.5-2.5 2.5-4.3 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.8 1 3.4 2.5 4.3v16.4c-1.5 0.8-2.5 2.4-2.5 4.3 0 2.7 2.2 5 5 5s5-2.3 5-5c0-1.4-0.5-2.5-1.3-3.4 0.7-0.9 1.9-1.6 3.8-1.6 5 0 10-5 10-10v-0.7c1.5-0.9 2.5-2.5 2.5-4.3 0-2.8-2.2-5-5-5z m-15-2.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m0 30c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z m15-20c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z',
  edit: 'm30 2.5l-5 5 7.5 7.5 5-5-7.5-7.5z m-27.5 27.5l0 7.5 7.5 0 20-20-7.5-7.5-20 20z m7.5 5h-5v-5h2.5v2.5h2.5v2.5z',
  quiz: 'm34.7 20.2l-1.9-2c-0.3-0.2-0.7-0.2-0.9 0l-4.1 4.1-4.7 4.7-3.7-3.6c-0.2-0.3-0.6-0.3-0.9 0l-1.9 1.9c-0.3 0.3-0.3 0.7 0 0.9l6 6.1c0.3 0.2 0.7 0.2 0.9 0l11.2-11.2c0.3-0.3 0.3-0.7 0-0.9z m-20.8 2.5l2-2c1.6-1.6 4.5-1.6 6.2 0l1 1 4.4-4.2v-12.5h-22.5v27.5h12.5l-3.6-3.6c-1.7-1.7-1.7-4.5 0-6.2z m-1.4-15.2h12.5v2.5h-12.5v-2.5z m0 5h12.5v2.5h-12.5v-2.5z m-2.5 7.5h-2.5v-2.5h2.5v2.5z m0-5h-2.5v-2.5h2.5v2.5z m0-5h-2.5v-2.5h2.5v2.5z m2.5 7.5h2.5v2.5h-2.5v-2.5z',
  link: 'm30 10h-5.4c1.9 1.3 3.6 3.5 4.2 5h1.2c2.5 0 5 2.5 5 5s-2.6 5-5 5h-7.5c-2.5 0-5-2.5-5-5 0-0.9 0.2-1.8 0.7-2.5h-5.4c-0.2 0.8-0.3 1.6-0.3 2.5 0 5 5 10 10 10h7.5s10-5 10-10-5-10-10-10z m-18.8 15h-1.2c-2.5 0-5-2.5-5-5s2.6-5 5-5h7.5c2.5 0 5 2.5 5 5 0 0.9-0.2 1.8-0.7 2.5h5.4c0.2-0.8 0.3-1.6 0.3-2.5 0-5-5-10-10-10h-7.5s-10 5-10 10 5 10 10 10h5.4c-1.9-1.2-3.6-3.5-4.2-5z',
  add: 'm22.5 17.5v-10h-5v10h-10v5h10v10h5v-10h10v-5h-10z',
};

const Icon = ({
  action,
  size,
  type,
}) => (
  <span onClick={action}>
    <svg
      width={size + 7.5}
      height={size}
      viewBox="0 0 40 40"
    >
      <path d={svg[type]} />
    </svg>
  </span>
);

Icon.propTypes = {
  action: PropTypes.func,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Icon;
