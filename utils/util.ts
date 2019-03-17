/*
 * File: /Users/origami/Desktop/timvel/re-kits/utils/utils.js
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Thursday February 28th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday March 17th 2019 12:00:46 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { StyleSheet, Platform, Dimensions } from 'react-native';
import _ from 'lodash';
const flattenStyles = (...styles: any[]) =>
  StyleSheet.flatten(
    styles.map((style: any) =>
      Array.isArray(style) ? StyleSheet.flatten(style) : style,
    ),
  );
const booleanMap = (bool: any, v1: any, v2: any) => (!!bool ? v1 : v2);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const X_WIDTH = 375;
const X_HEIGHT = 812;

const XR_WIDTH = 414;
const XR_HEIGHT = 896;

const _isIphoneX =
  isIos &&
  ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
    (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT));
const _isIphoneXR =
  isIos &&
  ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) ||
    (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT));

const isIphoneX = _isIphoneX || _isIphoneXR;

const PADDING_TOP = booleanMap(isAndroid, 0, booleanMap(isIphoneX, 44, 20));
const ANDROID_TRANSPARENT_PADDING_TOP = booleanMap(isAndroid, 30, 0);
const PADDING_TOP_FULL = booleanMap(
  isAndroid,
  ANDROID_TRANSPARENT_PADDING_TOP,
  PADDING_TOP,
);
const PADDING_BOTTOM = booleanMap(isIphoneX, 34, 0);
const NAV_BAR_HEIGHT = isIos ? (isIphoneX ? 44 + 44 : 20 + 44) : 44;
const NAV_BAR_HEIGHT_FULL = booleanMap(
  isAndroid,
  44 + ANDROID_TRANSPARENT_PADDING_TOP,
  NAV_BAR_HEIGHT,
);
const TAB_BAR_HEIGHT = isIphoneX ? 34 + 48 : 48;
const toDegree = (angle: number) => {
  return angle * (Math.PI / 180);
};
const cosR = (degree: number, r: number) => {
  let de = toDegree(degree);
  return Math.cos(de) * r;
};
const sinR = (degree: number, r: number) => {
  let de = toDegree(degree);
  return Math.sin(de) * r;
};
const randomItem = (
  arr: any[],
  returnLength: number,
  returnArray?: any[],
): any[] => {
  let returnNum = returnLength || 1;
  let returnArr = returnArray || [];
  let i = Math.floor(Math.random() * arr.length);
  let item = arr[i];
  if (typeof item === 'undefined') {
    return returnArr;
  } else {
    returnArr.push(item);
  }
  if (returnArr.length === returnNum) {
    if (returnNum === 1) {
      return returnArr[0];
    } else {
      return returnArr;
    }
  } else {
    const newArr = _.difference(arr, returnArr);
    return randomItem(newArr, returnNum, returnArr);
  }
};
export default {
  randomItem,
  cosR,
  sinR,
  flattenStyles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  isIos,
  isAndroid,
  isIphoneX,
  PADDING_TOP,
  PADDING_BOTTOM,
  NAV_BAR_HEIGHT,
  TAB_BAR_HEIGHT,
  ANDROID_TRANSPARENT_PADDING_TOP,
  PADDING_TOP_FULL,
  NAV_BAR_HEIGHT_FULL,
};
