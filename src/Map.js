import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Control from 'react-leaflet-control';


import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [51.505, -0.09];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export class MapMain extends React.Component {
  constructor() {
    super();

    this.state = {
      marker: { position: position }
    }
  }

  moveMarker = (e) => {
    this.setState({ marker: { position: e.latlng } })
  }


  render() {
    return (
      <div className="App">
        <Container fluid>
          <Map
            className='map'
            center={position}
            zoom={13}
            onclick={this.moveMarker}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker
              draggable={true}
              position={this.state.marker.position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>

            <Control position="topleft" className='coord-control' >
                <Container>
                  <Row>
                    <Col>
                      <Form>
                        <Form.Group>
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control type="text"/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control type="text"/>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Container>
            </Control>
          </Map>
        </Container>
      </div>
    );
  }
}
