import React from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Markers from './maps/Markers.jsx';
import Search from './maps/Search.jsx';
import PostList from './PostList.jsx';

import {
<<<<<<< HEAD
  handleMapMounted,
=======
  handleMapMounted, 
>>>>>>> 152f2abe33b17c1a00b49d55135784df68cd076b
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
} from '../../store/modules/map';

//The strategy utilized here only works with posts coming from the server organized by timestamp,
<<<<<<< HEAD
//it cannot use the same routes as the home page.
=======
//it cannot use the same routes as the home page. 
>>>>>>> 152f2abe33b17c1a00b49d55135784df68cd076b


const Timeline = withGoogleMap(props => {
  const path = [];
<<<<<<< HEAD

=======
  
>>>>>>> 152f2abe33b17c1a00b49d55135784df68cd076b
  props.markers.forEach(function (post) {
    var obj = {'lat': Number(post.lat), 'lng': Number(post.lng)};
    path.push(obj);
  });
<<<<<<< HEAD
  console.log(path);
=======
  console.log(path);  
>>>>>>> 152f2abe33b17c1a00b49d55135784df68cd076b
  return (
  <GoogleMap
    ref={props.handleMapMounted}
    defaultZoom={10}
    center={props.center}
  >
    {props.markers.map((marker, index) => (
<<<<<<< HEAD
      <Marker
        position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index}
      >
      </Marker>
    ))}
    <Polyline
      path={path}
    />
=======
      <Marker 
        position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} key={index} 
      >
      </Marker>
    ))}
    <Polyline 
      path={path} 
    /> 
>>>>>>> 152f2abe33b17c1a00b49d55135784df68cd076b
  </GoogleMap>
  );
});


const mapStateToProps = state => ({
  center: state.map.center,
  bounds: state.map.bounds,
  containerElement: <div style={{height: '100%'}} />,
  mapElement: <div style={{height: '100%'}} />,
  markers: state.map.markers,
  map: state.map._map
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleMapMounted,
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
<<<<<<< HEAD
)(Timeline);
=======
)(Timeline); 
>>>>>>> 152f2abe33b17c1a00b49d55135784df68cd076b
