'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
type BoxProps = {
  imageUrl: string;
  name: string;
  status: string;
  species: string;
};

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor:"white"
};
const titlestyles:React.CSSProperties={
position: "absolute",
width: "345px",
height: "30px",
left:" 637px",
top: "159px",
fontfamily: 'Poppins',
fontstyle: " normal",
fontweight: "600",
fontSize: "24px",
lineheight: "30px",
color: "#000000",
}

const SmallBox: React.FC<{ imageUrl: string; name: string }> = ({
  imageUrl,
  name,
}) => {
  const smallBoxStyles: React.CSSProperties = {
    position: 'relative',
    width: '120px',
    height: '120px',
    left: '638px',
    top: '110px',
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    borderRadius: '15px',
  };

  const nameStyles: React.CSSProperties = {
    position: 'absolute',
    width: '100px',
    height: '30px',
    right: '-100%',
    top: '5px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '30px',
  };

  return (
    <div style={smallBoxStyles}>
      <p style={nameStyles}>{name}</p>
    </div>
  );
};

const Box: React.FC<BoxProps> = ({ imageUrl, name, status, species }) => {
  const boxStyles: React.CSSProperties = {
    left: "39px",
    top: "179px", 
    width: '350px',
    height: '350px',
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px',
    marginBottom: '70px',
    marginLeft: '12px',
    position: 'absolute',
  };
  const nameStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '-88px',
    left: '30%',
    transform: 'translateX(-50%)',
    fontSize: '16px',
    color: '#44281D',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  };

  return (
    <div style={boxStyles}>
      <p style={nameStyles}>
        {name}
        <br />
        {status} - {species}
      </p>
    </div>
  );
};

const Cart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []); // Add an empty dependency array to run the effect only once

  const getData = () => {
    axios
      .get('https://rickandmortyapi.com/api/character/2')
      .then((res) => {
        setData([res.data]); // Wrap the response data in an array
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={containerStyles}>
      {data.map((boxData) => (
        <Box
          key={boxData.id}
          imageUrl={boxData.image}
          name={boxData.name}
          status={boxData.status}
          species={boxData.species}
        />
      ))}
              <h1 style={titlestyles}>Other Characters</h1>
<div>
  <SmallBox imageUrl='https://rickandmortyapi.com/api/character/avatar/2.jpeg'   name="Small Box 1" />
</div>
    </div>
  );
};

export default Cart;