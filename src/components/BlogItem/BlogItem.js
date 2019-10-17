import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row
} from "reactstrap";

import { Link } from "react-router-dom";

import "./style.scss";

const BlogItem = ({
  title,
  description,
  commentaries,
  id,
  deleteFromStore,
  toggleEdit
}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <h4>{title}</h4>
          </CardTitle>
          <CardText>{description}</CardText>
          <CardSubtitle>{`Количество комментариев: ${commentaries.length}`}</CardSubtitle>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Link to={`/post/${id}`}>
                <Button color="info">Подробнее</Button>
              </Link>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} className="button-danger">
              <Button color="danger" onClick={() => deleteFromStore(id)}>
                Удалить
              </Button>
              <Button color="warning" onClick={() => toggleEdit(id)}>
                Редактировать
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default BlogItem;
