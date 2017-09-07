/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true
};

class App extends Component {
	constructor(props) {
		super(props);
		iconsLoaded.then(() => {
			this.startApp();
		});
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Traffic',
					screen: 'movieapp.Traffic',
					icon: iconsMap['ios-film-outline'],
					selectedIcon: iconsMap['ios-film'],
					title: 'Traffic',
					navigatorStyle,
					navigatorButtons: {
						rightButtons: [
							{
								title: 'Search',
								id: 'search',
								icon: iconsMap['ios-search']
							}
						]
					}
				},
				{
					label: 'TV Shows',
					screen: 'movieapp.Traffic',
					icon: iconsMap['ios-desktop-outline'],
					selectedIcon: iconsMap['ios-desktop'],
					title: 'Traffic',
					navigatorStyle
				}
			],
			tabsStyle: {
				tabBarButtonColor: 'white',
				tabBarSelectedButtonColor: 'white',
				tabBarBackgroundColor: 'black'
			}
		});
	}
}

export default App;
