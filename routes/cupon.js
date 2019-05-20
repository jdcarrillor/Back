var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");

// get de todas las tarjetas
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/cupon.json','utf8');
  console.log(data);
  res.send(data);
});
// get de la tarjeta con el id pasado por parametro
router.get('/:idCupon', function (req, res) {
  var idcupon = req.params.idCupon;
  var temp;
  console.log(idcupon);
  let data= jfs.readFileSync('./JSON/cupon.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idcupon){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
//post de la tarjeta
router.post('/', function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/cupon.json','utf8')
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
  jfs.writeFile('./JSON/cupon.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
//put de la tarjeta con id pasado por parametro
router.put('/:idCupon', function (req, res) {
  var idcupon = req.params.idCupon;
  var inp=req.body;
  console.log(idcupon);
  let data= jfs.readFileSync('./JSON/cupon.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idcupon){
      console.log(value)
      if(inp.idMarca!=null){
        value.idMarca=inp.idMarca;
      }
      if(inp.idTienda!=null){
        value.idTienda=inp.idTienda;
      }
      if(inp.valor!=null){
        value.valor=inp.valor;
      }
      if(inp.fechaVencimiento!=null){
        value.fechaVencimiento=inp.fechaVencimiento;
      }
      
    }
  }
  jfs.writeFile('./JSON/cupon.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
//delete de la tarjeta con id pasado por parametro
router.delete('/:idCupon', function (req, res) {
  var idcupon = req.params.idCupon;
  let data= jfs.readFileSync('./JSON/cupon.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idcupon){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/cupon.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})
module.exports = router;
