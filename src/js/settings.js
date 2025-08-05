export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''), // JSON Server URL
    products: 'products', // Products API endpoint
  },
};
