import React from 'react'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';

import Container from 'react-bootstrap/Container';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Error404() {
    const [mouseEntered,editMouseEntered] = useState(false)
    return (<Container className="mt-5 mb-5 d-flex justify-content-center">

        <Row className="display-4 w-100 text-center d-block">

            {!mouseEntered && <Col><SentimentDissatisfiedIcon style={{ fontSize: 300 }} /></Col>}
            {mouseEntered && <Col><SentimentVerySatisfiedOutlinedIcon style={{ fontSize: 300 }} /></Col>}
            <Col>Where are you going? <span className="text-danger">It's a 404!!!</span></Col>
            <Col><Link className="btn btn-outline-dark" to="/" onMouseEnter={()=>editMouseEntered(true)} onMouseLeave={()=>editMouseEntered(false)}>Take me Back!</Link></Col>
        </Row>
    </Container>)
}

export default Error404