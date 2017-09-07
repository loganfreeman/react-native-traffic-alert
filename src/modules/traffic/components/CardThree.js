/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { TMDB_IMG_URL } from '../../../constants/api';
import styles from './styles/CardThree';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

class CardThree extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { info, viewMovie } = this.props;
		return (
			<View style={styles.cardContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={viewMovie.bind(this, info.id)}>
					<View style={styles.card}>
						<Image source={{ uri: `${TMDB_IMG_URL}/w185/${info.poster_path}` }} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text
								style={styles.cardTitle}
								numberOfLines={3}>
								{info.original_title || info.original_name}
							</Text>
							{
								info.hasOwnProperty('release_date') && (
									<View style={styles.cardGenre}>
										<Text style={styles.cardDescription}>Release Date: </Text><Text style={styles.cardDescription}>{info.release_date}</Text>
									</View>
								)
							}
							{
								info.hasOwnProperty('first_air_date') && (
									<View style={styles.cardGenre}>
										<Text style={styles.cardDescription}>First Air Date: </Text><Text style={styles.cardDescription}>{info.first_air_date}</Text>
									</View>
								)
							}
							{
								info.hasOwnProperty('last_air_date') && (
									<View style={styles.cardGenre}>
										<Text style={styles.cardDescription}>Last Air Date: </Text><Text style={styles.cardDescription}>{info.last_air_date}</Text>
									</View>
								)
							}
							<Text style={styles.cardDescription} numberOfLines={3}>
								{info.overview}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

CardThree.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		moviesGenres: state.traffic.genres
	};
}

export default connect(mapStateToProps, null)(CardThree);
