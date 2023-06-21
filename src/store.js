import { observable, action, decorate } from "mobx";

class FeedsStore {
  feeds = [
    { name: 'OGCRI-UNMSM', url: 'https://cooperacion-unmsm.blogspot.com/feeds/posts/default?alt=rss' },
    { name: 'PRONABEC', url: 'https://www.gob.pe/busquedas.rss?categoria[]=10-educacion&contenido[]=noticias&institucion[]=pronabec&sheet=1&sort_by=recent' },
    { name: 'Naukas', url: 'https://feedpress.me/naukas' },
    { name: 'Quanta Magazine', url: 'http://www.quantamagazine.org/feed/' },
    { name: 'Symmetry Magazine', url: 'https://www.symmetrymagazine.org/feed'},
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
