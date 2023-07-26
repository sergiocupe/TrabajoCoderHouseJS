//*******************************************************************************************/
//******************************** Declaro las Clases ************************************/
//*******************************************************************************************/
class Vacaciones{
  constructor(desde,hasta,dias)
  {
    this.desde=desde;
    this.hasta=hasta;
    this.dias=dias;
  }
}

class Empleado {
  aniosAntiguedad = 0;
  mesesAntiguedad = 0;
  diasAntiguedad = 0;

  constructor(nombre,sueldoBruto,fechaIngresoLaboral,fechaDesvinculacion,preAviso) {
    this.nombre = nombre;
    this.sueldoBruto = sueldoBruto;
    this.fechaIngresoLaboral = fechaIngresoLaboral;
    this.fechaDesvinculacion = fechaDesvinculacion;
    this.preAviso = preAviso;
  }
  obtenerNombre() {
    return this.nombre;
  }
  obtenerSueldoBruto() {
    return this.sueldoBruto;
  }
  obtenerFechaIngresoLaboral() {
    return new Date(this.fechaIngresoLaboral);
  }
  obtenerFechaDesvinculacion() {
    return new Date(this.fechaDesvinculacion);
  }
  obtenerPreAviso() {
    return this.preAviso;
  }
  obtenerAniosAntiguedad() {
    return this.aniosAntiguedad;
  }
  obtenerMesesAntiguedad() {
    return this.mesesAntiguedad;
  }
  obtenerDiasAntiguedad() {
    return this.diasAntiguedad;
  }
  obtenerAnioMesesDiasAntiguedad() {
    // Calcular la diferencia en milisegundos
    const diferenciaMs =
      this.obtenerFechaDesvinculacion() - this.obtenerFechaIngresoLaboral();

    // Calcular la diferencia en días, meses y años
    const milisegundosEnUnDia = 1000 * 60 * 60 * 24;

    const diferenciaDias = Math.floor(diferenciaMs / milisegundosEnUnDia);
    const diferenciaMeses =
      this.obtenerFechaDesvinculacion().getMonth() -
      this.obtenerFechaIngresoLaboral().getMonth() +
      12 *
        (this.obtenerFechaDesvinculacion().getFullYear() -
          this.obtenerFechaIngresoLaboral().getFullYear());
    const diferenciaAnios = Math.floor(diferenciaMeses / 12);

    // Ajustar la diferencia de días para tener en cuenta los meses y años completos
    const date1Ajustado = new Date(this.obtenerFechaIngresoLaboral());
    date1Ajustado.setFullYear(
      this.obtenerFechaIngresoLaboral().getFullYear() + diferenciaAnios
    );
    date1Ajustado.setMonth(
      this.obtenerFechaIngresoLaboral().getMonth() + (diferenciaMeses % 12)
    );
    const diferenciaDiasAjustado = Math.floor(
      (this.obtenerFechaDesvinculacion() - date1Ajustado) / milisegundosEnUnDia
    );
    this.aniosAntiguedad = diferenciaAnios;
    this.mesesAntiguedad = diferenciaMeses % 12;
    this.diasAntiguedad = Math.abs(diferenciaDiasAjustado);
  }
  imprimirInformacion()
  {
    console.log("Estimado %c" + persona.obtenerNombre(),"font-weight:bold;color:green;font-size:14px;","con los siguientes datos:")
    let tablaValores = [
      {
        descripcion: 'Sueldo Bruto',
        valor: persona.obtenerSueldoBruto()
      },
      {
        descripcion: 'Fecha Ingreso Laboral',
        valor: persona.obtenerFechaIngresoLaboral().toLocaleDateString()
      },
      {
        descripcion: 'Fecha Desvinculación',
        valor: persona.obtenerFechaDesvinculacion().toLocaleDateString()
      },
      {
        descripcion: 'PreAviso',
        valor: persona.obtenerPreAviso()
      }
    ]
    console.table(tablaValores)
    console.log("su liquidación final es de: ")
    console.log("")
  }
}

class Liquidacion {
  salarioProporcional = 0;
  sustitutivaPreAviso = 0;
  sacPreAviso = 0;
  sueldoDiasTrabajadorDelMes = 0;
  integracionMesDespido = 0;
  sacIntegracionMesDespido = 0;
  sacProporcional = 0;
  vacacionesNoGozadas = 0;
  sacVacacionesNoGozadas = 0;
  totalLiquidacion = 0;

