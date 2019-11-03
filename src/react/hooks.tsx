import { useContext } from 'react';
import { FlaggContext } from './context';
import { FlagValue } from '../core';

/****************************************************************
 * Hooks
 ****************************************************************/

export const useFeatureFlag = (
  flagName: string
): [boolean, (value: FlagValue) => void] => {
  const { featureFlags } = useContext(FlaggContext);
  return [
    featureFlags.isOn(flagName),
    (value: FlagValue) => featureFlags.set(flagName, value)
  ];
};

export const useFeatureValue = <T extends FlagValue>(
  flagName: string
): [T, (value: FlagValue) => void] => {
  const { featureFlags } = useContext(FlaggContext);
  return [
    (featureFlags.get(flagName) as unknown) as T,
    (value: FlagValue) => featureFlags.set(flagName, value)
  ];
};
