import React from 'react';
import { Link } from 'react-router-dom';
/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Grid, Image } from 'semantic-ui-react';

const ErrorPage = () => {
  return (
    <Grid container columns={2} stackable>
      <Grid.Column>
        <Image 
          src={'https://i.imgur.com/rLBApsF.jpg'}
          centered
        />
      </Grid.Column>
      <Grid.Column>
        <h1 style={{textAlign: 'center', fontSize: '5rem'}}>404!</h1>
        <h2 style={{textAlign: 'center'}}>That is an Error!</h2>
        <h3 style={{textAlign: 'center'}}>The requested URL was not found. Thats about all we can tell you.</h3>
      </Grid.Column>
    </Grid>
  );
};

export default ErrorPage;