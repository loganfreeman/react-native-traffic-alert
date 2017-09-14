import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';

import styles from './styles/TrafficReport';
import * as moviesActions from './traffic.actions';
import { GOOGLE_API_KEY } from '../../constants/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Polyline from '@mapbox/polyline';
import RNGooglePlaces from 'react-native-google-places';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MAP_DIRECTION_API_URL = "https://maps.googleapis.com/maps/api/directions/json";

const DISTANCE_API_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

const ELEVATION_API_URL = "https://maps.googleapis.com/maps/api/elevation/json";

const INITIAL_REGION = {
  latitude: 40.777619,
  longitude:  -111.888167,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
}

class TrafficReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      region: null,
      coords: [],
      routes: []
    };
  }

  componentDidMount() {
    this.props.actions.retrieveTrafficReport();
  }

  onMapReady() {
    this.getMyLocation();
  }

  getMyLocation() {
		RNGooglePlaces.getCurrentPlace()
		.then((latlng) => {
        let region = latlng[0];
		    this.map.animateToCoordinate(region, 1000);
        this.setState({ region });
		// destination represents user's selection from the
		// suggestions and it is a simplified Google Place object.
		})
		.catch(error => {
			this.setState({
			error: error.message
		})});  // error is a Javascript Error object
	}

  getLocationString(pos) {
    return `${pos.latitude},${pos.longitude}`;
  }

  componentWillReceiveProps(nextProps) {

	}

  onRegionChange(region) {
    this.setState({ region });
  }

  onPress(e) {
    let data = e.nativeEvent ? e.nativeEvent : e;
    let markers = this.state.markers.concat([data.coordinate]);
    this.setState({
      markers
    });
    this.map.animateToCoordinate(data.coordinate, 1000);
  }


  render() {
    const { marker } = this.state;
    const { incidents, constructions} = this.props.report;
    const myMarkersCount = this.state.markers.length;
    const incidentsCount = (incidents && incidents.length) || 0;
    const incidentImgSource = require('../../img/incident.png');
    const constructionImgSource = require('../../img/traffic-cone.png');
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.TERRAIN}
          style={styles.map}
          showsTraffic={true}
          initialRegion={INITIAL_REGION}
          onMapReady={this.onMapReady.bind(this)}
          onPress={this.onPress.bind(this)}
          onRegionChange={region => this.onRegionChange(region)}>

          {this.state.markers.map((marker, i) => (
            <MapView.Marker coordinate={marker} key={i}/>
          ))
          }
          {
            incidents && incidents.map((incident, i) => (
              <MapView.Marker coordinate={incident.zoomto} key={i+myMarkersCount}>
                <Image
                  source={incidentImgSource}
                  style={{ height: 40, width: 40 }}
                />
              </MapView.Marker>
            ))
          }
          {
            constructions && constructions.map((construction, i) => (
              <MapView.Marker coordinate={construction.zoomto} key={i+myMarkersCount+incidentsCount}>
                  <Image
                    source={constructionImgSource}
                    style={{ height: 40, width: 40 }}
                  />
              </MapView.Marker>
            ))
          }
        </MapView>

        {
          this.state.region && (
            <View style={[styles.bubble, styles.latlng]}>
              <Text style={{ textAlign: 'center' }}>
              {this.state.region.latitude.toPrecision(7)},
              {this.state.region.longitude.toPrecision(7)}
              </Text>
            </View>
          )
        }


        <View style={styles.buttonContainer}>

        </View>
      </View>
    );
  }
}

TrafficReport.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
  report: PropTypes.object.isRequired
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

TrafficReport.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
    report: state.traffic.report
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrafficReport);
