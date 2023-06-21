import React, { useState, useEffect, useCallback, useRef } from "react";
import { observer } from "mobx-react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from 'react-bootstrap';
import { getFeedListing } from "./requests";
import './HomePage.css';

function useInfiniteScroll(callback) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight * 0.95) {
        return;
      }
      callback();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

function HomePage({ feedsStore }) {
  const [initialized, setInitialized] = useState(false);
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(12);
  const [allNews, setAllNews] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loading = useRef(false);

  const fetchMoreData = useCallback(() => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    loading.current = true;
  
    const nextCount = count + 12;
  
    if (allNews.length <= nextCount) {
      setEndReached(true);
      setNews(prevNews => [...prevNews, ...allNews.slice(count)]); 
    } else {
      setNews(prevNews => [...prevNews, ...allNews.slice(count, nextCount)]); 
    }
  
    setCount(nextCount);
  
    setIsLoading(false);
    loading.current = false;
    setShowNotice(true);
    setTimeout(() => setShowNotice(false), 2000);
  }, [allNews, count, endReached, isLoading]);  

  useInfiniteScroll(fetchMoreData);

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

    loading.current = true;
    Promise.all(feedsStore.feeds.map(feed => getFeedListing(feed.url)))
      .then(responses => {
        const allNewsData = [].concat(...responses.map(res => res.data.items));
        allNewsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setAllNews(allNewsData);
        setNews(allNewsData.slice(0, 12)); // Set the first 12 items as news
      })
      .catch(err => {
        console.error(err);
        setEndReached(true);
      })
      .finally(() => {
        loading.current = false;
        setIsLoading(false);
      });
  }, [initialized, feedsStore]);

  return (
    <div className="home-page">
      <Row className="d-flex justify-content-center">
      {news.map((item, index) => (
        <Col xs={12} md={8} lg={6} xl={4} className="mb-4" key={item.id}>
          <Card className="card-animation">
            <Card.Body>
              <Card.Title className="p-0">{item.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{new Date(item.pubDate).toDateString()} - {item.source}</Card.Subtitle>
              <Card.Text>
                {
                  (() => {
                    let text = stripHtml(item.description);
                    return text.length > 200 
                      ? `${text.substring(0, 200)}...` 
                      : text
                  })()
                }
              </Card.Text>
              <Button variant="primary" href={item.link} target="_blank" rel="noopener noreferrer">
                Read More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
      {isLoading && <h4>Loading more items...</h4>}
      {showNotice && <div className="notice-card">New items added!</div>}
      {!isLoading && endReached && <div className="end-message"><h4>You got to the end!</h4></div>}
    </div>
  );
}

export default observer(HomePage);
