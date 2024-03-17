'use strict';

import { settings, select, classNames } from './settings.js';

import SongList from './songlist.js';

const app = {
  init() {
    const thisApp = this;
    console.log('app.init()');
    thisApp.initPages();

    thisApp.initData();
  },

  initData() {
    const thisApp = this;

    const url = settings.db.url + '/' + settings.db.songs;

    thisApp.data = {};
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.songs = parsedResponse;
        thisApp.initSongList();
      });
    console.log('thisApp.data:', thisApp.data);
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
  initSongList: function () {
    const thisApp = this;
    const songlistWrapper = document.querySelector(select.containerOf.songlist);
    thisApp.songList = new SongList(songlistWrapper, thisApp.data.songs);
  },
};

app.init();
