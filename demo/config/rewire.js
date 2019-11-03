const path = require('path');
/***********************************
 * Utils
 ***********************************/
const publicPath = process.env.PUBLIC_PATH || '/';

// a simple utility to chain all of our config overrides together
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const getLoaderRoot = config => {
  const oneOf = config.module.rules.find(rule => rule.oneOf);
  if (oneOf) {
    return oneOf.oneOf;
  } else {
    return config.module.rules;
  }
};

const getBabelLoader = config => {
  // Filtering out rules that don't define babel plugins.
  const babelLoaderFilter = rule =>
    rule.loader &&
    rule.loader.includes('babel') &&
    rule.options &&
    rule.options.plugins;

  // First, try to find the babel loader inside the oneOf array.
  // This is where we can find it when working with react-scripts@2.0.3.
  let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf))
    .oneOf;

  let babelLoader = loaders.find(babelLoaderFilter);

  // If the loader was not found, try to find it inside of the "use" array, within the rules.
  // This should work when dealing with react-scripts@2.0.0.next.* versions.
  if (!babelLoader) {
    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), []);
    babelLoader = loaders.find(babelLoaderFilter);
  }
  return babelLoader;
};

// Curried function that uses config to search for babel loader and pushes new plugin to options list.
const addBabelPlugin = plugin => config => {
  getBabelLoader(config).options.plugins.push(plugin);
  return config;
};

/**
 * This adds aliases for the build ../../common -> common/
 */
const addAliases = config => {
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    react: path.resolve('../node_modules/react'),
    flagg: path.resolve('src/flagg')
  };

  const loaders = getLoaderRoot(config);
  loaders.forEach(loader => {
    if (
      loader.test &&
      loader.test.toString() === /\.(js|mjs|jsx|ts|tsx)$/.toString()
    ) {
      loader.include = [loader.include, path.resolve('../src')];
    }
  });

  return config;
};

const enableHotReload = config => {
  if (process.env.NODE_ENV !== 'development') {
    return config;
  }

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-dom': '@hot-loader/react-dom'
  };

  // If in development, add 'react-hot-loader/babel' to babel plugins.
  config = addBabelPlugin('react-hot-loader/babel')(config);

  return config;
};

// Build the webpack config
module.exports = {
  webpack: (config, env) => {
    return pipe(
      addAliases,
      enableHotReload
    )(config);
  }
};
