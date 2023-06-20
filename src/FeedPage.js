import React, { useState, useEffect } from "react";
import "./FeedPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import * as yup from "yup";
import { getFeedListing } from "./requests";

function ListingCard({ listing, openLink }) {
  return (
    <Card>
      <Card.Title className="card-title">{listing.title}</Card.Title>
      <Card.Body>
        <p>{listing.description}</p>
        <p>{listing.content}</p>
        <Button variant="primary" onClick={() => openLink(listing.link)}>
          Open
        </Button>{" "}
      </Card.Body>
    </Card>
  );
}

function FeedPage({ feedsStore, location }) {
  const [initialized, setInitialized] = useState(false);
  const [listings, setListings] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const getListings = async url => {
    try {
      const response = await getFeedListing(url);
      setListings(response.data.items);
      setData(response.data.feed);
      setError(null);
    } catch (ex) {
      setError(ex.message);
    }
  };

  const openLink = url => {
    window.location.href = url;
  };

  useEffect(() => {
    if (!initialized) {
      const params = new URLSearchParams(location.search);
      const url = params.get('url');
      getListings(url);
      setInitialized(true);
    }
  }, [initialized, location.search]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feed-page">
      <h1 className="center title">
        {data.image && <img src={data.image} alt={data.title} />} {data.title}
      </h1>
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} openLink={openLink} />
      ))}
    </div>
  );
}

export default withRouter(observer(FeedPage));
