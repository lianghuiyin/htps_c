/*jshint node:true*/
module.exports = function(app) {

  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(predicate) {
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          if (i in list) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
        }
        return undefined;
      }
    });
  }

  var express = require('express');
  var piecesRouter = express.Router();

  piecesRouter.get('/', function(req, res) {
    var key = req.query.key;
    var repeats = app.pieces;
    if(key){
      repeats = app.pieces.filter(function(item) {
        return item.Number === key || item.Vin === key;
      });
    }
    res.send({
      'pieces': repeats
    });
  });

  piecesRouter.post('/', function(req, res) {
    // res.status(201).end();
    var len = app.pieces.length;
    var piece = req.body.piece;
    var isSuc = true;
    var errMsg = "网络繁忙，请稍后再试";

    // if(piece.Number.indexOf("error") < 0){
    //   var repeats = app.pieces.filter(function(item) {
    //     return item.Number === piece.Number || item.Vin === piece.Vin;
    //   });
    //   if(repeats.length === 0){
    //     isSuc = true;
    //   }
    //   else{
    //     errMsg = "内部编号或VIN码重复";
    //   }
    // }
    if(isSuc){
      piece.Id = len + 1 + '';
      app.pieces.push(piece);
      res.status(201).send({ 'piece': piece });
    }
    else
    {
      var errors = {
        ServerSideError:errMsg
      };
      res.status(422).send({ 'errors': errors});
    }
  });

  piecesRouter.get('/:id', function(req, res) {
    res.send({
      'pieces': {
        id: req.params.id
      }
    });
  });

  piecesRouter.put('/:id', function(req, res) {
      var piece = req.body.piece;
      piece.Id = req.params.id;
      var errMsg = "网络繁忙，请稍后再试";
      var info = app.pieces.find(function(item) {
        return parseInt(item.Id) === parseInt(piece.Id);
      });
      var isSuc = true;
      // if(piece.Number.indexOf("error") < 0){
      //   var repeats = app.pieces.filter(function(item) {
      //     return item.Number === piece.Number && parseInt(item.Id) !== parseInt(piece.Id);
      //   });
      //   if(repeats.length == 0){
      //     isSuc = true;
      //   }
      //   else{
      //     errMsg = "内部编号或VIN码重复";
      //   }
      // }
      if(isSuc){
        info.Name = piece.Name;
        info.Number = piece.Number;
        info.SendDate = piece.SendDate;
        info.ModifiedDate = new Date();
        res.send({ 'pieces': piece });
      }
      else
      {
        var errors = {
          ServerSideError:errMsg
        };
        res.status(422).send({ 'errors': errors});
      }
  });

  piecesRouter.delete('/:id', function(req, res) {
    // res.status(204).end();
    var index = -1;
    var temp = false;
    app.pieces.forEach(function(piece) {
      if(temp){
        return;
      }
      ++index;
      temp = parseInt(piece.Id) === parseInt(req.params.id);
    });
    app.pieces.splice(index,1);

    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/pieces', require('body-parser'));
  app.use('/api/pieces', piecesRouter);
};