  constructor(persona) {
    this.persona = persona;
    this.aniosAntiguedad = this.persona.obtenerAniosAntiguedad();
    this.mesesAntiguedad = this.persona.obtenerMesesAntiguedad();
    this.diasAntiguedad = this.persona.obtenerDiasAntiguedad();
    this.sueldoBruto = this.persona.obtenerSueldoBruto();
    this.preAviso = this.persona.obtenerPreAviso();
  }
  obtenerSalarioProporcional() {
    return this.salarioProporcional.toLocaleString("en-US");
  }
  obtenerSustitutivaPreAviso() {
    return this.sustitutivaPreAviso.toLocaleString("en-US");
  }
  obtenerSacPreAviso() {
    return this.sacPreAviso.toLocaleString("en-US");
  }
  obtenerSueldoDiasTrabajadorDelMes() {
    return this.sueldoDiasTrabajadorDelMes.toLocaleString("en-US");
  }
  obtenerIntegracionMesDespido() {
    return this.integracionMesDespido.toLocaleString("en-US");
  }
  obtenerSacIntegracionMesDespido() {
    return this.sacIntegracionMesDespido.toLocaleString("en-US");
  }
  obtenerSacProporcional() {
    return this.sacProporcional.toLocaleString("en-US");
  }
  obtenerVacacionesNoGozadas() {
    return this.vacacionesNoGozadas.toLocaleString("en-US");
  }
  obtenerSacVacacionesNoGozadas() {
    return this.sacVacacionesNoGozadas.toLocaleString("en-US");
  }
  obtenerTotalLiquidacion() {
    return this.totalLiquidacion.toLocaleString("en-US");
  }
  calcularSalarioProporcionalArt245() {
    //Si la antiguedad es menor a 3 meses, el salario proporcional es 0
    if (
      this.aniosAntiguedad == 0 &&
      this.mesesAntiguedad <= 3 &&
      this.diasAntiguedad == 0
    ) {
      this.salarioProporcional = 0;
    } else {
      //Si la antigüedad en >3 meses entonces se calula 1 sueldo Bruto por año
      this.salarioProporcional = this.aniosAntiguedad * this.sueldoBruto;
      //Si en el ultimo año que trabajo, excedio 3 meses, se le paga 1 sueldo bruto mas
      if (this.mesesAntiguedad > 3)
        this.salarioProporcional += this.sueldoBruto;
    }
  }

