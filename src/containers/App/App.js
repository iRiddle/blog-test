import React, { Component } from "react";

import { Container, Row, Col, Button } from "reactstrap";
import BlogItem from "../../components/BlogItem/BlogItem";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import { getUniqId } from "../../utils";

import "./style.scss";

class App extends Component {
  state = {
    blogList: JSON.parse(localStorage.getItem("blogList")) || [],
    isModal: false,
    isEdit: false,
    currentTitle: "",
    currentDescription: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.parse(localStorage.getItem("blogList")) !== state.blogList) {
      return {
        blogList: JSON.parse(localStorage.getItem("blogList"))
      };
    }
  }

  toggleModalWindow = () => {
    this.setState({
      isModal: !this.state.isModal,
      currentTitle: "",
      currentDescription: ""
    });
  };

  toggleInfoRecord = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  saveToStore = () => {
    const { currentTitle, currentDescription } = this.state;
    let blogList = JSON.parse(localStorage.getItem("blogList"));
    if (!currentTitle.length) {
      return NotificationManager.error(
        "Заголовок не может быть пустым",
        "Ошибка",
        2000
      );
    }

    if (blogList === null) {
      blogList = [];
    }

    const blogRecord = {
      id: getUniqId(),
      title: currentTitle,
      description: currentDescription,
      commentaries: []
    };

    if (!blogList.some(record => record.id === blogRecord.id)) {
      blogList.push(blogRecord);
    }

    localStorage.setItem("blogList", JSON.stringify(blogList));

    this.setState(
      {
        currentTitle: "",
        currentDescription: ""
      },
      () => this.toggleModalWindow()
    );
  };

  deleteFromStore = id => {
    let blogList = JSON.parse(localStorage.getItem("blogList")).filter(
      item => item.id !== id
    );
    localStorage.setItem("blogList", JSON.stringify(blogList));
    this.forceUpdate();
  };

  toggleEdit = id => {
    let blogItem = JSON.parse(localStorage.getItem("blogList")).filter(
      item => item.id === id
    )[0];

    this.setState({
      isModal: !this.state.isModal,
      isEdit: true,
      currentEditedId: id,
      currentTitle: blogItem.title,
      currentDescription: blogItem.description
    });
  };

  editToStore = () => {
    const { currentEditedId, currentTitle, currentDescription } = this.state;
    if (!currentTitle.length) {
      return NotificationManager.error(
        "Заголовок не может быть пустым",
        "Ошибка",
        2000
      );
    }
    const updatedPosts = JSON.parse(localStorage.getItem("blogList")).map(
      item =>
        item.id === currentEditedId
          ? {
              ...item,
              title: currentTitle,
              description: currentDescription
            }
          : { ...item }
    );
    localStorage.setItem("blogList", JSON.stringify(updatedPosts));
    this.setState({
      isModal: false,
      isEdit: false,
      currentTitle: "",
      currentDescription: ""
    });
  };

  clearStore = () => {
    localStorage.clear();
    this.forceUpdate();
  };

  render() {
    const {
      blogList,
      isModal,
      isEdit,
      currentTitle,
      currentDescription
    } = this.state;
    return (
      <Container>
        <Row>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <h1
              onClick={this.clearStore}
              title="Кликни на меня, чтобы затереть стор"
            >
              Блог
            </h1>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} xl={4} className="button-record">
            <Button
              color="primary"
              onClick={this.toggleModalWindow}
              title='Вы можете стереть стор, кликнув на "Блог"'
            >
              Желаете добавить запись?
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            {blogList === null || !blogList.length ? (
              <h2>В вашем блоге нет записей</h2>
            ) : (
              blogList.map(blog => (
                <BlogItem
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  commentaries={blog.commentaries}
                  deleteFromStore={this.deleteFromStore}
                  toggleEdit={this.toggleEdit}
                />
              ))
            )}
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <ModalWindow
              isModal={isModal}
              isEdit={isEdit}
              toggleModalWindow={this.toggleModalWindow}
              toggleInfoRecord={this.toggleInfoRecord}
              saveToStore={this.saveToStore}
              editToStore={this.editToStore}
              currentTitle={currentTitle}
              currentDescription={currentDescription}
            />
          </Col>
        </Row>
        <NotificationContainer />
      </Container>
    );
  }
}

export default App;
