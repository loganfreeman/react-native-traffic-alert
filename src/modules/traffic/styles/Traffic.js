import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0a0a0a',
		alignItems: 'center',
		justifyContent: 'center'
	},
	flexCenter: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	textInput: {
		backgroundColor: 'white',
		...Platform.select({
			ios: {
				height: 35
			},
			android: {
				height: 48
			}
		})
	},
	descriptionText: {
	  color: 'white',//Colors.transparentColor,
	  fontSize: 16,
	  flex: 0.8,
	  textAlign: 'center',
	  flexWrap: 'wrap'
	},
	seperator: {
		marginTop: 10,
		backgroundColor: '#8E8E8E'
	},
	listHeading: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
		marginTop: 30
	},
	listHeadingLeft: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
	},
	listHeadingRight: {
		color: 'white',
		...Platform.select({
			ios: {
				fontSize: 15
			},
			android: {
				fontSize: 16
			}
		})
	}
});

export default styles;
