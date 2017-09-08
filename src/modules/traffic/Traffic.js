import React, { PropTypes, Component } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform,
	TextInput,
	Button,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from './traffic.actions';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Traffic';
import { iconsMap } from '../../utils/AppIcons';

import { GOOGLE_API_KEY } from '../../constants/api';

import { Card } from 'react-native-elements';

import RNGooglePlaces from 'react-native-google-places';

import MapView, { MAP_TYPES } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Traffic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			place: {

			},
			current: {

			}
		};

		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this.getMyLocation();
	}

	getMyLocation() {
		RNGooglePlaces.getCurrentPlace()
		.then((currentLocation) => {
		this.setState({
			current: currentLocation[0]
		})
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
		})
		.catch(error => {
			this.setState({
			error: error.message
		})});  // error is a Javascript Error object
	}

	componentWillReceiveProps(nextProps) {
	}

	componentWillUpdate(nextProps, nextState) {

	}


	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		this.setState({
			place,
			showRoute: false
		})
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => this.setState({
			error: error.message
		}));  // error is a Javascript Error object
  }

	getRoutes() {
		if(!!this.state.current) {
			this.props.navigator.showModal({
				screen: 'movieapp.MapView',
				title: 'MapView',
				animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
				animationType: 'fade',
				passProps: {
					region: this.state.current
				}
			});
		}

	}




	render() {
		const { nowPlayingMovies, popularMovies } = this.props;
		const iconPlay = <Icon name="md-play" size={21} color="#9F9F9F" style={{ paddingLeft: 3, width: 22 }} />;
		const iconTop = <Icon name="md-trending-up" size={21} color="#9F9F9F" style={{ width: 22 }} />;
		const iconUp = <Icon name="md-recording" size={21} color="#9F9F9F" style={{ width: 22 }} />;
		const iconPopular = <Icon name="md-heart" size={21} color="#9F9F9F" style={{ width: 22 }} />;

		return (
			<View style={styles.container}>
				{
					!!this.state.error && (
						<Text style={styles.descriptionText}>{this.state.error}</Text>
					)
				}
				<View style={styles.buttonGroup}>
				<Button
					title='Pick a Place'
					onPress={() => this.openSearchModal()}>
				</Button>
				<Button
					title='Get routes'
					onPress={() => this.getRoutes()}>
				</Button>
				</View>
				<Card title="Current Location" containerStyle={styles.card}>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Address: </Text>
						<Text style={styles.descriptionText}>{this.state.current.address}</Text>
					</View>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Latitude: </Text>
						<Text style={styles.listHeadingRight}>{this.state.current.latitude}</Text>
					</View>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Longitude: </Text>
						<Text style={styles.listHeadingRight}>{this.state.current.longitude}</Text>
					</View>
				</Card>


				<Card title="Place to go" containerStyle={styles.card}>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Address: </Text>
						<Text style={styles.descriptionText}>{this.state.place.address}</Text>
					</View>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Latitude: </Text>
						<Text style={styles.listHeadingRight}>{this.state.place.latitude}</Text>
					</View>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Longitude: </Text>
						<Text style={styles.listHeadingRight}>{this.state.place.longitude}</Text>
					</View>
				</Card>

			</View>
		);
	}
}

Traffic.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object
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

Traffic.navigatorStyle = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Traffic);