  calcularSustitutivaPreAviso() {
    //Si no hubo preaviso, se debe pagar el concepto de Sustitutiva
    if (this.preAviso == "N") {
      //Si la antigüedad en meses es <=3 meses corresponde 15 dias (bruto/30*15), sino 1 mes hasta 5 años o 2 meses cuando es mas de 5 años)
      if (
        this.aniosAntiguedad == 0 &&
        this.mesesAntiguedad <= 3 &&
        this.diasAntiguedad == 0
      ) {
        //Para el calulo de la antiguedad de años utilizo ceil para obtener el año mayor mas próximo al calular los meses/12
        this.sustitutivaPreAviso = (this.sueldoBruto / 30) * 15;
      } else if (this.aniosAntiguedad >= 0 && this.aniosAntiguedad <= 5) {
        this.sustitutivaPreAviso = this.sueldoBruto;
      } else {
        this.sustitutivaPreAviso = this.sueldoBruto * 2;
      }
    } else this.sustitutivaPreAviso = 0;
  }
  calcularSacPreAviso() {
    this.sacPreAviso = this.sustitutivaPreAviso / 12;
  }
  calcularSueldoDiasTrabajadorDelMes() {
    //Se paga el total correspondiente a los dias trabajados del mes de despido
    let diasTotalesMes = diasDelMes(this.persona.obtenerFechaDesvinculacion());
    let diaDesvinculacion = this.persona.obtenerFechaDesvinculacion().getDate();
    this.sueldoDiasTrabajadorDelMes =
      (this.sueldoBruto / diasTotalesMes) * diaDesvinculacion;
  }
  calcularIntegracionMesDespido() {
    //Se paga el total correspondiente a los dias que no trabajo del mes hasta completarlo
    let diasTotalesMes = diasDelMes(this.persona.obtenerFechaDesvinculacion());
    let diaDesvinculacion = this.persona.obtenerFechaDesvinculacion().getDate();
    this.integracionMesDespido =
      (this.sueldoBruto / diasTotalesMes) *
      (diasTotalesMes - diaDesvinculacion);
  }
  calcularSacIntegracionMesDespido() {
    //Se paga el proporcional del SAC segun la integracion del mes de despido
    this.sacIntegracionMesDespido = this.integracionMesDespido / 12;
  }
  calcularSacProporcional() {
    //Se paga el proporcional del SAC segun la cantidad de dias trabajados en el mes de despido
    let cantDiasTrabajadosAnioDespido =
      (this.persona.obtenerFechaDesvinculacion().getTime() -
        new Date(
          this.persona.obtenerFechaDesvinculacion().getFullYear(),
          1,
          1
        ).getTime()) /
      1000 /
      60 /
      60 /
      24;
    this.sacProporcional =
      (this.sueldoBruto / 2 / 180) * (cantDiasTrabajadosAnioDespido + 1);
  }
  calcularVacacionesNoGozadas() {
    //Se paga segun la cantidad de dias trabajados en el año, tenienedo en cuenta el arrayVacaciones
    let sueldoCalculado = this.sueldoBruto / 25;
    let cantDiasVacaciones = 0;
    let cantDiasTrabajadosAnioDespido =
      (this.persona.obtenerFechaDesvinculacion().getTime() -
        new Date(
          this.persona.obtenerFechaDesvinculacion().getFullYear(),
          1,
          1
        ).getTime()) /
      1000 /
      60 /
      60 /
      24;
    if (this.aniosAntiguedad == 0 && this.mesesAntiguedad < 6) {
      vacacionesNoGozadas = 0;
    } 
    else {
      cantDiasVacaciones = arrayVacaciones.filter(vacaciones=>this.aniosAntiguedad>=vacaciones.desde  && this.aniosAntiguedad<=vacaciones.hasta);
      this.vacacionesNoGozadas =
        sueldoCalculado *
        ((cantDiasVacaciones[0].dias / 365) * (cantDiasTrabajadosAnioDespido + 1));
    }
  }
  calcularSacVacacionesNoGozadas() {
    this.sacVacacionesNoGozadas = this.vacacionesNoGozadas / 12;
  }
  calcularTotalLiquidacion() {
    this.totalLiquidacion =
      this.salarioProporcional +
      this.sustitutivaPreAviso +
      this.sacPreAviso +
      this.sueldoDiasTrabajadorDelMes +
      this.integracionMesDespido +
      this.sacIntegracionMesDespido +
      this.sacProporcional +
      this.vacacionesNoGozadas +
      this.sacVacacionesNoGozadas;
  }
  calcularLiquidacion() {
    this.calcularSalarioProporcionalArt245();
    this.calcularSustitutivaPreAviso();
    this.calcularSacPreAviso();
    this.calcularSueldoDiasTrabajadorDelMes();
    this.calcularIntegracionMesDespido();
    this.calcularSacIntegracionMesDespido();
    this.calcularSacProporcional();
    this.calcularVacacionesNoGozadas();
    this.calcularSacVacacionesNoGozadas();
    this.calcularTotalLiquidacion();
  }
  imprimirLiquidacion() {
    console.log(
      "Salario proporcional mes en curso (días trabajados) - Antigüedad Art. 245: %c$" +
        this.obtenerSalarioProporcional(),"font-size:14px; color:black; font-weight:bold"
    );
    console.log(
      "Sustitutiva de Preaviso: %c$" + this.obtenerSustitutivaPreAviso(),"font-size:14px; color:black; font-weight:bold"
    );
    console.log("SAC del Preaviso: %c$" + this.obtenerSacPreAviso(),"font-size:14px; color:black; font-weight:bold");
    console.log(
      "Sueldo por días Trabajados del mes: %c$" +
        this.obtenerSueldoDiasTrabajadorDelMes(),"font-size:14px; color:black; font-weight:bold"
    );
    console.log(
      "Integración mes de despido: %c$" + this.obtenerIntegracionMesDespido(),"font-size:14px; color:black; font-weight:bold"
    );
    console.log(
      "SAC Integración mes de despido: %c$" +
        liquidacion.obtenerSacIntegracionMesDespido(),"font-size:14px; color:black; font-weight:bold"
    );
    console.log("SAC Proporcional: %c$" + this.obtenerSacProporcional(),"font-size:14px; color:black; font-weight:bold");
    console.log("Vacaciones no Gozadas: %c$" + this.obtenerVacacionesNoGozadas(),"font-size:14px; color:black; font-weight:bold");
    console.log(
      "SAC Vacaciones no Gozadas: %c$" + this.obtenerSacVacacionesNoGozadas(),"font-size:14px; color:black; font-weight:bold"
    );
    console.log("%cTOTAL DE LA LIQUIDACION: $" + this.obtenerTotalLiquidacion(),"font-size:18px; color:black; font-weight:bold;background-color:#B5FED9");
  }
}

