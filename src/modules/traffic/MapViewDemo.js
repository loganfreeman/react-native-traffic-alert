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

import styles from './styles/MapViewDemo';
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

class MapViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: props.current.latitude,
        longitude: props.current.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      coords: [],
      routes: []
    };

    this.getDirections(this.getLocationString(props.current), this.getLocationString(props.destination));
    this.getDistance(this.getLocationString(props.current), this.getLocationString(props.destination));
  }

  getDirections(startLoc, destinationLoc) {
    axios.get(`${MAP_DIRECTION_API_URL}?origin=${startLoc}&destination=${destinationLoc}&key=${GOOGLE_API_KEY}&alternatives=true`).then(res => {
      let coords = this.calculateCoords(res.data.routes[0].overview_polyline.points);
      this.setState({
        coords,
        routes: res.data.routes,
        currentRoute: 0
      });
      this.zoom();
      return coords
    });
  }

  zoom() {
    this.map.fitToCoordinates(this.state.coords, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }

  getDistance(startLoc, destinationLoc) {
    axios.get(`${DISTANCE_API_URL}?origins=${startLoc}&destinations=${destinationLoc}&key=${GOOGLE_API_KEY}&units=imperial`).then(res => {
      this.setState({
        duration: res.data.rows[0].elements[0].duration.text,
        distance: res.data.rows[0].elements[0].distance.text
      });
    }).catch(error => {
      console.log(error)
    })
  }

  showAlternative() {
    if(this.state.routes.length > 1) {
      let currentRoute = (this.state.currentRoute + 1) % this.state.routes.length;
      let coords = this.calculateCoords(this.state.routes[currentRoute].overview_polyline.points);
      this.setState({
        currentRoute,
        coords
      })
    }
  }

  showRoute() {
    this.props.navigator.showModal({
      screen: 'movieapp.Route',
      title: 'Routes',
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: 'fade',
      passProps: {
        route: this.state.routes[this.state.currentRoute],
      }
    });
  }

  calculateCoords(points) {
    return Polyline.decode(points).map((point, index) => {
        return  {
            latitude : point[0],
            longitude : point[1]
        }
    });
  }

  getLocationString(pos) {
    return `${pos.latitude},${pos.longitude}`;
  }

  componentWillReceiveProps(nextProps) {

	}

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.TERRAIN}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor="red"/>
        </MapView>
        {
          this.state.duration && this.state.distance && (
            <View style={[styles.bubble, styles.latlng]}>
              <Text style={{ textAlign: 'center' }}>
                {this.state.distance},
                {this.state.duration}
              </Text>
            </View>
          )
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.showAlternative()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Show Alternative</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.showRoute()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Show route detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MapViewDemo.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
  current: PropTypes.object.isRequired,
  destination: PropTypes.object.isRequired
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

MapViewDemo.navigatorStyle = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MapViewDemo);