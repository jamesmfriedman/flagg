import React, { useState, useEffect } from 'react';
import { flaggly } from '../core';
import { FlagglyContext } from './context';

export function FlagglyProvider<FF extends ReturnType<typeof flaggly> | any>({
  children,
  featureFlags
}: {
  children: React.ReactNode;
  featureFlags: FF;
}) {
  const [iteration, setIteration] = useState(0);
  const ff = (featureFlags as unknown) as ReturnType<typeof flaggly>;

  useEffect(() => {
    const originalSet = featureFlags.set;

    ff.set = (...args) => {
      const rVal = originalSet(...args);
      setIteration(val => val + 1);
      return rVal;
    };
  }, []);

  return (
    <FlagglyContext.Provider value={{ featureFlags: ff, iteration }}>
      {children}
    </FlagglyContext.Provider>
  );
}
