import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import './App.css';
import TopBar from './TopBar';
import FeedPage from './FeedPage';

const App = ({ feedsStore }) => (
  <div className='App'>
    <Router>
      <TopBar />
      <Route path='/' exact>
        <HomePage feedsStore={feedsStore} />
      </Route>
      <Route path='/feed' exact>
        <FeedPage feedsStore={feedsStore} />
      </Route>
    </Router>
  </div>
);

export default App;
