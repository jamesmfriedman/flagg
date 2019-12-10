import { useFeatureFlag as ffUseFeatureFlag } from 'flagg/react';
import { FlagValue, FlagDefinitions } from 'flagg';

export const definitions: FlagDefinitions = {
  app_title: {
    default: 'InstaSnap'
  },
  app_darkMode: {
    default: false
  },
  app_brandColor: {
    default: '#6200ee',
    options: ['#6200ee', '#009688', '#e91e64']
  },
  app_bottomNav: {
    default: false
  },
  app_whitelabel: {
    options: ['Corp 1', 'Corp 2', 'Another Company'],
    default: false
  },
  developer_debug: {
    default: false
  },
  developer_enableFlagg: {
    default: true,
    description: 'Very meta... A feature flag to enable Flagg.'
  },
  developer_enableExperimentalFeatures: {},
  developer_apiUrl: {
    default: 'http://www.example.com/graphql'
  },
  home_enableV2OptIn: {
    default: true
  },
  home_v2: {
    default: false
  }
};

export const useFeatureFlag = <T extends FlagValue>(
  flagName: keyof typeof definitions
) => ffUseFeatureFlag<T>(flagName);
