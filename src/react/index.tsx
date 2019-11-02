import React, { useContext, useState, useEffect, useRef } from 'react';
import { flaggly, FlagDefinitions, FlagDefinition } from '../core';
import { inMemoryStore } from '../storage';
import styles from './admin-styles';

/****************************************************************
 * Provider
 ****************************************************************/
const FlagglyContext = React.createContext({
  featureFlags: flaggly({ storage: inMemoryStore() }),
  iteration: 0
});

export function FlagglyProvider({
  children,
  featureFlags
}: {
  children: React.ReactNode;
  featureFlags: ReturnType<typeof flaggly>;
}) {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const originalSet = featureFlags.set;

    featureFlags.set = (...args) => {
      const rVal = originalSet(...args);
      setIteration(val => val + 1);
      return rVal;
    };
  }, []);

  return (
    <FlagglyContext.Provider value={{ featureFlags, iteration }}>
      {children}
    </FlagglyContext.Provider>
  );
}

/****************************************************************
 * Hooks
 ****************************************************************/
export const useFeatureFlag = <T extends string>(flagName: T) => {
  const { featureFlags } = useContext(FlagglyContext);
  return featureFlags.isOn(flagName);
};

export const useFeatureValue = <T extends string>(flagName: T) => {
  const { featureFlags } = useContext(FlagglyContext);
  return featureFlags.get(flagName);
};

/****************************************************************
 * Admin
 ****************************************************************/

function Toggle({ ...props }: React.HTMLProps<HTMLInputElement>) {
  return <input type="checkbox" className="flaggly-toggle" {...props} />;
}

function Input({ ...props }: React.HTMLProps<HTMLInputElement>) {
  return <input type="text" className="flaggly-input" {...props} />;
}

function Select({
  options,
  defaultValue,
  value,
  ...props
}: { options: string[]; defaultValue?: string } & React.HTMLProps<
  HTMLSelectElement
>) {
  return (
    <select className="flaggly-select" value={value || ''} {...props}>
      {!defaultValue && <option value={''}>-- OFF --</option>}
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

type FlagglyAdminProps = {
  renderSelect?: (
    props: { options: string[]; defaultValue: string } & React.HTMLProps<
      HTMLSelectElement
    >
  ) => React.ReactElement;
  renderInput?: (
    props: React.HTMLProps<HTMLInputElement>
  ) => React.ReactElement;
  renderToggle?: (
    props: React.HTMLProps<HTMLInputElement>
  ) => React.ReactElement;
};

export function FlagglyAdmin({
  renderToggle = Toggle,
  renderSelect = Select,
  renderInput = Input
}: FlagglyAdminProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { featureFlags: ff } = useContext(FlagglyContext);
  const definitions = getSortedDefinitions(
    ff.getDefinitions(),
    searchTerm.toLowerCase().trim()
  );

  const reset = () => {
    Object.entries(ff.getDefinitions()).forEach(([flagName, flagDef]) => {
      ff.set(flagName, ff.getDefault(flagName));
    });
  };

  return (
    <div className="flaggly">
      <style>{styles}</style>
      <div className="flaggly-header">
        <div className="flaggly-header__lead">
          <span className="flaggly-header__name">Flaggly</span>

          <svg
            className="flaggly-search-icon"
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M7,0 C3.1458514,0 0,3.1458514 0,7 C0,10.854149 3.1458514,14 7,14 C8.747998,14 10.345009,13.348024 11.574219,12.28125 L12,12.707031 L12,14 L18,20 L20,18 L14,12 L12.707031,12 L12.28125,11.574219 C13.348024,10.345009 14,8.747998 14,7 C14,3.1458514 10.854149,0 7,0 Z M7,2 C9.773268,2 12,4.2267316 12,7 C12,9.773268 9.773268,12 7,12 C4.2267316,12 2,9.773268 2,7 C2,4.2267316 4.2267316,2 7,2 Z"
            ></path>
          </svg>
          <input
            value={searchTerm}
            onChange={evt => setSearchTerm(evt.currentTarget.value)}
            className="flaggly-search"
            type="search"
            placeholder="Search Feature Flags"
          />
        </div>

        <div>
          <button className="flaggly-button" onClick={reset}>
            Reset
          </button>
          <button className="flaggly-button">Done</button>
        </div>
      </div>
      {!definitions.length && (
        <div className="flaggly-zero">Nothing to see here...</div>
      )}
      {definitions.map(({ categoryName, values }) => {
        return (
          <div key={categoryName} className="flaggly-category">
            <div className="flaggly-category__name">
              {categoryName || 'Flags'}
            </div>
            {values.map(({ flagName, name, definition }) => {
              let control = null;
              const controlType = getControlType(definition);
              const isOverride =
                controlType === 'toggle'
                  ? ff.isOn(flagName) !== !!ff.getDefault(flagName)
                  : ff.get(flagName) !== ff.getDefault(flagName);

              switch (controlType) {
                case 'select':
                  control = renderSelect({
                    value: ff.get(flagName) as string,
                    options: definition.options as string[],
                    defaultValue: definition.default as string,
                    onChange: evt =>
                      ff.set(flagName, evt.currentTarget.value || null)
                  });
                  break;
                case 'input':
                  control = renderInput({
                    value: ff.get(flagName) as string,
                    onChange: evt =>
                      ff.set(flagName, evt.currentTarget.value || null)
                  });
                  break;
                case 'toggle':
                default:
                  control = renderToggle({
                    checked: ff.isOn(flagName),
                    onChange: () => {}
                  });
              }

              return (
                <div
                  key={flagName}
                  className="flaggly-flag"
                  onClick={
                    controlType === 'toggle'
                      ? () => ff.set(flagName, !ff.get(flagName))
                      : undefined
                  }
                >
                  <div>
                    <div className="flaggly-flag__name">
                      <span className="flaggly-flag__category-name">
                        {categoryName}
                        {!!categoryName && '.'}
                      </span>
                      <span className="flaggly-flag__flag-name">{name}</span>
                    </div>
                    {!!definition.description && (
                      <div className="flaggly-flag__description">
                        {definition.description}
                      </div>
                    )}
                  </div>
                  <div className="flaggly-control">
                    {isOverride && (
                      <span className="flaggly-override">Override</span>
                    )}{' '}
                    {control}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const getControlType = (definition: FlagDefinition) => {
  if (definition.options) {
    return 'select';
  }

  if (typeof definition.default === 'string') {
    return 'input';
  }

  return 'toggle';
};

const getSortedDefinitions = (
  definitions: FlagDefinitions,
  searchTerm: string
) => {
  const defsMap = Object.entries(definitions).reduce<{
    [key: string]: Array<{
      name: string;
      flagName: string;
      definition: FlagDefinition;
    }>;
  }>((acc, [flagName, flagDef]) => {
    const parts = flagName.split('.', 2);
    const category = parts.length > 1 ? parts[0] : '';
    const name = parts.pop() as string;
    acc[category] = acc[category] || [];

    const shouldAdd =
      !searchTerm ||
      (flagName.toLowerCase().includes(searchTerm) ||
        (flagDef.description || '').toLowerCase().includes(searchTerm));

    shouldAdd &&
      acc[category].push({
        flagName,
        name,
        definition: flagDef
      });
    return acc;
  }, {});

  return Object.entries(defsMap)
    .filter(([, values]) => values.length)
    .map(([categoryName, values]) => {
      return {
        categoryName,
        values: values.sort((a, b) => (a.name > b.name ? 1 : -1))
      };
    })
    .sort((a, b) => (a.categoryName > b.categoryName ? 1 : -1));
};
