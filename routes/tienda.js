var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");
var middleware = require("../middleware.js");
// get de todas las tiendas
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/tienda.json','utf8');
  console.log(data);
  res.send(data);
});
// get de la tienda con el id pasado por parametro
router.get('/:idTienda', function (req, res) {
  var idtienda = req.params.idTienda;
  var temp;
  console.log(idtienda);
  let data= jfs.readFileSync('./JSON/tienda.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idtienda){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
//post de la tienda
router.post('/', middleware.checkToken,function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/tienda.json','utf8')
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
  jfs.writeFile('./JSON/tienda.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
//put de la tarjeta con id pasado por parametro
router.put('/:idTienda',middleware.checkToken, function (req, res) {
  var idtienda = req.params.idTienda;
  var inp=req.body;
  console.log(idtienda);
  let data= jfs.readFileSync('./JSON/tienda.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idtienda){
      console.log(value)
      if(inp.nombre!=null){
        value.nombre=inp.nombre;
      }
      if(inp.productos!=null){
        value.mensaje=inp.mensaje;
      }
      if(inp.direccion!=null){
        value.direccion=inp.direccion;
      }
      if(inp.marcas!=null){
        value.marcas=inp.marcas;
      }
     
      if(inp.promociones!=null){
        value.promociones=inp.promociones;
      }
    }
  }
  jfs.writeFile('./JSON/tienda.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
//delete de la tarjeta con id pasado por parametro
router.delete('/:idTienda',middleware.checkToken, function (req, res) {
  var idtienda = req.params.idTienda;
  let data= jfs.readFileSync('./JSON/tienda.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idtienda){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/tienda.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})
module.exports = router;
