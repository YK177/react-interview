import React, { useRef, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const clearData = () => {
    setData([]);
    setError(null);
    setLoading(false);
    abortController?.current?.abort();
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    abortController?.current?.abort();
    abortController.current = new AbortController();

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        { signal: abortController.current.signal },
      );

      setData(response.data.map((post: any) => post.title));
      setLoading(false);
    } catch (err: any) {
      if (err?.message !== 'canceled') {
        setError('Failed to fetch data.');
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>HELLO WORLD</h1>
      <button onClick={fetchData}>GET POSTS</button>

      <button onClick={clearData}>CLEAR DATA</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
