import React from 'react';
import './App.css';
import { FlagglyAdmin, useFeatureFlag, useFeatureValue } from './flaggly/react';

const App: React.FC = () => {
  const one = useFeatureFlag('helloWorld');
  const two = useFeatureValue('home.dessertChoice');
  return (
    <div className="App">
      <FlagglyAdmin />
      <div>One: {JSON.stringify(one)}</div>
      <div>Two: {two}</div>
    </div>
  );
};

export default App;
