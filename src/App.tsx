import React from 'react';

// 'https://jsonplaceholder.typicode.com/posts',

const App: React.FC = () => {
  const clearData = () => {};

  const fetchData = async () => {};

  return (
    <div style={{ padding: '20px' }}>
      <h1>HELLO WORLD</h1>
      <button onClick={fetchData}>GET POSTS</button>

      <button onClick={clearData}>CLEAR DATA</button>
    </div>
  );
};

export default App;
