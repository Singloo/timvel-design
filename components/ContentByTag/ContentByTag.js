import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Card from './Card';
import Tag from '../Tag';
import Separator from '../Separator';
class ContentByTag extends Component {
  render() {
    const { tag, posts, onPressCard, onPressTag } = this.props;
    const renderCard = posts.map((item, index) => {
      return (
        <Card
          key={'cbt' + index.toString()}
          post={item}
          onPressCard={() => {}}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'flex-start',
            paddingBottom: 0,
            marginLeft: 10,
          }}
        >
          <Tag title={tag} style={{ marginLeft: 10 }} />
        </View>
        <ScrollView
          style={{
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 20,
            marginTop: 5,
          }}
          horizontal={true}
        >
          {renderCard}
        </ScrollView>
        {/* <View
          style={{
            marginLeft: 20,
            marginTop: 10,
            backgroundColor: colors.midGrey,
            height: 2,
          }}
        /> */}
        <Separator
          style={{ marginLeft: 20, marginTop: 10 }}
          colors={['rgba(33,33,33,0.1)', 'rgba(33,33,33,0.6)']}
          // colors={['rgba(33,33,33,0.8)', 'rgba(33,33,33,0.1)']}
        />
      </View>
    );
  }
}
ContentByTag.propTypes = {};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
  },
});

export default ContentByTag;
