'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import out from "../public/profile.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'
type BoxProps = {
  imageUrl: string;
  name: string;
  status: string;
  species: string;
};

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: 'white'
};

const titleStyles: React.CSSProperties = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '30px',
  color: '#000000',
  width: '100%',
  textAlign: 'center',
  marginTop: '20px'
};

const SmallBox: React.FC<{ imageUrl: string; name: string; sectiona:string;sectionb:string }> = ({ imageUrl, name,sectiona,sectionb }) => {
  const smallBoxStyles: React.CSSProperties = {
    width: '160px',
    height: '160px',
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '25px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative'
  };

  const nameStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '30px',
    bottom: '117px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '30px',
    textAlign: 'left', 
    color: 'blacl',
    borderRadius: '0 0 15px 15px',
    left:"168px"

  };

  return (
    <div style={smallBoxStyles}>
      <p style={nameStyles}>{name}<br></br>
      <p style={{fontFamily:"Poppins",fontSize:"15px",lineHeight:"22px",fontWeight:"400"}}>{sectiona}</p><br></br>
      <p style={{fontFamily:"Poppins",fontStyle:"italic",fontSize:"15px",lineHeight:"22px",fontWeight:"300",color:"#818181",position:"relative",bottom:"35px"}}>{sectionb}</p></p>
    </div>
  );
};

const Box: React.FC<BoxProps> = ({ imageUrl, name, status, species }) => {
  const boxStyles: React.CSSProperties = {
    width: '420px',
    height: '420px',
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px',
    marginBottom: '70px',
    marginLeft: '12px',
    position: 'relative'
  };

  const nameStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '-88px',
    left: '30%',
    transform: 'translateX(-50%)',
    fontSize: '16px',
    color: '#44281D',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
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
  const [allcharecter,setAllCharecter]=useState([])
  const router=useRouter()
  const { id } = router.query;
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        setData([res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    getallCharecter()
  },[])
  const getallCharecter = () => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((res) => {
        const results = res.data.results;
        const randomIds = getRandomIds(results.length, 6); // Get 6 random IDs
  
        const randomCharacters = results.filter((character: any) =>
          randomIds.includes(character.id)
        );
        const filterdata = randomCharacters.filter((charect: any) => charect.id !== id);
  
        setAllCharecter(filterdata);
      })
      .catch((err) => console.log(err));
  };
  
  const getRandomIds = (max: number, count: number): number[] => {
    const ids: number[] = [];
    while (ids.length < count) {
      const randomId = Math.floor(Math.random() * max) + 1;
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }
    return ids;
  };

  return (
    <div>
    <div onClick={()=>{
      console.log(allcharecter)
      // router.push("/")
    }} style={{position:"relative", bottom:"50px"}}>
 <Image
      src={out}
      width={25}
      height={37}
      alt=""
    />

    </div>
      <h1 style={titleStyles}>Other Characters</h1>
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
        <div style={{ position: 'absolute', top: '190px', left: '650px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', flexWrap: 'wrap' }}>
            {allcharecter.map((data, index) => (
              <div key={index} style={{ width: '50%' }}>
                <SmallBox
                  imageUrl={data.image}
                  name={data.name}
                  sectiona={data.location.name}
                  sectionb={`${data.species} - ${data.gender}`}

                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;