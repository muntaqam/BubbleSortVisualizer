import React, { useEffect, useState } from 'react';
import BubbleSortChart from './components/bubbleSortChart';
import './App.css';

function App() {
  const data = [25, 30, 45, 60, 20, 65, 75, 100, 55, 1, 42, 90, 89, 77, 13, 10];
  const [sorting, setSorting] = useState('bubble');

  
  useEffect(() => {
    document.title = 'Algorithm Visualizer';
  }, []);

  return (
    <div className="App">
      <h1>Bubble Sort Visualizer</h1>
      <BubbleSortChart data={data} />
    </div>
  );
}

export default App;
