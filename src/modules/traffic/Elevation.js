import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';

import styles from './styles/Elevation';
import * as moviesActions from './traffic.actions';
import { GOOGLE_API_KEY } from '../../constants/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Polyline from '@mapbox/polyline';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MAP_DIRECTION_API_URL = "https://maps.googleapis.com/maps/api/directions/json";

const DISTANCE_API_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

const ELEVATION_API_URL = "https://maps.googleapis.com/maps/api/elevation/json";

class Elevation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [props.current],
      region: {
        latitude: props.current.latitude,
        longitude: props.current.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      coords: [],
      routes: []
    };
    this.getMyElevation(this.getLocationString(this.state.region));
  }

  getLocationString(pos) {
    return `${pos.latitude},${pos.longitude}`;
  }

  componentWillReceiveProps(nextProps) {

	}

  onRegionChange(region) {
    this.setState({ region });
  }

  onLongPress(e) {
    let data = e.nativeEvent ? e.nativeEvent : e;
    let markers = this.state.markers.concat([data.coordinate]);
    this.setState({
      markers
    });
    this.getMyElevation(this.getLocationString(data.coordinate));
  }

  getMyElevation(locations) {
    axios.get(`${ELEVATION_API_URL}?locations=${locations}&key=${GOOGLE_API_KEY}`).then(res => {
      this.setState({
        elevation: res.data.results[0].elevation
      })
    });
  }

  render() {
    const { marker } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.TERRAIN}
          style={styles.map}
          initialRegion={this.state.region}
          onLongPress={this.onLongPress.bind(this)}
          onRegionChange={region => this.onRegionChange(region)}>

          {this.state.markers.map((marker, i) => (
            <MapView.Marker coordinate={marker} key={i}/>
          ))
          }
        </MapView>

        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center' }}>
            Elevation: {Math.floor(this.state.elevation)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>

        </View>
      </View>
    );
  }
}

Elevation.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
  current: PropTypes.object.isRequired
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

Elevation.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Elevation);
