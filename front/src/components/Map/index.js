import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import './index.css';

const Tree = () => (
  <img className="Marker" src="/tree.png" alt="tree" />
);

const User = () => (
  <img className="Marker" src="/user.png" alt="user" />
);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 40.745807, lng: -73.988297 },
      zoom: 12,
    };
    this.findBound = this.findBound.bind(this);
  }

  componentDidMount() {
    if (this.props.user && this.props.tree) {
      this.findBound(this.props);
    }
  }

  findBound(props) {
    const { user, tree } = props;
    const nw = {
      lat: Math.max(user.lat, tree.latitude),
      lng: Math.min(user.lng, tree.longitude),
    };
    const se = {
      lat: Math.min(user.lat, tree.latitude),
      lng: Math.max(user.lng, tree.longitude),
    };

    const size = {
      width: this.mapRef.offsetWidth,
      height: this.mapRef.offsetHeight,
    };
    const { center, zoom } = fitBounds({ nw, se }, size);
    this.setState({ center, zoom });
  }

  render() {
    return (
      <div
        className="MapContainer"
        ref={(map) => { this.mapRef = map; }}
      >
        <GoogleMap
        // v 3.30 to avoid marker loading from corner when zooming
          bootstrapURLKeys={{ v: '3.30', key: 'AIzaSyCvGxn7SPRrtdMV-QHUqfIYUqDWR5NzIh4' }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {this.props.tree && <Tree
            lat={this.props.tree.latitude}
            lng={this.props.tree.longitude}
          />}
          {this.props.user && <User {...this.props.user} />}
        </GoogleMap>
      </div>);
  }
}

Map.propTypes = {
  user: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  tree: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

Map.defaultProps = {
  user: null,
  tree: null,
};

export default Map;
