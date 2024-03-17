export const select = {
  templateOf: {
    song: '#template-song',
  },
  containerOf: {
    songlist: '#songlist',
    homepage: '#homepage',
    pages: '#pages',
  },
  all: {
    songs: '.page.active #songlist > .song',
    formInputs: 'input, select',
    pages: '.page',
  },

  nav: {
    navbar: '.navbar',
    links: '.navbar a',
    pages: '.page',
  },
  home: {
    intro: '.homepage__intro',
    actionLinks: '.homepage__intro__action',
  },
  song: {
    playerWrapper: '.song__player__wrapper',
    player: '.song__player',
    categories: '.song__description__tags',
    ranking: '.song__description__ranking',
  },
  searchbar: {
    wrapper: '.searchbar_wrapper',
    input: '.searchbar_wrapper > input',
    button: '.searchbar_wrapper > button',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
    // orders: 'orders',
    // bookings: 'bookings',
    // events: 'events',
    // dateStartParamKey: 'date_gte',
    // dateEndParamKey: 'date_lte',
    // notRepeatParam: 'repeat=false',
    // repeatParam: 'repeat_ne=false',
  },
};

export const templates = {
  song: Handlebars.compile(
    document.querySelector(select.templateOf.song).innerHTML
  ),
};
