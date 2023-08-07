import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//function App() {
//const[photo, setPhoto] = useState();  
//useEffect(()=>{
  //axios('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=121&camera=fhaz&api_key=DFmWGctZTFOfOflqKyhDA4AzhhxTFPMVbSZe0uvm').
  //then((res)=> setPhoto(res.data.photos))
//}, []);
//console.log(photo);
  //return (
    //<div className="App">
      
      //{photo != null ? photo.map((iter => <div><img src={iter.img_src}/></div>)):'refresh page'}
    //</div>
  //)
//}

//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const API_KEY = 'DFmWGctZTFOfOflqKyhDA4AzhhxTFPMVbSZe0uvm';
const API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;

const App = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get(API_URL);
      setPhotos(response.data.photos);
    };
    fetchPhotos();
  }, []);

  const handleSort = () => {
    const sortedPhotos = [...photos].sort((a, b) => a.earth_date.localeCompare(b.earth_date));
    setPhotos(sortedPhotos);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleSort}>Sort by date</Button>
        </Col>
      </Row>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} md={4}>
            <Card>
              <Card.Img variant="top" src={photo.img_src} />
              <Card.Body>
                <Card.Title>{photo.rover.name}</Card.Title>
                <Card.Text>
                  {photo.earth_date}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App
