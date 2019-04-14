import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Product from './pages/admin/Product'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Product} />
      </Router>
    );
  }
}

export default App;
