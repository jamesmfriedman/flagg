import React, { useState, useEffect } from 'react';
import { flagg } from '../core';
import { FlaggContext } from './context';

export function FlaggProvider<FF extends ReturnType<typeof flagg> | any>({
  children,
  featureFlags
}: {
  children: React.ReactNode;
  featureFlags: FF;
}) {
  const [iteration, setIteration] = useState(0);
  const ff = (featureFlags as unknown) as ReturnType<typeof flagg>;

  useEffect(() => {
    const originalSet = featureFlags.set;

    ff.set = (...args) => {
      const rVal = originalSet(...args);
      setIteration(val => val + 1);
      return rVal;
    };
  }, []);

  return (
    <FlaggContext.Provider value={{ featureFlags: ff, iteration }}>
      {children}
    </FlaggContext.Provider>
  );
}
