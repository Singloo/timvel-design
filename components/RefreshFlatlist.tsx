import * as React from 'react';
import {
  FlatList,
  FlatListProps,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
class RefreshFlatlist extends React.Component<IProps> {
  render() {
    const {
      onHeaderRefresh,
      onFooterRefresh,
      isHeaderLoading,
      animated,
      ...childProps
    } = this.props;
    const Comp = animated ? AnimatedFlatList : FlatList;
    return (
      <Comp
        onRefresh={onHeaderRefresh}
        refreshing={isHeaderLoading}
        onEndReached={onFooterRefresh}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.01}
        {...childProps}
      />
    );
  }
  _renderFooter = () => {
    const { isFooterLoading } = this.props;
    if (!isFooterLoading) {
      return null;
    }
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  };
}
interface IProps extends FlatListProps<any> {
  onHeaderRefresh?: () => void;
  onFooterRefresh?: () => void;
  isHeaderLoading?: boolean;
  animated?: boolean;
  isFooterLoading?: boolean;
}
export default RefreshFlatlist;
