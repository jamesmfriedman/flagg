import React, { useContext, useState } from 'react';
import { flaggly } from '../core';
import { FlagDefinitions, FlagDefinition } from '../core';
import { FlagglyContext } from './context';
import styles from './admin-styles';

export function FlagglyAdmin({ onDone }: { onDone?: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { featureFlags: ff } = useContext(FlagglyContext);
  const definitions = getSortedDefinitions(
    ff.getDefinitions(),
    searchTerm.toLowerCase().trim()
  );

  const shareUrl = `${window.location.href}?ff=${encodeURIComponent(
    JSON.stringify(ff.getAllOverridden())
  )}`;

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
          <span className="flaggly-header__name">
            <Icon icon="flag" />
            <span>Flaggly</span>
          </span>
        </div>

        <div className="flaggly-header__end">
          <button
            className="flaggly-button"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            <Icon icon="link" />
          </button>
          <button className="flaggly-button" onClick={reset}>
            <Icon icon="refresh" />
          </button>
          {onDone && (
            <button className="flaggly-button" onClick={onDone}>
              <Icon icon="checkCircle" />
            </button>
          )}
        </div>
      </div>
      <div className="flaggly-categories">
        <div className="flaggly-category flaggly-category--search">
          <Icon icon="search" />
          <input
            value={searchTerm}
            onChange={evt => setSearchTerm(evt.currentTarget.value)}
            className="flaggly-search"
            type="search"
            placeholder="Search Feature Flags"
          />
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
              {values.map(({ flagName, name, definition }) => (
                <Flag
                  key={flagName}
                  name={name}
                  categoryName={categoryName}
                  flagName={flagName}
                  definition={definition}
                  ff={ff}
                />
              ))}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="flaggly-footer">
      Made with ❤️in Sunny FL &middot;{' '}
      <a href="https://github.com/jamesmfriedman/flaggly">Visit Github</a>
    </div>
  );
}

const iconPaths = {
  flag: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z',
  search:
    'M7,0 C3.1458514,0 0,3.1458514 0,7 C0,10.854149 3.1458514,14 7,14 C8.747998,14 10.345009,13.348024 11.574219,12.28125 L12,12.707031 L12,14 L18,20 L20,18 L14,12 L12.707031,12 L12.28125,11.574219 C13.348024,10.345009 14,8.747998 14,7 C14,3.1458514 10.854149,0 7,0 Z M7,2 C9.773268,2 12,4.2267316 12,7 C12,9.773268 9.773268,12 7,12 C4.2267316,12 2,9.773268 2,7 C2,4.2267316 4.2267316,2 7,2 Z',
  refresh:
    'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  checkCircle:
    'M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
  link:
    'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
};

function Icon({
  icon,
  ...props
}: { icon: keyof typeof iconPaths } & React.HTMLProps<any>) {
  const path = iconPaths[icon];
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      className={`flaggly-${icon}-icon`}
    >
      <path fill="currentColor" d={path} />
    </svg>
  );
}

function Flag({
  definition,
  flagName,
  name,
  ff,
  categoryName
}: {
  flagName: string;
  definition: FlagDefinition;
  name: string;
  ff: ReturnType<typeof flaggly>;
  categoryName: string;
}) {
  let control = null;
  const controlType = getControlType(definition);
  const isOverride = ff.isOverridden(flagName);

  switch (controlType) {
    case 'select':
      control = (
        <Select
          value={ff.get(flagName) as string}
          options={definition.options as string[]}
          defaultValue={definition.default as string}
          onChange={evt => ff.set(flagName, evt.currentTarget.value || null)}
        />
      );

      break;
    case 'input':
      control = (
        <Input
          value={ff.get(flagName) as string}
          onChange={evt => ff.set(flagName, evt.currentTarget.value || null)}
        />
      );
      break;
    case 'toggle':
    default:
      control = <Toggle checked={ff.isOn(flagName)} onChange={() => {}} />;
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
          {/* <span className="flaggly-flag__category-name">
            {categoryName}
            {!!categoryName && '.'}
          </span> */}
          <span className="flaggly-flag__flag-name">{name}</span>
        </div>
        {!!definition.description && (
          <div className="flaggly-flag__description">
            {definition.description}
          </div>
        )}
      </div>
      <div
        title={flagName + ' - Default: ' + String(ff.getDefault(flagName))}
        className={[
          'flaggly-control',
          isOverride && 'flaggly-control--override'
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Icon
          icon="flag"
          onClick={evt => {
            evt.stopPropagation();
            ff.set(flagName, ff.getDefault(flagName));
          }}
        />{' '}
        {control}
      </div>
    </div>
  );
}

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
