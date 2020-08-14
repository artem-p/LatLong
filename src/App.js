import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


import './App.css';
import map from './Map.js';


const position = [51.505, -0.09]


function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={2}>
            Coordinates
          </Col>
          <Col xs={10}>
            <Row>
              // todo set height to map
            <Map className='map' center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
            </Row>
            Map
            {map}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
