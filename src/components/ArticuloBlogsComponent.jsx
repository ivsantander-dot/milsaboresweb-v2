import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'


export default function ArticuloBlogsComponent(props) {
    const tituloBlog = props.tituloBlog;
    const descripcionBlog = props.descripcionBlog;
    const fotoBlog = props.fotoBlog;
  return (
    <>
    <Container className="my-4">
      <Row className="p-3 border rounded align-items-center">
        <Col lg={8} className="mb-3 text-center text-lg-start">
          <header>
            <h3>{tituloBlog}</h3>
          </header>
          <p>{descripcionBlog}</p>
          <Button variant="primary" href="/blogsArticle1" className="mi-button">
            Ver artículo
          </Button>
        </Col>

        <Col lg={4} className="text-center">
          <Image
            src={fotoBlog}
            fluid
            rounded
            className="w-75 mx-auto"
          />
        </Col>
      </Row>
    </Container>

    </>
  )
}
