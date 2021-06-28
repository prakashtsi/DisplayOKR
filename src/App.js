// npm imports
import React, { useState, useEffect } from 'react';

// custom imports
import ObjectivesKeyResults from './Containers/ObjectivesKeyResults';

// Creating context
export const DbData = React.createContext([])

const App = () => {
  const [keyResults, setKeyResults] = useState([]);

  // Calling api and storing the JSON in local state to be passed using Context API
  useEffect(() => {
    fetch('https://okrcentral.github.io/sample-okrs/db.json')
      .then(response => response.json())
      .then(response => setKeyResults(response.data))
  }, []);

  return (
    <DbData.Provider value={keyResults}>
      <ObjectivesKeyResults />
    </DbData.Provider>
  );
}

export default App;
