import React, { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from 'react-bootstrap';
import { getFeedListing } from "./requests";
import './HomePage.css';

function useInfiniteScroll(callback, loading) {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      callback();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, loading]);
}

function HomePage({ feedsStore }) {
  const [initialized, setInitialized] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);
  const [allNews, setAllNews] = useState([]);

  const fetchMoreData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCount(prevCount => prevCount + 10);
      setNews(allNews.slice(0, count));
      setLoading(false);
    }, 2000);
  }, [count, allNews]);

  useInfiniteScroll(fetchMoreData, loading);

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

    Promise.all(feedsStore.feeds.map(feed => getFeedListing(feed.url)))
      .then(responses => {
        const allNewsData = [].concat(...responses.map(res => res.data.items));
        allNewsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setAllNews(allNewsData);
        setNews(allNewsData.slice(0, count));
      })
      .catch(err => console.error(err));
  }, [initialized, feedsStore, count]);

  return (
    <div className="home-page">
      <Row className="row d-flex">
        {news.map((item, index) => (
          <Col xs={12} md={8} lg={6} xl={4} className="mb-4">
            <Card key={index} className="card-animation">
              <Card.Body>
                <Card.Title className="p-0">{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{new Date(item.pubDate).toDateString()} - {item.source}</Card.Subtitle>
                <Card.Text>
                  {item.description}
                </Card.Text>
                <Button variant="primary" href={item.link} target="_blank" rel="noopener noreferrer">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && <h4>Loading more items...</h4>}
    </div>
  );
}

export default observer(HomePage);
