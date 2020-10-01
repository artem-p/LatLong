import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Control from 'react-leaflet-control';
import {CopyToClipboard} from 'react-copy-to-clipboard';


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
      marker: { position: { lat: position[0], lng: position[1] } }
    }

    this.markerRef = React.createRef();

    this.onLatInputChange = this.onLatInputChange.bind(this);
    this.onLonInputChange = this.onLonInputChange.bind(this);
    this.handleMarkerMove = this.handleMarkerMove.bind(this);
    this.openMarkerPopup = this.openMarkerPopup.bind(this);
  }


  componentDidMount() {
    setTimeout(this.openMarkerPopup, 100);  // set timeout so popup opens after marker placed on map
  }


  moveMarker = (e) => {
    this.saveMarkerPosition(e.latlng);

    this.openMarkerPopup();
  }

  saveMarkerPosition(latlng) {
    // save marker position in state
    // round coordinates to 6 digits

    let lat = latlng.lat.toFixed(6);
    let lon = latlng.lng.toFixed(6);

    this.setState({marker: {position: {lat: lat, lng: lon}}});
  }


  openMarkerPopup() {
    let marker = this.markerRef.current;
    if (marker != null) {
      marker.leafletElement.openPopup();
    }
  }

  onLatInputChange(event) {
    let lat = event.target.value;

    let lng = this.state.marker.position.lng;

    this.setState({ marker: { position: { lat: lat, lng: lng } } });
  }


  onLonInputChange(event) {
    let lng = event.target.value;

    let lat = this.state.marker.position.lat;

    this.setState({ marker: { position: { lat: lat, lng: lng } } });
  }


  handleMarkerMove(event) {
    this.saveMarkerPosition(event.target.getLatLng());

    this.openMarkerPopup();
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
              position={this.state.marker.position}
              onMoveEnd={this.handleMarkerMove}
              ref={this.markerRef}
            >
              <Popup>{this.state.marker.position.lat}, {this.state.marker.position.lng}</Popup>
            </Marker>

            <Control position="topleft" className='coord-control' >
              <Container>
                <Row>
                  <Col>
                    <Form>
                      <Form.Group>
                        <Form.Label>Latitude</Form.Label>

                        <Form.Row>
                          <Col xs={9}>
                            <Form.Control type="text" value={this.state.marker.position.lat} onChange={this.onLatInputChange} />
                          </Col>

                          <Col xs={3}>
                            <CopyToClipboard text={this.state.marker.position.lat}>
                              <Button>Copy</Button>
                            </CopyToClipboard>
                          </Col>
                        </Form.Row>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Longitude</Form.Label>

                        <Form.Row>
                          <Col xs={9}>
                          <Form.Control type="text" value={this.state.marker.position.lng} onChange={this.onLonInputChange} />
                          </Col>

                          <Col xs={3}>
                            <CopyToClipboard text={this.state.marker.position.lng}>
                              <Button>Copy</Button>
                            </CopyToClipboard>
                          </Col>
                        </Form.Row>
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
