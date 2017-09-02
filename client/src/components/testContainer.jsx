import React from 'react';
import GettingStartedExample from './map.jsx';

class TestContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        Hello, this is the test container
        <GettingStartedExample />
      </div>
    );
  }
}

export default TestContainer;