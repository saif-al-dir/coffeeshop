import { settings } from './settings.js';

const app = {
  data: {},

  initData: function () {
    const url = `${settings.db.url}/${settings.db.products}`;
    fetch(url)
      .then(response => response.json())
      .then(products => {
        this.data.products = products;
        this.renderTemplate('home-template', { showAbout: true, products: this.data.products });
      })
      .catch(error => console.error('Error fetching products:', error));
  },


  renderProducts: function () {
    const templateSource = document.getElementById('products-partial').innerHTML;
    const template = Handlebars.compile(templateSource);
    const renderedHTML = template({ products: this.data.products });
    document.getElementById('app').innerHTML = renderedHTML;
  },

  renderTemplate: function (templateId, data = {}) {
    const templateSource = document.getElementById(templateId).innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById('app').innerHTML = template(data);
  },

  initPages: function () {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('#home-btn')) {
        e.preventDefault();
        this.renderTemplate('home-template', { showAbout: true, products: this.data.products });
      }
      if (e.target.matches('#products-btn')) {
        e.preventDefault();
        this.renderProducts(); // Fetch and render products dynamically
      }
      if (e.target.matches('#contact-btn')) {
        e.preventDefault();
        this.renderTemplate('contact-template');
      }
    });
  },

  init: function () {
    this.initData();
    this.initPages();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  // Register the Handlebars helper for alternating layouts
  Handlebars.registerHelper('isOdd', function (index, options) {
    return index % 2 !== 0 ? options.fn(this) : options.inverse(this);
  });

  // Register Handlebars partials
  Handlebars.registerPartial('products', document.getElementById('products-partial').innerHTML);
  Handlebars.registerPartial('about', document.getElementById('about-template').innerHTML);

  // Initialize the app
  app.init();
});

