import { select, templates } from '../settings.js';

import GreenAudioPlayer from '../../vendor/greenplayer/js/main.js';
import { utils } from '../utils.js';

class Song {
  constructor(data, wrapper) {
    const thisSong = this;

    thisSong.data = data;
    thisSong.renderInList(wrapper);
  }

  renderInList(wrapper) {
    const thisSong = this;
    const generatedHTML = templates.song(thisSong.data);
    thisSong.dom = {};

    thisSong.dom.element = utils.createDOMFromHTML(generatedHTML);

    thisSong.dom.categories = thisSong.dom.element.querySelectorAll(
      select.song.categories
    );
    thisSong.dom.ranking = thisSong.dom.element.querySelector(
      select.song.ranking
    );
    thisSong.dom.playerWrapper = thisSong.dom.element.querySelector(
      select.song.playerWrapper
    );
    thisSong.dom.player = thisSong.dom.element.querySelector(
      select.song.player
    );

    wrapper.appendChild(thisSong.dom.element);

    thisSong.player = new GreenAudioPlayer(thisSong.dom.player, {
      stopOthersOnPlay: true,
    });
  }
}

export default Song;
