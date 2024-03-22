// import { select, templates } from './settings.js';

import Song from './Song.js';
// import { utils } from './utils.js';

class SongList {
  constructor(wrapper, songs) {
    const thisSongList = this;
    thisSongList.dom = {};
    thisSongList.dom.element = wrapper;

    thisSongList.songs = [];
    for (let songDataId in songs) {
      const songData = songs[songDataId];
      thisSongList.songs.push(new Song(songData, wrapper));
    }

    return thisSongList;
  }
  clearSongs() {
    const thisSongList = this;
    thisSongList.dom.element.innerHTML = '';

    for (let songId of thisSongList.songs) {
      // let song = thisSongList.songs[songId]; // eslint-disable-line no-unused-vars
      // song = null; // eslint-disable-line no-unused-vars
      delete thisSongList.songs[songId];
    }

    thisSongList.songs = [];
  }

  refreshSonglist(songsData) {
    const thisSongList = this;

    thisSongList.clearSongs();

    thisSongList.songs = [];
    for (let songDataId in songsData) {
      const songData = songsData[songDataId];
      thisSongList.songs.push(new Song(songData, thisSongList.dom.element));
    }
  }
}

export default SongList;
