import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0a0a0a',
		alignItems: 'center',
	},
	card: {
		alignSelf: 'stretch',
	},
	flexCenter: {
		flexDirection: 'row',
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'stretch',
	},
	descriptionText: {
		flex: 0.8,
	  textAlign: 'center',
	  flexWrap: 'wrap'
	},
	seperator: {
		marginTop: 10,
		backgroundColor: '#8E8E8E'
	},
	listHeading: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	},
	listHeadingLeft: {
		fontWeight: 'bold',
	},
	listHeadingRight: {

	}
});

export default styles;
