import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import './App.css';
import TopBar from './TopBar';
// import FeedPage from './FeedPage'; // Not used for now
import SourcesPage from './SourcesPage';

const App = ({ feedsStore }) => (
  <div className='App'>
    <Router>
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
