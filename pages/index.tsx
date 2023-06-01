'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Define the Location type
type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

const Home: React.FC = () => {
  const [data, setData] = useState<Location[]>([]); // Store the location data
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages
  const prev: string = '<'; // Previous page arrow character
  const next: string = '>'; // Next page arrow character
  const router = useRouter();

  useEffect(() => {
    // Fetch data when the currentPage changes
    getData();
  }, [currentPage]);

  const getData = () => {
    // Fetch location data from the API
    axios
      .get(`https://rickandmortyapi.com/api/location?page=${currentPage}`)
      .then((res) => {
        setData(res.data.results); // Set the fetched location data
        setTotalPages(res.data.info.pages); // Set the total number of pages
      })
      .catch((err) => console.log(err));
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '900px',
  };

  const boxStyles: React.CSSProperties = {
    width: '440px',
    height: '180px',
    background: '#EFE04B',
    borderRadius: '15px',
    marginBottom: '20px',
  };

  const paginationStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const handleBoxClick = (locationName: string) => {
    // Handle box click event, navigate to the products page with locationName parameter
    console.log(`Box clicked: ${locationName}`);
    router.push(`/products?locationName=${locationName}`);
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div style={containerStyles}>
        {data.map((location: Location, index: number) => (
          <div style={boxStyles} key={location.id} onClick={() => handleBoxClick(location.name)}>
            <h2>{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Dimensions: {location.dimension}</p>
            <p>Resident Count: {location.residents.length}</p>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={paginationStyles}>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>{prev}</button>
          )}
          {Array.from({ length: totalPages }).map((_, index: number) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: '0 5px',
                backgroundColor: 'white',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '22px',
              }}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>{next}</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;