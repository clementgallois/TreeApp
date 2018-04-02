import React from 'react';
import MediaQuery from 'react-responsive';

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
      open: false,
    };
    this.initTree = this.initTree.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.openPanel = this.openPanel.bind(this);
  }

  componentDidMount() {
    this.initTree();
  }

  async initTree() {
    const res = await getLocation();
    if (res.error) {
      this.setState({ error: `Location: ${res.error}` });
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

  closePanel() {
    this.setState({ open: false });
  }

  openPanel() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div className="AppContainer">
        {this.state.error && <Error message={this.state.error} onClose={this.closeError} />}
        <MediaQuery minDeviceWidth={1224}>
          {matches => (
            <div className={`App ${matches && 'Large'}`}>
              {this.state.tree && this.state.user && <Map
                tree={this.state.tree}
                user={this.state.user}
                large={matches}
              />}
              {!matches &&
                <div className="menuBar">
                  <button
                    className="menuButton"
                    onClick={this.openPanel}
                  >
                    <div />
                    <div />
                    <div />
                  </button>
                </div>}
              {this.state.tree && <TreeData
                tree={this.state.tree}
                large={matches}
                open={this.state.open}
                close={this.closePanel}
              />}
            </div>)}
        </MediaQuery>
      </div>);
  }
}

export default App;
