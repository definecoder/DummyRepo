import React, { useState, useEffect } from 'react';

const TestAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: "m@m", password: "m"}),
          };
        const response = await fetch('http://localhost:8282/api/tasks/', requestOptions);
        const jsonData = await response.json();
        console.log(jsonData.token);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data:</h1>
      {data ? (
        <ul>          
            <li>{data.token}</li>
            <li>{data.msg}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestAPI;