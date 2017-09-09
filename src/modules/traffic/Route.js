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
import HTMLView from 'react-native-htmlview';

import styles from './styles/Route';
import * as moviesActions from './traffic.actions';
import { GOOGLE_API_KEY } from '../../constants/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Polyline from '@mapbox/polyline';
import Share from 'react-native-share';

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

  onRouteSelect(route) {
    this.setState({
      route
    })
  }

  onScrollEndDrag() {
    this.setState({
      showRoutes: !this.state.showRoutes
    })
  }

  render() {
    const { route } = this.props;

    const htmlViewStyle = StyleSheet.create({
      p: {
        fontWeight: '300',
        fontSize: 16,
        marginBottom: 10,
      },
    });
    const steps = route.legs[0].steps.map((step, i) => {
      return (
        <View style={styles.step} key={i}>
          <HTMLView stylesheet={htmlViewStyle} value={`<p>${step.html_instructions}</p>`} />
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card title={`Via ${route.summary}`}>
            {steps}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

Route.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
  route: PropTypes.object.isRequired
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
