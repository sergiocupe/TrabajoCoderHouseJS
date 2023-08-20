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
header.className = "header"

const menu = d.createElement("nav")
menu.classList = "navbar navbar-expand-lg navbar-light bg-dark"

const contenedor = d.createElement("div")
contenedor.classList = "container-fluid tp-titulo-header"
contenedor.innerText = "CÁLCULO DE INDEMNIZACIÓN POR DESPIDO SIN CAUSA"

//******************************* MAIN ************************************ */
//Creacion en el DOM de main del index.html
const main = d.createElement("main")

//--Section izquierdo - Formulario Alta Empleado
const seccion = d.createElement("section")
seccion.className = "tp-seccionForm"

//--div contenedor
const divIzquierdo = d.createElement("div")
divIzquierdo.classList = "col-xs-12 col-sm-12 col-md-5 col-lg-5"

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

//--Section derecho -- Listado de empleados

//--div contenedor
const divDerecho = d.createElement("div")
divDerecho.classList = "col-xs-12 col-sm-12 col-md-7 col-lg-7 tp-empleados"

//--h1 del titulo izquierdo
const tituloDerecho = d.createElement("h1")
tituloDerecho.className = "tp-titulo"
tituloDerecho.innerText = "Listado de Empleados a liquidar: "

//--Div listado empleados
const divlistado = d.createElement("div")
divlistado.className = "tp-cardsEmpleados"
divlistado.id="tp-listadoLiquidacionesEmpleados"
divlistado.innerHTML=`<img src="img/loading-cargando.gif" class="tp-imgCargando"/>`

//--Creo el boton para calcular liquidaciones
const botonLiquidaciones=d.createElement("button")
botonLiquidaciones.type="button"
botonLiquidaciones.classList="btn btn-primary tp-botonCalcular"
botonLiquidaciones.addEventListener("click",calcularLiquidaciones)
botonLiquidaciones.innerText="Calcular Liquidaciones"

//******************************* FOOTER ************************************ */
const anioCopyright = new Date().getFullYear(); 

const footer = d.createElement("footer")
footer.className="container-fluid"

const seccionFooter=d.createElement("section")
seccionFooter.className="row"

const divFooter=d.createElement("div")
divFooter.className="copyright"
divFooter.innerText=`Todos los derechos reservados ${anioCopyright} Ⓒ Alumno: Castillo Legal Sergio`
//******************************* APPEND CHILDS ************************************ */

seccionFooter.appendChild(divFooter)
footer.appendChild(seccionFooter)

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

cuerpo.prepend(footer)
cuerpo.prepend(main)
cuerpo.prepend(header)