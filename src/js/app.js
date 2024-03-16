'use strict';

import GreenAudioPlayer from '../../vendor/greenplayer/js/main.js';

const allPlayersElems = document.querySelectorAll('.song__player');
console.log('allPlayersElems', allPlayersElems);

const players = GreenAudioPlayer.init({
  selector: '.song__player', // inits Green Audio Player on each audio container that has class "player"
  stopOthersOnPlay: true,
});
console.log(players);
