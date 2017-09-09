import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';
import { Card } from 'react-native-elements';

import styles from './styles/Route';
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

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };

  }

  getDirections(startLoc, destinationLoc) {
    axios.get(`${MAP_DIRECTION_API_URL}?origin=${startLoc}&destination=${destinationLoc}&key=${GOOGLE_API_KEY}&alternatives=true`).then(res => {
      let coords = this.calculateCoords(res.data.routes[0].overview_polyline.points);
      this.setState({
        coords,
        routes: res.data.routes,
        currentRoute: 0
      })
      return coords
    });
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

  jumpRandom() {
    this.setState({ region: this.randomRegion() });
  }

  animateRandom() {
    this.map.animateToRegion(this.randomRegion());
  }

  animateRandomCoordinate() {
    this.map.animateToCoordinate(this.randomCoordinate());
  }

  render() {
    const route = this.props.routes[this.state.current];
    const leg = route.legs[0];
    const steps = leg.steps;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.map}>
          <Card>
            <Text>
              {route.summary}
            </Text>
          </Card>
        </ScrollView>
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
          <TouchableOpacity
            onPress={() => this.animateRandomCoordinate()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (Coordinate)</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Route.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
  routes: PropTypes.array.isRequired
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

Route.navigatorStyle = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Route);
