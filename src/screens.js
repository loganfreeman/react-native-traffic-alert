/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Traffic from './modules/traffic/Traffic';
import MapViewDemo from './modules/traffic/MapViewDemo';
import Elevation from './modules/traffic/Elevation';
import Route from './modules/traffic/Route';
import Report from './modules/traffic/Report';


export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Traffic', () => Traffic, store, Provider);
	Navigation.registerComponent('movieapp.MapView', () => MapViewDemo, store, Provider);
	Navigation.registerComponent('movieapp.Elevation', () => Elevation, store, Provider);
	Navigation.registerComponent('movieapp.Route', () => Route, store, Provider);
	Navigation.registerComponent('movieapp.Report', () => Report, store, Provider);
	Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
