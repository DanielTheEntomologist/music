'use strict';

import { settings, select, classNames } from './settings.js';

import SongList from './components/SongList.js';
import Searchbar from './components/Searchbar.js';

const app = {
  init() {
    const thisApp = this;
    console.log('app.init()');
    thisApp.initPages();

    thisApp.initData().then(() => {
      thisApp.initSongLists();
      thisApp.initSearchbar();
    });

    thisApp.initSearch();
  },

  initData() {
    const thisApp = this;

    const url = settings.db.url + '/' + settings.db.songs;

    thisApp.data = {};

    return new Promise(function (resolve, reject) {
      fetch(url)
        .then(function (rawResponse) {
          return rawResponse.json();
        })
        .then(function (parsedResponse) {
          thisApp.data.songs = parsedResponse;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      console.log('thisApp.data:', thisApp.data);
    });
  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;

    const navLinks = document.querySelectorAll(select.nav.links);
    console.log('navLinks:', navLinks);
    const homeNavLinks = document.querySelectorAll(select.home.actionLinks);
    console.log('homeNavLinks:', homeNavLinks);

    thisApp.navLinks = [...navLinks, ...homeNavLinks];
    console.log('thisApp.navLinks:', thisApp.navLinks);

    // get url hash
    const idFromHash = window.location.hash.replace('#/', '');

    // find if any page is matching hash from url
    let pageHashCorrect = false;
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageHashCorrect = true;
        break;
      }
    }

    // if no page is matching hash from url, set first page as active
    let id = idFromHash;
    if (!pageHashCorrect) {
      id = thisApp.pages[0].id;
      window.location.hash = '#/' + id;
    }

    thisApp.activatePage(id);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const clickedElement = this;
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
  initSongLists: function () {
    const thisApp = this;

    const homeSonglistWrapper = document.querySelector(
      select.page.home + ' ' + select.containerOf.songlist
    );

    const searchSonglistWrapper = document.querySelector(
      select.page.search + ' ' + select.containerOf.songlist
    );
    const discoverSonglistWrapper = document.querySelector(
      select.page.discover + ' ' + select.containerOf.songlist
    );

    thisApp.homeSongList = new SongList(
      homeSonglistWrapper,
      thisApp.data.songs
    );

    thisApp.searchSongList = new SongList(searchSonglistWrapper, []);

    // random int between 0 and len of songs
    const randomIndex = Math.floor(Math.random() * thisApp.data.songs.length);

    thisApp.discoverSongList = new SongList(discoverSonglistWrapper, [
      thisApp.data.songs[randomIndex],
    ]);
  },

  initSearchbar: function () {
    const thisApp = this;
    const searchbarWrapper = document.querySelector(select.searchbar.wrapper);
    thisApp.searchbar = new Searchbar(searchbarWrapper);
  },

  initSearch: function () {
    const thisApp = this;
    const searchbarWrapper = document.querySelector(select.searchbar.wrapper);
    searchbarWrapper.addEventListener('search', function (event) {
      event.preventDefault();
      console.log('event.detail.value:', event.detail.value);
      thisApp.songList.filterSongs(event.detail.value);
    });
  },
};

app.init();
