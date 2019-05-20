var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");

// get de todas las promociones
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/promocion.json','utf8');
  console.log(data);
  res.send(data);
});
// get de la promocion con el id pasado por parametro
router.get('/:idPromocion', function (req, res) {
  var idpromocion = req.params.idPromocion;
  var temp;
  console.log(idpromocion);
  let data= jfs.readFileSync('./JSON/promocion.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idpromocion){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
//post de la promocion
router.post('/', function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/promocion.json','utf8')
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
  jfs.writeFile('./JSON/promocion.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
//put de la promocion con id pasado por parametro
router.put('/:idPromocion', function (req, res) {
  var idpromocion = req.params.idPromocion;
  var inp=req.body;
  console.log(idpromocion);
  let data= jfs.readFileSync('./JSON/promocion.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idpromocion){
      console.log(value)
      if(inp.nombre!=null){
        value.nombre=inp.nombre;
      }
      if(inp.fechaDeInicio!=null){
        value.fechaDeInicio=inp.fechaDeInicio;
      }
      if(inp.fechaDeFin!=null){
        value.fechaDeFin=inp.fechaDeFin;
      }
      if(inp.marcas!=null){
        value.marcas=inp.marcas;
      }
      if(inp.idTienda!=null){
        value.idTienda=inp.idTienda;
      }
    }
  }
  jfs.writeFile('./JSON/promocion.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
//delete de la promocion con id pasado por parametro
router.delete('/:idPromocion', function (req, res) {
  var idpromocion = req.params.idPromocion;
  let data= jfs.readFileSync('./JSON/promocion.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idpromocion){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/promocion.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})
module.exports = router;
