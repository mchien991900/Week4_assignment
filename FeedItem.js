import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    const {
      item: { url },
    } = this.props;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  render() {
    const {
      item: { title, urlToImage, url },
    } = this.props;
    return (
      <View style={styles.Card}>
        <Image source={{ uri: urlToImage }} style={styles.Image} />
        <Text>{title}</Text>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={styles.TextButton}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  Image: {
    width: 320,
    height: 200,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  TextButton: {
    fontSize : 20,
    fontWeight: 'bold',
    color: 'white'
  }
});
