const h = require('../helpers');

/*

  Pour générer la config à mettre dans sources.json, tapper ça dans la console :

    JSON.stringify(["ctl00$cphMid$search_id", "ctl00$cphMid$lstTypeBien", "ctl00$cphMid$txtPrixMin", "ctl00$cphMid$txtPrixMax", "ctl00$cphMid$txtSurfaceMin"].reduce((acc, key) => { acc[key] = $(`[name='${key}']`).val(); return acc; }, {}));

*/

module.exports = {
  prepare: async (page, config) => {
    page.goto('https://www.squarehabitat.fr/resultats.aspx', { timeout: 0 });
    await new Promise(resolve => page.once('domcontentloaded', resolve));
    await page.addScriptTag({ path: require.resolve('jquery/dist/jquery.min.js') });
    await page.evaluate(cfg => {
      Object.keys(cfg).forEach(key => {
        window.jQuery(`[name='${key}']`).val(cfg[key]);
      });
      __doPostBack('ctl00$cphMid$lnkRecherche', '');
    }, config);
  },
  waitForNavigation: true,
  // waitForSelector: '.row.blocs-biens',
  parent: '.row.blocs-biens > div.row > .col-md-4.to-animate',
  items: {
    url: { sel: 'a', attr: 'href' },
    title: { sel: 'h4' },
    image: { sel: 'h3 img', attr: 'src' },
    price: { sel: '.prix-vignette' },
  },
  filter: ({ url }) => !!url,
  mapItem: {
    url: h.prefix('https://www.squarehabitat.fr'),
    price: h.cleanPrice,
  },
};
