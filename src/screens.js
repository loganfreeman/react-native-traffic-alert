/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Traffic from './modules/traffic/Traffic';
import MapViewDemo from './modules/traffic/MapView';
import Route from './modules/traffic/Route';


export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Traffic', () => Traffic, store, Provider);
	Navigation.registerComponent('movieapp.MapView', () => MapViewDemo, store, Provider);
	Navigation.registerComponent('movieapp.Route', () => Route, store, Provider);
	Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
