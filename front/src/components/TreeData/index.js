import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const TreeData = ({
  tree, large, open, close,
}) => (
  <div className={`ListContainer ${large && 'Large'}`} style={{ width: open && !large ? '100%' : 0 }} >
    <h2>Closest tree data:</h2>
    {!large && open &&
      <button
        className="closeButton"
        onClick={close}
      >
      &times;
      </button>}
    <ul className={`List ${large && 'Large'}`}>
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
  large: PropTypes.bool,
  open: PropTypes.bool,
  close: PropTypes.func.isRequired,
};

TreeData.defaultProps = {
  large: true,
  open: false,
};

export default TreeData;
