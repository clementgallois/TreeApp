import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const TreeData = ({ tree }) => (
  <div className="ListContainer">
    <h2>Closest tree data:</h2>
    <ul className="List">
      {Object.keys(tree).map((e, i) => (
        e !== '_id' &&
        <li
          key={i}// eslint-disable-line react/no-array-index-key
          className="ListItem"
        >
          <span className="ItemName">{e}</span>:<span className="ItemValue">{tree[e]}</span>
        </li>))}
    </ul>
  </div>);

TreeData.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  tree: PropTypes.object.isRequired,
};

export default TreeData;
