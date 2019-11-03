import {
  useFeatureFlag as ffUseFeatureFlag,
  useFeatureValue as ffUseFeatureValue
} from 'flaggly/react';
import { FlagValue } from 'flaggly';

export const definitions = {
  'app.title': {
    default: 'ACME Corp'
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
