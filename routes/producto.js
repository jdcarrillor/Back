var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");

// get de todos los productos
router.get('/', function (req, res) {
  let data= jfs.readFileSync('./JSON/producto.json','utf8');
  console.log(data);
  res.send(data);
});
// get del producto con el id pasado por parametro
router.get('/:idProducto', function (req, res) {
  var idproducto = req.params.idProducto;
  var temp;
  console.log(idproducto);
  let data= jfs.readFileSync('./JSON/producto.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idproducto){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});
//post del producto
router.post('/', function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/producto.json','utf8')
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
  jfs.writeFile('./JSON/producto.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});
//put del producto con id pasado por parametro
router.put('/:idProducto', function (req, res) {
  var idproducto = req.params.idProducto;
  var inp=req.body;
  console.log(idproducto);
  let data= jfs.readFileSync('./JSON/producto.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idproducto){
      console.log(value)
      if(inp.nombre!=null){
        value.nombre=inp.nombre;
      }
      if(inp.clasificacion!=null){
        value.clasificacion=inp.clasificacion;
      }
      if(inp.talla!=null){
        value.talla=inp.talla;
      }
      if(inp.precio!=null){
        value.precio=inp.precio;
      }
      if(inp.cantidadDisponible!=null){
        value.cantidadDisponible=inp.cantidadDisponible;
      }
    }
  }
  jfs.writeFile('./JSON/producto.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})
//delete del producto con id pasado por parametro
router.delete('/:idProducto', function (req, res) {
  var idproducto = req.params.idProducto;
  let data= jfs.readFileSync('./JSON/producto.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idproducto){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/producto.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})
module.exports = router;
