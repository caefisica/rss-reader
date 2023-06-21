import { observable, action } from "mobx";

class FeedsStore {
  @observable feeds = [];

  @action setFeeds = (feeds) => {
    this.feeds = feeds;
  }
}

const feedsStore = new FeedsStore();

export default feedsStore;
