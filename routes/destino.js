var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");
var middleware = require("../middleware.js");

/* GET destino*/
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/destino.json','utf8');
  console.log(data);
  res.send(data);
});

/*GET destino por id */
router.get('/:idDestino', function (req, res) {
  var iddestino = req.params.idDestino;
  var temp;
  console.log(iddestino);
  let data= jfs.readFileSync('./JSON/destino.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==iddestino){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
/*POST destino */
router.post('/', middleware.checkToken,function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/destino.json','utf8')
  let idTemp=1;
  dataJSON.forEach(conteo);
  function conteo(value, index, array){
    idTemp++;
  }
  console.log("El id del siguiente elemento es: "+ idTemp);
  let data= JSON.stringify(dataJSON);
  var jsonTR=req.body;
  jsonTR["id"]=idTemp;
  var newTR=JSON.stringify(jsonTR);
  data=data.slice(0, data.length-1);
  data=data+", "+ newTR+"]";
  console.log(data);
  jfs.writeFile('./JSON/destino.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
/*PUT destino por id */
router.put('/:idDestino',middleware.checkToken, function (req, res) {
  var iddestino = req.params.idDestino;
  var inp=req.body;
  console.log(iddestino);
  let data= jfs.readFileSync('./JSON/destino.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idtarjeta){
      console.log(value)
      if(inp.ciudad!=null){
        value.ciudad=inp.ciudad;
      }
      if(inp.direccion!=null){
        value.direccion=inp.direccion;
      }
      if(inp.email!=null){
        value.email=inp.email;
      }
      if(inp.fisica!=null){
        value.fisica=inp.fisica;
      }
      if(inp.src!=null){
        value.src=inp.src;
      }
    }
  }
  jfs.writeFile('./JSON/destino.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
/*DELETE destino por id */
router.delete('/:idDestino',middleware.checkToken, function (req, res) {
  var iddestino = req.params.idTarjeta;
  let data= jfs.readFileSync('./JSON/destino.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=iddestino){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/destino.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})

module.exports = router;

