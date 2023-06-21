import React, { useState, useEffect } from "react";
import "./SourcesPage.css";
import { observer } from "mobx-react";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  url: yup
    .string()
    .required("URL is required")
    .matches(
      /(https?:\/\/)?([\w-])+.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
      "Invalid URL"
    ),
});

function SourcesPage({ feedsStore }) {
  const [initialized, setInitialized] = useState(false);

  const handleSubmit = async evt => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    feedsStore.feeds.push(evt);
    feedsStore.setFeeds(feedsStore.feeds);
    localStorage.setItem("feeds", JSON.stringify(feedsStore.feeds));
  };

  const deleteFeed = index => {
    feedsStore.feeds.splice(index, 1);
    feedsStore.setFeeds(feedsStore.feeds);
    localStorage.setItem("feeds", JSON.stringify(feedsStore.feeds));
  };

  useEffect(() => {
    if (!initialized) {
      let rssFeeds = [];
      try {
        rssFeeds = JSON.parse(localStorage.getItem("feeds"));
        if (Array.isArray(rssFeeds)) {
          feedsStore.setFeeds(rssFeeds);
        } else {
          feedsStore.setFeeds(feedsStore.feeds);
        }
      } catch (ex) {}
      setInitialized(true);

    }
  }, [initialized, feedsStore]);

  return (
    <div className="sources-page">
      <h1 className="center">Fuentes de noticias</h1>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ name: '', url: '' }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="name" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={values.name || ""}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="url" className="mb-3">
                <Form.Label>Enlace</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  placeholder="Enlace"
                  value={values.url || ""}
                  onChange={handleChange}
                  isInvalid={touched.url && errors.url}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" className="mb-3">Añadir</Button>
          </Form>
        )}
      </Formik>
      <br />
      {feedsStore.feeds.map((f, i) => {
        return (
          <Card key={i} className="mb-4 card-animation">
            <Card.Body>
              <Card.Title className="p-0">{f.name}</Card.Title>
              <Card.Text>
                {f.url}
              </Card.Text>
              <Button variant="danger" onClick={() => deleteFeed(i)}>
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
export default observer(SourcesPage);
