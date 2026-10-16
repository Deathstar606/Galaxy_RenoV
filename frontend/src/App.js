import Main from './components/MainComponenet';
import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/configureStore';
import './App.css';

const store = ConfigStore();

class App extends Component {

  render() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
}
}
export default App;