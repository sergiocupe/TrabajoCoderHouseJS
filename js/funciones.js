let cotizacionDolar=0;

function diasDelMes(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), 0).getDate();
}

//***************************************************************************************************************/
//********************************** Promesa para transformar Pesos en Dolares  *********************************/
//***************************************************************************************************************/

const obtenerCotizacionDolar = async (tipoDolar) => {
  const res = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  const datos = await res.json()
  const data = await datos

  for(const item of data)
  {
    if (item.casa.nombre==tipoDolar)
    {
      cotizacionDolar=item.casa.venta
    }
  }
}

//**************************************************************************************************/
//**********************************Funciones para Eventos botones *********************************/
//**************************************************************************************************/

function agregarEmpleadoLista() {
  //Valido que los campos esten correctamente ingresados y completos
  if (camposValidos()) {
    //Creo un nuevo empleado con los datos ingresado
    let empleado = new Empleado(localStorage.getItem("indiceDOM"),nombreApellido.value,parseFloat(sueldoBruto.value),fechaIngreso.value,fechaDespido.value,huboPreAviso.value)

    //Creo una nueva liquidacion para el empleado
    let liquidacion = new Liquidacion(empleado)

    //Agrego un nuevo empleado al array para la liquidacion
    agregarLiquidacionLocalStorage(liquidacion)

    //Agrego un empleado a la lista de liquidaciones
    const {totalLiquidacion, detalleLiquidacion, totalLiquidacionDolares} = liquidacion
    let card = crearCardEmpleado(empleado.nombre,empleado.sueldoBruto,empleado.fechaIngresoLaboral,empleado.fechaDesvinculacion,empleado.preAviso,totalLiquidacion,localStorage.getItem("indiceDOM"),detalleLiquidacion,totalLiquidacionDolares)
    divListadoLiquidacionesEmpleados.appendChild(card)
    let i=parseInt(localStorage.getItem("indiceDOM"))
    i++
    localStorage.setItem("indiceDOM",i)

    //Limpio los campos del formulario para ingresar uno nuevo
    limpiarCampos()
  }
}

function calcularLiquidaciones() {
  let arrayLiqStorage = localStorage.getItem("arrayLiquidaciones") ? JSON.parse(localStorage.getItem("arrayLiquidaciones")) : []
  const arrayLiq=[]
  
  if (arrayLiqStorage.length > 0) {
    for(const objeto of arrayLiqStorage)
    {
      let liq=new Liquidacion(objeto.empleado)
      liq.calcularLiquidacion()
      arrayLiq.push(liq)      

      //Cargo el total de la liquidacion calculada
      document.getElementById(`liq${objeto.empleado.id}`).innerHTML  = " $ " + liq.obtenerTotalLiquidacion()
      document.getElementById(`liqDolares${objeto.empleado.id}`).innerHTML  = " USD " + liq.obtenerTotalLiquidacionDolares()
      //Habilito el boton Detalle del empleado calculado
      document.getElementById(`botonDetalle${objeto.empleado.id}`).classList = "btn btn-success tp-botonDetalle"
      document.getElementById(`botonDetalle${objeto.empleado.id}`).addEventListener('click', () => {Swal.fire({
        title: 'Detalle liquidación de ' + objeto.empleado.nombre,
        html: liq.detalleLiquidacion,
        confirmButtonText: 'Cerrar'
        })
      }) 
    }

    localStorage.setItem("arrayLiquidaciones",JSON.stringify(arrayLiq))

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se finalizo el calculo correctamente',
      showConfirmButton: false,
      timer: 2000
    })
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No existen empleados para calcular liquidaciones!',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