//*******************************************************************************************/
//******************************** Declaro array de Vacaciones  *****************************/
//*******************************************************************************************/
// Cantidad de dias por antigüedad	  Cant dias
// 6 meses a 5 años	                    14
// 6 años a 10 años	                    21
// 11 años a 20 años	                  28
// mayor a 20 años	                    35

const arrayVacaciones = [];
//pongo 0 en el objeto 0 del array, porque quiero representar años, luego lo valido en la funcion del calculo de vacaciones y no le permito si tiene menos de 6 meses de trabajo
arrayVacaciones.push(new Vacaciones(0,5,14)) 
arrayVacaciones.push(new Vacaciones(6,10,21))
arrayVacaciones.push(new Vacaciones(11,20,28))
arrayVacaciones.push(new Vacaciones(21,999,35))

//*******************************************************************************************/
//******************************** Declaro las Funciones ************************************/
//************************* Para Validaciones de datos en el ingreso ************************/
//*******************************************************************************************/

//Algoritmo en una funcion con ciclo y condicional
function IngresarSueldoBruto() {
  while (true) {
    let sueldo = prompt("Cual fue su mayor Sueldo Bruto?");
    if (!isNaN(sueldo) && sueldo != null && sueldo != "") {
      return Number(sueldo);
      break;
    } else {
      alert("El sueldo ingresado es incorrecto.");
      continue;
    }
  }
}

//Algoritmo en una funcion con ciclo y condicional
function IngresarFecha(tipoFecha) {
  while (true) {
    let fecha = prompt("Cual fue su fecha de " + tipoFecha + " dd/MM/aaaa?");

    var fechaAux = fecha.split("/");
    var fecha1 = new Date(
      parseInt(fechaAux[2]),
      parseInt(fechaAux[1] - 1),
      parseInt(fechaAux[0])
    );

    if (!isNaN(fecha1) && fecha1 != null && fecha1 != "") {
      return fecha1.toLocaleDateString("en-EN");
      break;
    } else {
      alert("El fecha ingresada es incorrecto.");
      continue;
    }
  }
}

//Algoritmo en una funcion con ciclo y condicional
function IngresoPreAviso() {
  while (true) {
    let preAviso = prompt("Hubo preaviso (S o N)?");
    if (preAviso == "S" || preAviso == "N") {
      return preAviso;
      break;
    } else {
      alert("El valor ingresado es incorrecto.");
      continue;
    }
  }
}

function diasDelMes(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), 0).getDate();
}

//*******************************************************************************************/
//********************** Solicito al usuario los datos para el calculo  *********************/
//********************** Luego se realizado el calculo de la liquidacion ********************/
//*******************************************************************************************/

// let nombre = prompt("Ingrese su Nombre y Apellido")
// let sueldoBruto = IngresarSueldoBruto()
// let fechaIngresoLaboral = IngresarFecha("Ingreso Laboral")
// let fechaDesvinculacion = IngresarFecha("Desvinculación")
// let preAviso = IngresoPreAviso()

//Declaro las clases para el proceso
//let persona = new Empleado(nombre,sueldoBruto,fechaIngresoLaboral,fechaDesvinculacion, preAviso)

//Dejo esta linea para probar sin tener que ingresar todos los datos
let persona = new Empleado("Pedro",500000,new Date(2016, 07, 18).toLocaleDateString("en-EN"),new Date(2023, 06, 15).toLocaleDateString("en-EN"),"N");

persona.obtenerAnioMesesDiasAntiguedad();
persona.imprimirInformacion();

let liquidacion = new Liquidacion(persona);
liquidacion.calcularLiquidacion();
liquidacion.imprimirLiquidacion();
