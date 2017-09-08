import React, { PropTypes, Component } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform,
	TextInput,
	Button
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

import RNGooglePlaces from 'react-native-google-places';

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
			place
		})
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => this.setState({
			error: error.message
		}));  // error is a Javascript Error object
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
			<Text style={styles.listHeadingLeft}>
				Current Location:
			</Text>
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
				<Button
					title='Pick a Place'
					onPress={() => this.openSearchModal()}>
				</Button>
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
