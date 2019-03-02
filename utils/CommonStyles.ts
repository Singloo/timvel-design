/*
 * File: /Users/origami/Desktop/timvel/re-kits/utils/CommonStyles.ts
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Friday March 1st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 2nd 2019 10:34:44 am
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Styles;
