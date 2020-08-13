const fetch = require('node-fetch');

const ajax = (url) => {
    return fetch(url)
        .then(response => response.json())
};

module.exports = ajax;