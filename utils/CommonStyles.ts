/*
 * File: /Users/origami/Desktop/timvel/re-kits/utils/CommonStyles.ts
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Friday March 1st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday May 6th 2019 7:57:28 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { Platform, StyleSheet } from 'react-native';
const Styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  shadow: Platform.select({
    ios: {
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        height: 4,
        width: 3,
      },
      backgroundColor: 'white',
    },
    android: { elevation: 1, backgroundColor: 'white' },
  }),
  shadowLight: Platform.select({
    ios: {
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: {
        height: 8,
        width: 6,
      },
      backgroundColor: 'white',
    },
    android: { elevation: 1, backgroundColor: 'white' },
  }),
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textShadow: {
    textShadowColor: '#f5f5f5',
    textShadowOffset: {
      width: 1.5,
      height: 0,
    },
    textShadowRadius: 5,
  },
});
export default Styles;
