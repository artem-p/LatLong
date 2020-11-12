import './Control.css';
import Control from 'react-leaflet-control';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function CoordinatesControl(lat, long) {
    return (
        <Control position="topleft" className='coord-control' >
              <Container>
                <Row>
                  <Col>
                    <IconButton aria-label="gps">
                      <GpsFixedIcon />
                    </IconButton>
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
    )
}

export default Control
