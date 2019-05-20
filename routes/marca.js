var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");

// get de todas las tarjetas
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/marca.json','utf8');
  console.log(data);
  res.send(data);
});
// get de la tarjeta con el id pasado por parametro
router.get('/:idMarca', function (req, res) {
  var idmarca = req.params.idMarca;
  var temp;
  console.log(idmarca);
  let data= jfs.readFileSync('./JSON/marca.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idmarca){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
//post de la tarjeta
router.post('/', function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/marca.json','utf8')
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
  jfs.writeFile('./JSON/marca.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
//put de la tarjeta con id pasado por parametro
router.put('/:idMarca', function (req, res) {
  var idmarca = req.params.idMarca;
  var inp=req.body;
  console.log(idmarca);
  let data= jfs.readFileSync('./JSON/marca.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idmarca){
      console.log(value)
      if(inp.nombre!=null){
        value.nombre=inp.nombre;
      }
      if(inp.origen!=null){
        value.origen=inp.origen;
      }
      if(inp.clasificacion!=null){
        value.clasificacion=inp.clasificacion;
      }
      if(inp.descripcion!=null){
        value.descripcion=inp.descripcion;
      }
     
      if(inp.productos!=null){
        value.productos=inp.productos;
      }
    }
  }
  jfs.writeFile('./JSON/marca.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
//delete de la tarjeta con id pasado por parametro
router.delete('/:idMarca', function (req, res) {
  var idmarca = req.params.idMarca;
  let data= jfs.readFileSync('./JSON/marca.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idmarca){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/marca.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})
module.exports = router;
