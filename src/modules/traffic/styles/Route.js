import {
	Platform,
	StyleSheet,
	Dimensions
} from 'react-native';

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'white'
  },
  map: {
		alignSelf: 'stretch'
  },
	summary: {
		fontSize: 24,
		marginBottom: 10
	},
	steps: {
		flex: 1
	},
	step: {
		flexDirection: 'column'
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
});

export default styles;
