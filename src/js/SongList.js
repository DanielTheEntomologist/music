// import { select, templates } from './settings.js';

import Song from './song.js';
// import { utils } from './utils.js';

class SongList {
  constructor(wrapper, songs) {
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

    return thisSongList;
  }
}

export default SongList;
