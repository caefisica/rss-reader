import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'; 
import HomePage from './HomePage';
import './App.css';
import TopBar from './TopBar';
// import FeedPage from './FeedPage'; // Not used for now
import SourcesPage from './SourcesPage';

const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASE_URL,
});

const App = ({ feedsStore }) => (
  <div className='App'>
    <Router history={history}>
      <TopBar />
      <Route path='/' exact>
        <HomePage feedsStore={feedsStore} />
      </Route>
      <Route path='/sources' exact>
        <SourcesPage feedsStore={feedsStore} />
      </Route>
    </Router>
  </div>
);

export default App;
