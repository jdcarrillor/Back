var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");
var middleware = require("../middleware.js");

/*GET factura */
router.get('/',middleware.checkToken,function (req, res) {
  let data= jfs.readFileSync('./JSON/factura.json','utf8');
  console.log(data);
  res.send(data);
});

/*GET factura por id */
router.get('/:idFactura', function (req, res) {
  var idfactura = req.params.idFactura;
  var temp;
  console.log(idfactura);
  let data= jfs.readFileSync('./JSON/factura.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idfactura){
      console.log(value)
      temp=value;
    }
  }
  res.send(temp);
});

/*POST factura */
router.post('/',middleware.checkToken, function (req, res){
  let dataJSON=jfs.readFileSync('./JSON/factura.json','utf8')
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
  jfs.writeFile('./JSON/factura.json', JSON.parse(data), function (err) {
    console.log(err);
  });
  res.send(JSON.parse(data))
});

/*PUT factura por id */
router.put('/:idFactura', middleware.checkToken,function (req, res) {
  var idfactura = req.params.idFactura;
  var inp=req.body;
  console.log(idfactura);
  let data= jfs.readFileSync('./JSON/factura.json','utf8');
  data.forEach(searchById);
  function searchById(value, index, array){
    if(value.id==idfactura){
      console.log(value)

      if(inp.idDestino!=null){
        value.idDestino=inp.idDestino;
      }
      if(inp.idTienda!=null){
        value.idTienda=inp.idTienda;
      }
      if(inp.idTarjetaRegalo!=null){
        value.idTarjetaRegalo=inp.idTarjetaRegalo;
      }
      if(inp.valorCompra!=null){
        value.valorCompra=inp.valorCompra;
      }
      if(inp.formaDePago!=null){
        value.formaDePago=inp.formaDePago;
      }
      if(inp.fechaCompra!=null){
        value.fechaCompra=inp.fechaCompra;
      }
      if(inp.destino!=null){
        value.destino=inp.destino;
      }
      if(inp.tienda!=null){
        value.tienda=inp.tienda;
      }
      if(inp.tarjetaRegalo!=null){
        value.tarjetaRegalo=inp.tarjetaRegalo;
      }
      if(inp.src!=null){
        value.src=inp.src;
      }
    }
  }
  jfs.writeFile('./JSON/factura.json', data, function (err) {
    console.log(err);
  });
  res.send(data)
})

/*DELETE factura por id */
router.delete('/:idFactura',middleware.checkToken, function (req, res) {
  var idfactura = req.params.idFactura;
  let data= jfs.readFileSync('./JSON/factura.json','utf8');
  let final =new Array();
  data.forEach(searchByIdDelete);
  function searchByIdDelete(value, index, array){
    if(value.id!=idfactura){
      final.push(value);
    }
  }
  jfs.writeFile('./JSON/factura.json', final, function (err) {
    console.log(err);
  });
  res.send(final);
})

module.exports = router;

