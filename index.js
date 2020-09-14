const http = require("http");
const fs = require("fs");
const axios = require("axios");
const url = require("url");

const urlProveedores =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlClientes =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

let crearTablaProveedor = (arregloProveedores, callback) => {
  fs.readFile("index.html", (err, data) => {
    let contenidoPagina = data.toString();
    let entradaFilaTablaProveedor =
      '<p class="display-3">Proveedores</p> <table id="tablaProveedores" class="table table-striped"> <thead> <tr> <th scope="col">#</th> <th scope="col">Nombre compañia</th> <th scope="col">Nombre contacto</th> </tr> </thead> <tbody id="bodyTableProviders">';
    arregloProveedores.forEach((element) => {
      entradaFilaTablaProveedor =
        entradaFilaTablaProveedor +
        '<tr> <td scope="col">' +
        element.idproveedor +
        '</td><td scope="col">' +
        element.nombrecompania +
        '</td><td scope="col">' +
        element.nombrecontacto +
        "</td> </tr>";
    });
    entradaFilaTablaProveedor = entradaFilaTablaProveedor + "</tbody> </table>";
    contenidoPagina = contenidoPagina.replace(
      "{{replace}}",
      entradaFilaTablaProveedor
    );
    callback(contenidoPagina);
  });
};

let crearTablaCliente = (arregloClientes, callback) => {
  fs.readFile("index.html", (err, data) => {
    let contenidoPagina = data.toString();
    let entradaFilaTablaCliente =
      '<p class="display-3">Clientes</p> <table id="tablaClientes" class="table table-striped"> <thead> <tr> <th scope="col">#</th> <th scope="col">Nombre compañia</th> <th scope="col">Nombre contacto</th> </tr> </thead> <tbody id="bodyTableClients">';
    arregloClientes.forEach((element) => {
      entradaFilaTablaCliente =
        entradaFilaTablaCliente +
        '<tr> <td scope="col">' +
        element.idCliente +
        '</td><td scope="col">' +
        element.NombreCompania +
        '</td><td scope="col">' +
        element.NombreContacto +
        "</td> </tr>";
    });
    entradaFilaTablaCliente = entradaFilaTablaCliente + "</tbody> </table>";
    contenidoPagina = contenidoPagina.replace(
      "{{replace}}",
      entradaFilaTablaCliente
    );
    callback(contenidoPagina);
  });
};

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    if (q.pathname.includes("/api/proveedores")) {
      axios.get(urlProveedores).then((response) => {
        crearTablaProveedor(response.data, (data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data.toString());
        });
      });
    } else if (q.pathname.includes("/api/clientes")) {
      axios.get(urlClientes).then((response) => {
        crearTablaCliente(response.data, (data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data.toString());
        });
      });
    }
  })
  .listen(8081);
