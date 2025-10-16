import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import links from "../../links";
import style from "../ArticuloBlogs/ArticuloBlogs.module.css";

export default function ArticuloBlogsComponent(props) {
    const tituloBlog = props.tituloBlog;
    const descripcionBlog = props.descripcionBlog;
    const fotoBlog = props.fotoBlog;
    const linkBlog = props.linkBlog;
  return (
    <>
    <Container className="my-4" style={{ backgroundColor: "var(--color-light)"}}>
      <Row className="p-3 border rounded align-items-center">
        <Col lg={8} className="mb-3 text-center text-lg-start">
          <header>
            <h3>{tituloBlog}</h3>
          </header>
          <p>{descripcionBlog}</p>
          <Link to={links[linkBlog]}>
            <Button variant="primary" className={style.btnVerMas}>
              Ver artículo
            </Button>
          </Link>
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
