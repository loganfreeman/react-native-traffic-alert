import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0a0a0a'
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
	searchboxBorder: {
		borderRadius: 3,
		backgroundColor: 'white',
		paddingHorizontal: 3
	},
	searchbox: {
		backgroundColor: '#191919',
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginBottom: 16
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
