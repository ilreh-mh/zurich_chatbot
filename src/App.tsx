import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {count}
        </p>
        <button onClick={() => setCount(count+1)}>
          click
        </button>
      </header>
    </div>
  );
}

export default App;
