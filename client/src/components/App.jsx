import React from 'react';
import Header from './header/Header.jsx';
import RootRouter from './main/RootRouter.jsx';

const App = () => {
  return (
    <div style={{backgroundColor: '#f6f6f6'}}>
      <Header />
      <RootRouter />
    </div>
  );
};

export default App;