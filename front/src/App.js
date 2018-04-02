import React from 'react';

import TreeData from './components/TreeData';
import Map from './components/Map';
import Error from './components/Error';
import './App.css';


function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve, reject,
      options,
    );
  });
}

async function getLocation() {
  try {
    const res = await getCurrentLocation({
      enableHighAccuracy: false,
      timeout: 5000,
    });
    return { longitude: res.coords.longitude, latitude: res.coords.latitude };
  } catch (err) {
    return { error: err.message };
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.getTree = this.getTree.bind(this);
  }

  componentDidMount() {
    this.getTree();
  }

  async getTree() {
    const res = await getLocation();
    if (res.error) {
      this.setState({ error: res.error });
      return;
    }
    const request = new Request('http://localhost:8080/tree', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        longitude: res.longitude,
        latitude: res.latitude,
      }),
    });
    const result = await fetch(request).then(response => response.json()).catch(error => error);
    this.setState({
      tree: result.tree,
      user: { lat: res.latitude, lng: res.longitude },
    });
  }

  closeError() {
    this.setState({ error: null });
  }

  render() {
    return (
      <div className="AppContainer">
        {this.state.error && <Error message={this.state.error} onClose={this.closeError} />}
        <div className="App">
          {this.state.tree && this.state.user && <Map
            tree={this.state.tree}
            user={this.state.user}
          />}
          {this.state.tree && <TreeData tree={this.state.tree} />}
        </div>
      </div>);
  }
}

export default App;
