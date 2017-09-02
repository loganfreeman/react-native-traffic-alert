import React, { PropTypes } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Linking
} from 'react-native';

import styles from './styles/Casts';
import { TMDB_IMG_URL, IMDB_URL, TMDB_URL, TMDB_API_KEY } from '../../../constants/api';
import axios from 'axios';


const Casts = ({ info, getTabHeight }) => {
	let computedHeight = (80 + 15) * info.casts.cast.length; // (castImage.height + castContainer.marginBottom)
	computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)
	function onPress(person_id) {
		axios.get(`${TMDB_URL}/person/${person_id}?api_key=${TMDB_API_KEY}`)
							.then(res => {
								Linking.openURL(`${IMDB_URL}/name/${res.data.imdb_id}`)
							});
	}
	return (
		<View style={styles.container} onLayout={getTabHeight.bind(this, 'casts', computedHeight)}>
			{
				info.casts.cast.map(item => (
					<TouchableOpacity key={item.cast_id} onPress={onPress.bind(this, item.id)}>
						<View style={styles.castContainer}>
							<Image source={{ uri: `${TMDB_IMG_URL}/w185/${item.profile_path}` }} style={styles.castImage} />
							<View style={styles.characterContainer}>
								<Text style={styles.characterName}>
									{item.name}
								</Text>
								<Text style={styles.asCharacter}>
									{item.character && `as ${item.character}`}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				))
			}
		</View>
	);
};

Casts.propTypes = {
	info: PropTypes.object.isRequired,
	getTabHeight: PropTypes.func.isRequired
};

export default Casts;
