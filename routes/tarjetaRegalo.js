var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");

// get de todas las tarjetas
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/tarjetaRegalo.json','utf8');
  console.log(data);
  res.send(data);
});
// get de la tarjeta con el id pasado por parametro
router.get('/:idTarjeta', function (req, res) {
  var idtarjeta = req.params.idTarjeta;
  var temp;
  console.log(idtarjeta);
  let data= jfs.readFileSync('./JSON/tarjetaRegalo.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idtarjeta){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
//post de la tarjeta
router.post('/', function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/tarjetaRegalo.json','utf8')
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
  jfs.writeFile('./JSON/tarjetaRegalo.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
//put de la tarjeta con id pasado por parametro
router.put('/:idTarjeta', function (req, res) {
  var idtarjeta = req.params.idTarjeta;
  var inp=req.body;
  console.log(idtarjeta);
  let data= jfs.readFileSync('./JSON/tarjetaRegalo.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idtarjeta){
      console.log(value)
      if(inp.titulo!=null){
        value.titulo=inp.titulo;
      }
      if(inp.mensaje!=null){
        value.mensaje=inp.mensaje;
      }
      if(inp.imagenes!=null){
        value.imagenes=inp.imagenes;
      }
      if(inp.plantilla!=null){
        value.plantilla=inp.plantilla;
      }
      if(inp.cupones!=null){
        value.cupones=inp.cupones;
      }
      if(inp.productos!=null){
        value.productos=inp.productos;
      }
    }
  }
  jfs.writeFile('./JSON/tarjetaRegalo.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
//delete de la tarjeta con id pasado por parametro
router.delete('/:idTarjeta', function (req, res) {
  var idtarjeta = req.params.idTarjeta;
  let data= jfs.readFileSync('./JSON/tarjetaRegalo.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idtarjeta){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/tarjetaRegalo.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})
module.exports = router;
