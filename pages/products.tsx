'use client';
import React, { useEffect, useState } from 'react';
import eclipsegreen from "../public/Ellipsegreen.png";
import eclipsered from "../public/Ellipsered.png";
import eclipsegrey from "../public/Ellipsegrey.png"
import axios from 'axios';
import Image from 'next/image';
import out from "../public/profile.png";
import { useRouter } from 'next/router'
type BoxProps = {
  id:number;
  imageUrl: string;
  name: string;
  status: string;
  species: string;
};


const Box: React.FC<BoxProps> = ({ imageUrl, name,status,species,id}) => {
  const router =useRouter()
  const boxStyles: React.CSSProperties = {
    width: '336px',
    height: '336px',
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px',
    marginBottom: '70px',
    marginLeft:"12px",
    position: 'relative',
  };
  const nameStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '-68px',
    left: '30%',
    transform: 'translateX(-50%)',
    fontSize: '16px',
    color: '#44281D',
    fontWeight: 'Poppins',

  };
  const handleBoxClick = (id: number) => {
    console.log(`Box clicked: ${id}`);
    router.push(`/cart?id=${id}`);
  };

  return (
    <div style={boxStyles} onClick={() => handleBoxClick(id)}>
    <p style={nameStyles}>
      {name} <br />
      {status} - {species}
    </p>
  </div>
  )
};

const Charecter: React.FC = () => {
  const [data,setData]=useState([])
  const [filterStatus, setFilterStatus] = useState('');
  const [rendering, setRendering] = useState([]);
    const router = useRouter();
  const { locationName } = router.query;
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  const buttonsContainerStyles: React.CSSProperties = {
    display: 'flex',
    marginBottom: '20px',
  };

  const buttonStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    width: '120px',
    height: '40px',
    background: `url(${eclipsegrey})`,
    backgroundSize: 'cover',
    border: '1px solid #B8B8B8',
    borderRadius: '50px',
  };
  const buttonStylesred: React.CSSProperties = {
    boxSizing: 'border-box',
    width: '120px',
    height: '40px',
    background: `url(${eclipsegrey})`,
    backgroundSize: 'cover',
    border: '1px solid #B90000',
    borderRadius: '50px',
  };
  const buttonStylesgreen: React.CSSProperties = {
    boxSizing: 'border-box',
    width: '120px',
    height: '40px',
    background: `url(${eclipsegrey})`,
    backgroundSize: 'cover',
    border: '1px solid #98CD4D',
    borderRadius: '50px',
  };
  useEffect(() => {
    getData();
  });
// get all the charecter have the same name selected in home page
  const getData = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character`)
      .then((res) => {
        const filteredData = res.data.results.filter((char: any) => {
          return char.location.name === locationName;
        });
        setData(filteredData);
      })
      .catch((err) => console.log(err));
  };
// set the filter of dispaly
  const handleFilter = (status: string) => {
    let filteredData = [];

    if (status === 'Dead') {
      filteredData = data.filter((char: any) => char.status === 'Dead');
    } else if (status === 'Alive') {
      filteredData = data.filter((char: any) => char.status === 'Alive');
    } else if (status === 'Unknown') {
      filteredData = data.filter((char: any) => char.status === 'unknown');
    } else {
      filteredData = data;
    }

    setRendering(filteredData);
  };
 

  return (
    <div>
<div onClick={() => {
        router.push("/")
      }} style={{ position: "relative", bottom: "50px" }}>
        <Image
          src={out}
          width={20}
          height={20}
          alt=""
        />
      </div>

    <h1 onClick={()=>{  
    }}>Filter by status</h1>
  <div style={buttonsContainerStyles}>
        <button style={buttonStylesred} onClick={() => handleFilter('Dead')}>
          Dead
        </button>
        <button style={buttonStylesgreen} onClick={() => handleFilter('Alive')}>
          Alive
        </button>
        <button style={buttonStyles} onClick={() => handleFilter('Unknown')}>
          Unknown
        </button>
      </div>
      <div style={containerStyles}>
        {(rendering.length > 0 ? rendering : data).map((boxData:any) => (
          <Box key={boxData.id} imageUrl={boxData.image} name={boxData.name} status={boxData.status} species={boxData.species} id={boxData.id}     />
        ))}
      </div>
      <div>
      </div>
    </div>
  );
};

export default Charecter;
