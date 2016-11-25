var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var dbNome = 'gabrielduartem-series-mean2-4078460';

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.')
  var Favorite = mongoose.model('Favorite', {
    nome: "string",
    sinopse: "string",
    nome: "string",
    sinopse: "string",
    bannerUrl: "string",
    idApi: "number"
  });

  /* GET All Favorites */
  router.get('/favorites', function(req, res, next) {

    Favorite.find(function(err, favorites) {

      if (err) {
        var retornoJson = {
          sucesso: false,
          mensagem: err
        };
        res.json(retornoJson);
      }
      else {
        res.json(favorites);
      }
    });
  });

  /* GET One Favorite with the provided ID */
  router.get('/favorite/:id', function(req, res, next) {
    Favorite.findOne({
      _id: req.params.id
    }, function(err, favorite) {
      if (err) {
        var retornoJson = {
          sucesso: false,
          mensagem: err
        };
        res.json(retornoJson);
      }
      else {
        res.json(favorite);
      }
    });
  });

  /* GET One Favorite with the provided IDApi */
  router.get('/favorite/idApi/:id', function(req, res, next) {
    Favorite.findOne({
      idApi: req.params.id
    }, function(err, favorite) {
      if (err) {
        var retornoJson = {
          sucesso: false,
          mensagem: err
        };
        res.json(retornoJson);
      }
      else {
        res.json(favorite);
      }
    });
  });

  /* POST/SAVE a Favorite */
  router.post('/favorite', function(req, res, next) {
    var favoriteBody = req.body;

    var favorite = new Favorite({
      nome: favoriteBody.nome,
      sinopse: favoriteBody.sinopse,
      bannerUrl: favoriteBody.bannerUrl,
      idApi: favoriteBody.idApi
    });

    Favorite.findOne({
      idApi: favorite.idApi
    }, function(err, favoriteFound) {
      if (err) {
        var retornoJson = {
          sucesso: false,
          mensagem: err
        };
        res.json(retornoJson);
      }
      else {
        if (!favoriteFound) {
          favorite.save(function(err, favorite) {
            if (err) {
              var retornoJson = {
                sucesso: false,
                mensagem: err
              };
              res.json(retornoJson);
            }
            else {
              var retornoJson = {
                sucesso: true,
                mensagem: "POST/SAVE: Favorito '" + favorite.nome + "' salvo com sucesso."
              };
              res.json(retornoJson);
            }
          });
        }
        else {
          var retornoJson = {
            sucesso: false,
            mensagem: "POST/SAVE: Favorito '" + favorite.nome + "' já existente."
          };
          res.json(retornoJson);
        }
      }
    });


  });

  /* PUT/UPDATE a Favorite */
  router.put('/favorite/:id', function(req, res, next) {
    var favorite = req.body;

    Favorite.update({
      _id: req.params.id
    }, {
      $set: {
        nome: favorite.nome,
        sinopse: favorite.sinopse,
        bannerUrl: favorite.bannerUrl,
        idApi: favorite.idApi
      }
    }, (err) => {
      if (err) {
        var retornoJson = {
          sucesso: false,
          mensagem: err
        };
        res.json(retornoJson);
      }
      else {
        var retornoJson = {
          sucesso: true,
          mensagem: "PUT/UPDATE: Favorito '" + favorite.nome + "' atualizado com sucesso."
        };
        res.json(retornoJson);
      }
    });
  });

  /* DELETE a Favorite */
  router.delete('/favorite/:id', function(req, res) {

    Favorite.findOne({
      idApi: req.params.id
    }, function(err, favoriteFound) {
      if (err) {
        var retornoJson = {
          sucesso: false,
          mensagem: err
        };
        res.json(retornoJson);
      }
      else {
        if (favoriteFound) {
          Favorite.remove({
            _id: favoriteFound._id
          }, (err) => {
            if (err) {
              var retornoJson = {
                sucesso: false,
                mensagem: err
              };
              res.json(retornoJson);
            }
            else {
              var retornoJson = {
                sucesso: true,
                mensagem: "DELETE: Favorito '" + favoriteFound.nome + "' removido com sucesso."
              };
              res.json(retornoJson);
            }
          });
        }
        else {
          var retornoJson = {
            sucesso: false,
            mensagem: "DELETE: Favorito " + req.params.id + " não existente."
          };
          res.json(retornoJson);
        }
      }
    });
  });
});

mongoose.connect('mongodb://' + dbNome + '/series-mean2');

module.exports = router;
