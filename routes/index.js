var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const base64 = require('base-64');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

const getTranslation = (term, target, key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let url = "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/39ee8586-be67-47d8-95f7-42a03ee88f68/v3/translate?version=2018-05-01";

      let headers = new fetch.Headers();

      headers.append('Authorization', 'Basic ' + base64.encode("apikey" + ":" + "PrNDWM1wRuo4Dw7toyArQK0bf7wV67_MVGA2QxOjjX_2"));
      headers.append('Content-Type', 'application/json');

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          "text": [term],
          "model_id": "en-hi" 
        })
      }).then(res => {
        res.json().then(json => {
          resolve(json.translations[0].translation);
        });
      }).catch(err => console.log(err));
    });

  });
}

router.get('/translate/:term', (req, res, next) => {
  getTranslation(req.params.term).then(result => {
    res.json({result});
  }).catch(err => console.log(err));
});

module.exports = router;
