import React, { useState, useEffect } from 'react';

const TestAPI = () => {
  const [data, setData] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQGIuY29tIiwiaWF0IjoxNjk3MjA1NDg3LCJleHAiOjE2OTk3OTc0ODd9.T3pAYAydzVO22xp_HvjilE5dNMz9XV_JYfop4mhGRPY";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(),
          };
        const response = await fetch('http://localhost:8282/api/tasks/', requestOptions);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData.data);
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
          {data.map((item, index) => {
            return <li key={index}>
              <ol>
                <li>{item.id}</li>
                <li>{item.name}</li>
                <li>{item.uid}</li>
              </ol>
            </li>
          }
          )}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestAPI;