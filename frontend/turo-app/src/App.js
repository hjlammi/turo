import React from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';

const App = () => (
  <div className="App">
    <Header headerText="Welcome to turo-app!" />
    <Form formLabel="Login" />
  </div>
);

export default App;
