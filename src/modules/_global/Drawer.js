import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/Drawer';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToTraffic = this._goToTraffic.bind(this);
		this._goToTrafficReport = this._goToTrafficReport.bind(this);
	}



	_goToTraffic() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Traffic',
			title: 'Traffic',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  		animationType: 'fade'
		});
	}


	_goToTrafficReport() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Report',
			title: 'Traffic report',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  		animationType: 'fade'
		});
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}


	render() {
		const iconCar = (<Icon name="md-car" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconTraffic = (<Icon name="md-alert" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._goToTraffic}>
							<View style={styles.drawerListItem}>
								{iconCar}
								<Text style={styles.drawerListItemText}>
									Traffic
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToTrafficReport}>
							<View style={styles.drawerListItem}>
								{iconTraffic}
								<Text style={styles.drawerListItemText}>
									Traffic Report
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;
