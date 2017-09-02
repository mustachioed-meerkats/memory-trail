import React from 'react';
import Landing from './main/Landing.jsx';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import RootRouter from './main/RootRouter.jsx';

const App = () => {
  //TEMP DATA
  // if (!isLoggedIn) {
  //   return (
  //     <div>
  //       <Landing />
  //     </div>
  //   );
  // } else {
  return (
    <div>
      <Header />
      <RootRouter />
      <Footer />
    </div>
  );
  //}
};

export default App;