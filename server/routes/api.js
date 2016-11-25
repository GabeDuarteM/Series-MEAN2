var express = require('express');
var router = express.Router();
var request = require('request');

var baseUrl = 'https://api.thetvdb.com';

router.get('/search/:nome', (req, res, next) => {
    checkToken(() => {
        searchSeries(req.params.nome, (data) => {
            var json = JSON.parse(data).data || {} ;
            res.json(json);
        });
    })
});

var token = null;

function getToken(callback) {
    request({
        url: baseUrl + '/login',
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        json: {
            "apikey": "BFF292D0FBAF9007"
        }
    }, function(error, resp, body) {
        var expDate = new Date();
        expDate.setDate(expDate.getDate() + 1);
        token = {
            token: body.token,
            expDate: expDate
        };

        if (callback) {
            callback();
        }
    });
}

function checkToken(callback) {
    if (!token || token.expDate < new Date()) {
        getToken(() => {
            callback();
        });
    } else {
        callback();
    }
}

function getAuthBearer() {
    return "Bearer " + token.token;
}

function searchSeries(name, callback) {
    request({
        url: baseUrl + '/search/series?name=' + encodeURI(name),
        method: "GET",
        headers: {
            Authorization: getAuthBearer()
        }
    }, function(error, resp, body) {
        if (callback) {
            callback(body);
        }
    });
}

module.exports = router;