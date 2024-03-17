// import { select, templates } from './settings.js';

import Song from './Song.js';
// import { utils } from './utils.js';

class SongList {
  constructor(wrapper, songs) {
    console.log('wrapper, songs:', wrapper, songs);
    console.log('SongList:', this);
    const thisSongList = this;
    thisSongList.dom = {};
    thisSongList.dom.element = wrapper;
    // thisApp.data = {};
    // thisApp.data.songs = songs;

    thisSongList.songs = [];
    for (let songDataId in songs) {
      const songData = songs[songDataId];
      thisSongList.songs.push(new Song(songData, wrapper));
    }
    console.log('thisSongList.songs:', thisSongList.songs);
    return thisSongList;
  }
}

export default SongList;
