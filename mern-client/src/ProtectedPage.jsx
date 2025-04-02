import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('jwt_token'); // Get the token from localStorage

      try {
        // Make authenticated request
        const response = await axios.get('http://localhost:5000/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching protected data', error);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {data ? (
        <div>
          <p>{data.message}</p>
          <p>User: {JSON.stringify(data.user)}</p>
        </div>
      ) : (
        <p>Loading protected data...</p>
      )}
    </div>
  );
};

export default ProtectedPage;
