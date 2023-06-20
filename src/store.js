import { observable, action, decorate } from "mobx";

class FeedsStore {
  feeds = [
    { name: 'Naukas', url: 'https://feedpress.me/naukas' },
    { name: 'Quanta Magazine', url: 'http://www.quantamagazine.org/feed/' }
  ];
  feed = "";

  setFeeds(feeds) {
    this.feeds = feeds;
  }

  setSelectedFeed(feed) {
    this.feed = feed;
  }
}

FeedsStore = decorate(FeedsStore, {
  feeds: observable,
  feed: observable,
  setFeeds: action,
  setSelectedFeed: action,
});

export { FeedsStore };
