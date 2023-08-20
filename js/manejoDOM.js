//***************************************************************************************************/
//**********************************Variables y funciones generales *********************************/
//***************************************************************************************************/
const nombreApellido = document.getElementById("txtNombreApellido")
const sueldoBruto = document.getElementById("txtSueldoBruto")
const fechaIngreso = document.getElementById("txtFechaIngreso")
const fechaDespido = document.getElementById("txtFechaDespido")
const huboPreAviso = document.getElementById("txtHuboPreAviso")
const divListadoLiquidacionesEmpleados = document.getElementById("tp-listadoLiquidacionesEmpleados") //Div donde se agregar los empleados para liquidar

//******************************** Declaro las Funciones ************************************/
//************************* para validaciones de datos en el ingreso ************************/
//*******************************************************************************************/

//Validacion del Nombre y apellido
validarNombreApellido = () => {return nombreApellido.value === "" ? false : true}

//Validacion del Sueldo Bruto
validarSueldo = (sueldo) => {return !isNaN(sueldo) && sueldo != null && sueldo != "" ? true : false}

//Validacion para las fechas
validarFecha = (fecha) => {
  let fecha1 = new Date(fecha).toLocaleDateString("en-US")
  return ((fecha1 != "Invalid Date" && fecha1 != null && fecha1 != "" && !isNaN(Date.parse(fecha1))) ? true : false)
}

//Validacion para PreAviso
validarPreAviso = (preaviso) => {return preaviso == "SI" || preaviso == "NO" ? true : false }

camposValidos = () => {
  let formValido = true
  let vNombre = validarNombreApellido(nombreApellido.value)
  let vSueldo = validarSueldo(sueldoBruto.value)
  let vFechaIngreso = validarFecha(fechaIngreso.value)
  let vFechaDespido = validarFecha(fechaDespido.value)
  let vHuboPreaviso = validarPreAviso(huboPreAviso.value)
  let mensaje = "Debe completar los siguientes campos obligatorios y válidos: <br/>"

  if (!vNombre) {
    formValido = false
    mensaje += "Nombre y Apellido<br/>"
  }
  if (!vSueldo) {
    formValido = false
    mensaje += "Sueldo Bruto<br/>"
  }
  if (!vFechaIngreso) {
    formValido = false
    mensaje += "Fecha Ingreso<br/>"
  }
  if (!vFechaDespido) {
    formValido = false
    mensaje += "Fecha Despido<br/>"
  }
  if (!vHuboPreaviso) {
    formValido = false
    mensaje += "Hubo Preaviso"
  }

  if (!formValido)
  {
      Swal.fire({
        position: 'center',
        icon: 'error',
        html: mensaje,
        showCloseButton: false,
        confirmButtonText: "Cerrar"
      })
  }

  return formValido
}

//*******************************************************************************************/
//********************************** Manejo del DOM *********************************/
//*******************************************************************************************/

const limpiarCampos = () => {
  nombreApellido.value = ""
  sueldoBruto.value = ""
  fechaIngreso.value = ""
  fechaDespido.value = ""
  huboPreAviso.selectedIndex = 0
}

