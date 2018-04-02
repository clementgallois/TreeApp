import React from 'react';

import TreeData from './components/TreeData';
import Map from './components/Map';
import Error from './components/Error';

import getLocation from './services/location';
import getTree from './services/api';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.initTree = this.initTree.bind(this);
  }

  componentDidMount() {
    this.initTree();
  }

  async initTree() {
    const res = await getLocation();
    if (res.error) {
      this.setState({ error: res.error });
      return;
    }
    const result = await getTree(res.longitude, res.latitude);
    if (!result.success) {
      this.setState({ error: result.message });
    } else {
      this.setState({
        tree: result.tree,
        user: { lat: res.latitude, lng: res.longitude },
      });
    }
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
