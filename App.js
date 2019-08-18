import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import FeedItem from './FeedItem';

export default class App extends Component {
  state = {
    isLoading: false,
    listArticles: [],
    totalResults: 0,
    page: 1,
    isLoadMore: true,
  };

  componentDidMount = async () => {
    const { page } = this.state;
    this.setState({
      isLoading: false,
    });
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${page}`
    );
    const jsonResponse = await response.json();
    this.setState({
      isLoading: false,
      listArticles: jsonResponse.articles,
      totalResults: response.totalResults,
    });
  };

  onEndReached = async () => {
    const { page, listArticles } = this.state;
    const NewPage = page + 1;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${NewPage}`
    );
    const jsonResponse = await response.json();
    this.setState({
      page: NewPage,
      listArticles: listArticles.concat(jsonResponse.articles),
      totalResults: response.totalResults,
    });
  };

  renderItem = ({ item }) => {
    return <FeedItem item={item} />;
  };

  renderfooter = () => {
    return <ActivityIndicator size="large" color="green" animating={true} />;
  };

  onRefresh = async() => {
    const { listArticles } = this.state;
    await this.setState ({listArticles: []});
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe'
    );
    const jsonResponse = await response.json();
    this.setState({
      listArticles: listArticles.concat(jsonResponse.articles),
      totalResults: response.totalResults,
    });
  }

  render() {
    const { isLoading, listArticles } = this.state;
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" animating={isLoading} />
        <FlatList
          style={styles.FlatList}
          data={listArticles}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderfooter()}
          onRefresh={this.onRefresh}
          refreshing={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatList: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