function crearCardEmpleado(nombreApellido,sueldoBruto,fechaIngreso,fechaDespido,huboPreAviso,liquidacionfinal,id,detalleLiquidacion,totalLiquidacionDolares){
  const card = document.createElement("div")
  card.classList = "card tp-empleadoCard"
  //card.id="prueba"

  const img = document.createElement("img")
  img.src = "./img/empleado.png"
  img.classList = "card-img-top tp-imgEmpleado"
  img.alt = "imagen Empleado"
  img.title = "Empleado Ingresado"
  card.appendChild(img)

  const datos1 = document.createElement("p")
  datos1.className = "tp-datosEmpleado"
  datos1.innerHTML = `<strong>Nombre y Apellido:</strong> ${nombreApellido}<br />
       <strong>Sueldo Bruto:</strong> $ ${sueldoBruto}<br />
       <strong>Hubo PreAviso:</strong> ${huboPreAviso}`
  card.appendChild(datos1)

  const datos2 = document.createElement("p")
  datos2.className = "tp-datosEmpleado"
  datos2.innerHTML = `<strong>Fecha Ingreso:</strong> ${new Date(fechaIngreso).toLocaleDateString("es-AR")}<br />
  <strong>Fecha Despido:</strong> ${new Date(fechaDespido).toLocaleDateString("es-AR")}<br />
  <strong>LIQ FINAL:</strong><label id="liq${id}" class="tp-liquidacionTotal">$ ${liquidacionfinal.toLocaleString("en-US")}</label>
  <label id="liqDolares${id}" class="tp-liquidacionTotal">USD ${totalLiquidacionDolares.toLocaleString("en-US")}</label>
  </label><br />`
  card.appendChild(datos2)

  const botonDetalle = document.createElement("button")
  botonDetalle.id = `botonDetalle${id}`
  botonDetalle.type = "button"
  //Muestro el boton detalle si tiene liquidacion
  botonDetalle.classList = (parseFloat(liquidacionfinal)>0) ? "btn btn-success tp-botonDetalle" : "btn btn-success tp-botonDetalle tp-botonDetalleInvisible"
  botonDetalle.innerText = "Detalle"
  //Agregar un Sweet Alert al boton detalle
  botonDetalle.addEventListener('click', () => {Swal.fire({
    title: 'Detalle liquidación de ' + nombreApellido,
    html: detalleLiquidacion,
    confirmButtonText: 'Cerrar'
    })
  }) 
  

  card.appendChild(botonDetalle)

  const botonBorrar = document.createElement("button")
  botonBorrar.id = `botonBorrar${id}`
  botonBorrar.type = "button"
  botonBorrar.classList = "btn btn-danger tp-botonBorrar"
  botonBorrar.innerHTML = "<i class=\"fa fa-trash\"></i>"
  botonBorrar.onclick = function borrarEmpleado(){
    let a = JSON.parse(localStorage.getItem("arrayLiquidaciones"))
    //Busco en el array el empleado con el indice exacto que quiere eliminar y luego lo elimino
    a.splice(a.findIndex(prop=>prop.empleado.id===id), 1)
    localStorage.setItem("arrayLiquidaciones",JSON.stringify(a))
    //Recargo la grilla con empleados
    cargarLocalStorage()
  }
  card.appendChild(botonBorrar)
  return card
}


//***************************************************************************************************/
//*************************************** Funcion para LocalStorage *********************************/
//***************************************************************************************************/
function agregarLiquidacionLocalStorage(liquidacion) {
  let a = []
  //  // Parse the serialized data back into an aray of objects
  a = localStorage.getItem("arrayLiquidaciones") ? JSON.parse(localStorage.getItem("arrayLiquidaciones")) : []
  // Push the new data (whether it be an object or anything else) onto the array
  a.push(liquidacion)
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("arrayLiquidaciones", JSON.stringify(a))
}

function cargarLocalStorage()
{
  if (!localStorage["indiceDOM"]) {
    localStorage.setItem("indiceDOM",0)
  } //contador que me permite luego buscar la informacion en el array de empleados para mostrar el detalle

  divListadoLiquidacionesEmpleados.innerHTML=""
  let arrayLiquidaciones = localStorage.getItem("arrayLiquidaciones") ? JSON.parse(localStorage.getItem("arrayLiquidaciones")) : []
  if (arrayLiquidaciones.length > 0) {
    for (liq of arrayLiquidaciones)
    {
      const {nombre,sueldoBruto,fechaIngresoLaboral,fechaDesvinculacion,preAviso,id} = liq.empleado
      const {totalLiquidacion, detalleLiquidacion, totalLiquidacionDolares} = liq
      let card = crearCardEmpleado(nombre,sueldoBruto,fechaIngresoLaboral,fechaDesvinculacion,preAviso,totalLiquidacion,id,detalleLiquidacion,totalLiquidacionDolares)
      divListadoLiquidacionesEmpleados.appendChild(card)
    }
  }
}

//********************************************************************************************************/
//************************************** Cargar el local Storage *****************************************/
//********************************************************************************************************/

//Promesa para obtener la cotizacion del dolar y mostrar la liquidacion Final en dolares
obtenerCotizacionDolar("Dolar Blue")
//Cargo el LocalStorage de la grilla
setTimeout(()=> {cargarLocalStorage()}, 1500)
