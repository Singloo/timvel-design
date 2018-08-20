import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Touchable from '../Touchable';
import Card from './Card';
import Tag from '../Tag';
import { base } from '../../../js/utils';
import { Separator } from '../..';
const { colors } = base;
class ContentByTag extends Component {
  render() {
    const {} = this.props;
    const renderCard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
      return (
        <Card
          key={index}
          date={'2018-07-29'}
          onPressCard={() => {}}
          imageUrl={
            index % 2 == 0
              ? 'http://lc-uygandza.cn-n1.lcfile.com/bd742bc14e0b0a74e0fa.jpg'
              : ''
          }
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
          <Tag title={'daily'} style={{ marginLeft: 10 }} />
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
