const d = document
const cuerpo = d.body

const campos =[
  {
    tipo:"text",
    id:"txtNombreApellido",
    texto:"Ingrese Nombre y Apellido"
  },
  {
    tipo:"number",
    id:"txtSueldoBruto",
    texto:"Ingrese su mejor Sueldo Bruto"
  },
  {
    tipo:"date",
    id:"txtFechaIngreso",
    texto:"Ingrese la Fecha de Ingreso"
  },
  {
    tipo:"date",
    id:"txtFechaDespido",
    texto:"Ingrese la Fecha de Despido"
  },
  {
    tipo:"select",
    id:"txtHuboPreAviso",
    texto:"Hubo Preaviso?"
  }
]

//******************************* HEADER ************************************ */
//Creacion en el DOM de header del index.html
const header = d.createElement("header")
header.class = "header";

const menu = d.createElement("nav")
menu.className = "navbar navbar-expand-lg navbar-light bg-dark"

const contenedor = d.createElement("div")
contenedor.className = "container-fluid tp-titulo-header"
contenedor.innerText = "CÁLCULO DE INDEMNIZACIÓN POR DESPIDO SIN CAUSA"

//******************************* MAIN ************************************ */
//Creacion en el DOM de main del index.html
const main = d.createElement("main")

//--Section izquierdo - Formulario Alta Empleado
const seccion = d.createElement("section")
seccion.className = "tp-seccionForm"

//--div contenedor
const divIzquierdo = d.createElement("div")
divIzquierdo.className = "col-xs-12 col-sm-12 col-md-5 col-lg-5"

//--h1 del titulo izquierdo
const tituloIzquierdo = d.createElement("h1")
tituloIzquierdo.className = "tp-titulo"
tituloIzquierdo.innerText = "Datos del Empleado"

//--form formulario para la carga de un empleado
const formulario = d.createElement("form")
formulario.className = "tp-formEmpleado"

const divInputs = d.createElement("div")

campos.forEach((input) => {
  if (input.tipo!="select")
  {
  divInputs.innerHTML += `<div class="form-floating">
            <input class="form-control" type="${input.tipo}" id="${input.id}" />
            <label for="floatingSelect">${input.texto}</label></div><br/>`
  }
  else
  {
    divInputs.innerHTML += `<div class="form-floating">
    <select class="form-select form-control" id="${input.id}">
    <option value="" selected disabled></option>
    <option value="SI">SI</option>
    <option value="NO">NO</option></select>
    <label for="floatingSelect">${input.texto}</label></div><br/>`
  }
})

//--Creo el boton para el formulario
const botonForm=d.createElement("button")
botonForm.type="button"
botonForm.className="btn btn-success"
botonForm.addEventListener("click",agregarEmpleadoLista)
botonForm.innerText="Agregar Empleado"

//--Section derecho -- Listado de empeledos

//--div contenedor
const divDerecho = d.createElement("div")
divDerecho.className = "col-xs-12 col-sm-12 col-md-5 col-lg-5"

//--h1 del titulo izquierdo
const tituloDerecho = d.createElement("h1")
tituloDerecho.className = "tp-titulo"
tituloDerecho.innerText = "Listado de Empleados a liquidar:"

//--Div listado empleados
const divlistado = d.createElement("div")
divlistado.className = "tp-cardsEmpleados"
divlistado.id="tp-listadoLiquidacionesEmpleados"

//--Creo el boton para calcular liquidaciones
const botonLiquidaciones=d.createElement("button")
botonLiquidaciones.type="button"
botonLiquidaciones.className="btn btn-primary tp-botonCalcular"
botonLiquidaciones.addEventListener("click",calcularLiquidaciones)
botonLiquidaciones.innerText="Calcular Liquidaciones"

//******************************* FOOTER ************************************ */
const anio = new Date().getFullYear(); /// 2023

const pie = d.createElement("footer")
pie.className="container-fluid"

const seccionPie=d.createElement("section")
seccionPie.className="row"

const divPie=d.createElement("div")
divPie.className="copyright"
divPie.innerText=`Todos los derechos reservados ${anio} Ⓒ Alumno: Castillo Legal Sergio`
//******************************* APPEND CHILDS ************************************ */

seccionPie.appendChild(divPie)
pie.appendChild(seccionPie)

formulario.appendChild(divInputs)
formulario.appendChild(botonForm)
divIzquierdo.appendChild(tituloIzquierdo)
divIzquierdo.appendChild(formulario)

divDerecho.appendChild(tituloDerecho)
divDerecho.appendChild(divlistado)
divDerecho.appendChild(botonLiquidaciones)

seccion.appendChild(divIzquierdo)
seccion.appendChild(divDerecho)
main.appendChild(seccion)

menu.appendChild(contenedor)
header.appendChild(menu)

cuerpo.prepend(pie)
cuerpo.prepend(main)
cuerpo.prepend(header)