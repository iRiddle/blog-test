import React, { Component } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import Comment from "../../components/Comment/Comment";

import { getUniqId } from "../../utils";

import "./style.scss";

class Post extends Component {
  state = {
    currentPost: {},
    isRedirect: false,
    userName: "",
    userComment: "",
    isMoreComments: false
  };

  componentDidMount() {
    const idFromPath = parseInt(this.props.location.pathname.split("/")[2]);
    const currentPost = JSON.parse(localStorage.getItem("blogList")).filter(
      item => item.id === idFromPath
    )[0];

    if (currentPost === undefined || currentPost === null) {
      this.setState({
        isRedirect: true
      });
    } else {
      this.setState({
        currentPost,
        idFromPath
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    const idFromPath = parseInt(props.location.pathname.split("/")[2]);
    const currentPost = JSON.parse(localStorage.getItem("blogList")).filter(
      item => item.id === idFromPath
    )[0];
    if (currentPost !== state.currentPost) {
      return {
        currentPost
      };
    }
  }

  handleUserPayload = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  handleMoreComments = () => {
    this.setState({
      isMoreComments: !this.state.isMoreComments
    });
  };

  saveComment = () => {
    const { userName, userComment, idFromPath } = this.state;
    if (!userName.length || !userComment.length) {
      return NotificationManager.error(
        "Имя и комментарий не могут быть пустыми",
        "Ошибка",
        2000
      );
    }

    const comment = {
      id: getUniqId(),
      userName,
      userComment
    };
    const updatedPosts = JSON.parse(localStorage.getItem("blogList")).map(
      item =>
        item.id === idFromPath
          ? {
              ...item,
              commentaries: [...item.commentaries, comment]
            }
          : { ...item }
    );

    localStorage.setItem("blogList", JSON.stringify(updatedPosts));
    this.setState(
      {
        userName: "",
        userComment: ""
      },
      () =>
        NotificationManager.success(
          "Ваш комментарий успешно добавлен!",
          "Уведомление",
          2000
        )
    );
  };

  render() {
    const {
      currentPost,
      isRedirect,
      userName,
      userComment,
      isMoreComments
    } = this.state;
    return (
      <>
        {isRedirect ? (
          <Redirect to="/" />
        ) : (
          <Container>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <h1>{currentPost.title}</h1>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} className="button-record">
                <Link to={`/`}>
                  <Button color="primary">Назад</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p>{currentPost.description}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                {currentPost.commentaries !== undefined && (
                  <p>{`Количество комментариев: ${currentPost.commentaries.length}`}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <h2>Комментарии:</h2>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                {currentPost.commentaries !== undefined &&
                currentPost.commentaries.length > 0 ? (
                  <>
                    {currentPost.commentaries.length > 5 && !isMoreComments ? (
                      <>
                        {currentPost.commentaries.slice(0, 5).map(comment => (
                          <Comment
                            key={comment.id}
                            userName={comment.userName}
                            userComment={comment.userComment}
                          />
                        ))}
                        <div className="link-handle">
                          <a onClick={this.handleMoreComments}>Больше</a>
                        </div>
                      </>
                    ) : (
                      <>
                        {currentPost.commentaries.map(comment => (
                          <Comment
                            key={comment.id}
                            userName={comment.userName}
                            userComment={comment.userComment}
                          />
                        ))}
                        {isMoreComments && (
                          <div className="link-handle">
                            <a onClick={this.handleMoreComments}>Меньше</a>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <h4>К данному посту нет комментариев</h4>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <h2>Оставьте свой комментарий:</h2>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Input
                  type="text"
                  name="title"
                  id="titleId"
                  placeholder="Ваше имя:"
                  value={userName}
                  onChange={e => this.handleUserPayload(e, "userName")}
                  className="user-input"
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Input
                  type="textarea"
                  name="description"
                  id="descriptionId"
                  placeholder="Комментарий:"
                  rows={15}
                  value={userComment}
                  onChange={e => this.handleUserPayload(e, "userComment")}
                  className="user-input"
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button
                  color="primary"
                  className="user-input"
                  onClick={this.saveComment}
                >
                  Оставить комментарий
                </Button>
              </Col>
            </Row>
            <NotificationContainer />
          </Container>
        )}
      </>
    );
  }
}

export default Post;
