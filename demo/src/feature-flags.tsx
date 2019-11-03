import {
  useFeatureFlag as ffUseFeatureFlag,
  useFeatureValue as ffUseFeatureValue
} from 'flagg/react';
import { FlagValue } from 'flagg';

export const definitions = {
  'app.title': {
    default: 'InstaSnap'
  },
  'app.darkMode': {
    default: false
  },
  'app.brandColor': {
    default: '#6200ee',
    options: ['#6200ee', '#009688', '#e91e64']
  },
  'app.bottomNav': {
    default: false
  },
  'developer.debug': {},
  'developer.enableFlagg': {
    default: true,
    description: 'Very meta... A feature flag to enable Flagg.'
  },
  'developer.enableExperimentalFeatures': {},
  'developer.apiUrl': {
    default: 'http://www.example.com/graphql'
  },
  'home.enableV2OptIn': {
    default: true
  },
  'home.v2': {
    default: false
  }
};

export const useFeatureFlag = (flagName: keyof typeof definitions) =>
  ffUseFeatureFlag(flagName);
export const useFeatureValue = <T extends FlagValue>(
  flagName: keyof typeof definitions
) => ffUseFeatureValue<T>(flagName);
