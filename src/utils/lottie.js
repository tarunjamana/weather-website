const bodymovin = require('bodymovin')

var animation = bodymovin.loadAnimation({
  container: document.getElementById('loader'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../../public/js/loader.json'
})

