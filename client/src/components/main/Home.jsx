import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/** ============================================================
 * Define Store Modules
 * =============================================================
 */
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  selectHandler,
  inputHandler
} from '../../store/modules/counter';

import { Grid, Row, Col } from 'react-bootstrap';
import ExploreMap from './maps/ExploreMap.jsx';
import PostList from './PostList.jsx';

//Define 
const NO_SELECT_MSG = 'No Selection';
const NO_INPUT_MSG = 'No Message';

const Home = (props) => {
  let playGround = false;

  if (playGround) {
    return (
      <div>
        <h1>Redux Playground</h1>
        <p>The following interactions are part of store/modules/counter.js</p>
        <p>Count: {props.count}</p>
        <p>
          <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
          <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
        </p>
        <p>
          <button onClick={props.decrement} disabled={props.isDecrementing}>Decrementing</button>
          <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
        </p>
        <select onChange={(e) => {
          props.handleSelector(e.target.value === NO_SELECT_MSG ? undefined : e.target.value);
        }}>
          <option>{NO_SELECT_MSG}</option>
          <option>Option 01</option>
          <option>Option 02</option>
          <option>Option 03</option>
        </select>
        <input onChange={(e) => {
          props.handleInput(e.target.value === NO_INPUT_MSG ? null : e.target.value);
        }} placeholder={NO_INPUT_MSG}/>
      </div>
    );
  } else {
    return (
      <div>
        <PostList />
      </div>
    );
  }
};
//export default Home;

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  handleSelector: selectHandler,
  handleInput: inputHandler
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);