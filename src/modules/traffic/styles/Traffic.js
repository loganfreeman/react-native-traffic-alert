import {
	Platform,
	StyleSheet,
	Dimensions
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0a0a0a',
	},
	card: {
		alignSelf: 'stretch',
	},
	flexCenter: {
		flexDirection: 'row',
	},
	bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
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

	},
	map: {
		flex: 1,
		width: '100%',
		marginTop: 10
  }
});

export default styles;
