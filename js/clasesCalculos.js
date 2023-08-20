//*******************************************************************************************/
//******************************** Declaro las Clases ************************************/
//*******************************************************************************************/
class Vacaciones {
  constructor(desde, hasta, dias) {
    this.desde = desde;
    this.hasta = hasta;
    this.dias = dias;
  }
}


class Empleado {
  constructor(id,nombre,sueldoBruto,fechaIngresoLaboral,fechaDesvinculacion,preAviso) {
    this.id=id;
    this.nombre = nombre;
    this.sueldoBruto = sueldoBruto;
    this.fechaIngresoLaboral = new Date(fechaIngresoLaboral)
    this.fechaDesvinculacion = new Date(fechaDesvinculacion)
    this.preAviso = preAviso;
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
  totalLiquidacionDolares=0;
  
  aniosAntiguedad = 0;
  mesesAntiguedad = 0;
  diasAntiguedad = 0;
  liquidacionFinal = 0;

  detalleLiquidacion=""

  constructor(empleado) {
    this.empleado = empleado;
  }

  
  obtenerTotalLiquidacion() {
    return this.totalLiquidacion.toLocaleString("en-US")
  }

  obtenerTotalLiquidacionDolares() {
    return this.totalLiquidacionDolares.toLocaleString("en-US")
  }
  
  obtenerAnioMesesDiasAntiguedad() {
    let fechaDesvinculacion = new Date(this.empleado.fechaDesvinculacion)
    let fechaIngresoLaboral = new Date(this.empleado.fechaIngresoLaboral)
    // Calcular la diferencia en milisegundos
    const diferenciaMs = fechaDesvinculacion - fechaIngresoLaboral;

    // Calcular la diferencia en días, meses y años
    const milisegundosEnUnDia = 1000 * 60 * 60 * 24;

    //const diferenciaDias = Math.floor(diferenciaMs / milisegundosEnUnDia);
    const diferenciaMeses =
      fechaDesvinculacion.getMonth() -
      fechaIngresoLaboral.getMonth() +
      12 *
        (fechaDesvinculacion.getFullYear() -
        fechaIngresoLaboral.getFullYear());
    const diferenciaAnios = Math.floor(diferenciaMeses / 12);

    // Ajustar la diferencia de días para tener en cuenta los meses y años completos
    const date1Ajustado = new Date(fechaIngresoLaboral);
    date1Ajustado.setFullYear(
      fechaIngresoLaboral.getFullYear() + diferenciaAnios
    );
    date1Ajustado.setMonth(
      fechaIngresoLaboral.getMonth() + (diferenciaMeses % 12)
    );
    const diferenciaDiasAjustado = Math.floor(
      (fechaDesvinculacion - date1Ajustado) / milisegundosEnUnDia
    );
    this.aniosAntiguedad = diferenciaAnios;
    this.mesesAntiguedad = diferenciaMeses % 12;
    this.diasAntiguedad = Math.abs(diferenciaDiasAjustado);
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
      this.salarioProporcional = this.aniosAntiguedad * this.empleado.sueldoBruto;
      //Si en el ultimo año que trabajo, excedio 3 meses, se le paga 1 sueldo bruto mas
      if (this.mesesAntiguedad > 3)
        this.salarioProporcional += this.empleado.sueldoBruto;
    }
  }

  calcularSustitutivaPreAviso() {
      //Si no hubo preaviso, se debe pagar el concepto de Sustitutiva
      if (this.empleado.preAviso == "NO") {
        //Si la antigüedad en meses es <=3 meses corresponde 15 dias (bruto/30*15), sino 1 mes hasta 5 años o 2 meses cuando es mas de 5 años)
        if (
          this.aniosAntiguedad == 0 &&
          this.mesesAntiguedad <= 3 &&
          this.diasAntiguedad == 0
        ) {
          //Para el calulo de la antiguedad de años utilizo ceil para obtener el año mayor mas próximo al calular los meses/12
          this.sustitutivaPreAviso = (this.empleado.sueldoBruto / 30) * 15;
        } else if (
          this.aniosAntiguedad >= 0 &&
          this.aniosAntiguedad <= 5
        ) {
          this.sustitutivaPreAviso = this.empleado.sueldoBruto;
        } else {
          this.sustitutivaPreAviso = this.empleado.sueldoBruto * 2;
        }
      } else this.sustitutivaPreAviso = 0;
    }

  calcularSacPreAviso() {
    this.sacPreAviso = this.sustitutivaPreAviso / 12;
  }

  calcularSueldoDiasTrabajadorDelMes() {
    //Se paga el total correspondiente a los dias trabajados del mes de despido
    let fechaDesvinculacion = new Date(this.empleado.fechaDesvinculacion)
    let diasTotalesMes = diasDelMes(fechaDesvinculacion);
    let diaDesvinculacion = fechaDesvinculacion.getDate();
    this.sueldoDiasTrabajadorDelMes =
      (this.empleado.sueldoBruto / diasTotalesMes) * diaDesvinculacion;
  }
  calcularIntegracionMesDespido() {
    //Se paga el total correspondiente a los dias que no trabajo del mes hasta completarlo
    let fechaDesvinculacion = new Date(this.empleado.fechaDesvinculacion)
    let diasTotalesMes = diasDelMes(fechaDesvinculacion);
    let diaDesvinculacion = fechaDesvinculacion.getDate();
    this.integracionMesDespido =
      (this.empleado.sueldoBruto / diasTotalesMes) *
      (diasTotalesMes - diaDesvinculacion);
  }
  calcularSacIntegracionMesDespido() {
    //Se paga el proporcional del SAC segun la integracion del mes de despido
    this.sacIntegracionMesDespido = this.integracionMesDespido / 12;
  }
  calcularSacProporcional() {
    let fechaDesvinculacion = new Date(this.empleado.fechaDesvinculacion)
    //Se paga el proporcional del SAC segun la cantidad de dias trabajados en el mes de despido
    let cantDiasTrabajadosAnioDespido =
      (fechaDesvinculacion.getTime() -
        new Date(
          fechaDesvinculacion.getFullYear(),
          1,
          1
        ).getTime()) /
      1000 /
      60 /
      60 /
      24;
    this.sacProporcional =
      (this.empleado.sueldoBruto / 4 / 360) * (cantDiasTrabajadosAnioDespido + 1);
  }
  calcularVacacionesNoGozadas() {
    let fechaDesvinculacion = new Date(this.empleado.fechaDesvinculacion)
    //Se paga segun la cantidad de dias trabajados en el año, tenienedo en cuenta el arrayVacaciones
    let sueldoCalculado = this.empleado.sueldoBruto / 25;
    let cantDiasVacaciones = 0;
    let cantDiasTrabajadosAnioDespido =
      (fechaDesvinculacion.getTime() -
        new Date(
          fechaDesvinculacion.getFullYear(),
          1,
          1
        ).getTime()) /
      1000 /
      60 /
      60 /
      24;
    if (this.aniosAntiguedad == 0 && this.mesesAntiguedad < 6) {
      this.vacacionesNoGozadas = 0;
    } else {
      cantDiasVacaciones = arrayVacaciones.filter(
        (vacaciones) =>
          this.aniosAntiguedad >= vacaciones.desde &&
          this.aniosAntiguedad <= vacaciones.hasta
      );
      this.vacacionesNoGozadas =
        sueldoCalculado *
        ((cantDiasVacaciones[0].dias / 365) *
          (cantDiasTrabajadosAnioDespido + 1));
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

  calcularTotalLiquidacionDolares(){
    this.totalLiquidacionDolares = this.totalLiquidacion/parseFloat(cotizacionDolar)
  }

  calcularLiquidacion() {
    this.obtenerAnioMesesDiasAntiguedad();
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
    this.calcularTotalLiquidacionDolares();
    this.imprimirLiquidacion();
  }

  
  imprimirLiquidacion() {
    this.detalleLiquidacion = "Antigüedad Art. 245: $" + this.salarioProporcional.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>Sustitutiva de Preaviso: $" + this.sustitutivaPreAviso.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>SAC del Preaviso: $" + this.sacPreAviso.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>Sueldo por días Trabajados del mes: $" + this.sueldoDiasTrabajadorDelMes.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>Integración mes de despido: $" + this.integracionMesDespido.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>SAC Integración mes de despido: $" + this.sacIntegracionMesDespido.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>SAC Proporcional: $" + this.sacProporcional.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>Vacaciones no Gozadas: $" + this.vacacionesNoGozadas.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>SAC Vacaciones no Gozadas: $" + this.sacVacacionesNoGozadas.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/><strong>TOTAL DE LA LIQUIDACION:</strong>"
    this.detalleLiquidacion += "<br/>$ " + this.totalLiquidacion.toLocaleString("en-US")
    this.detalleLiquidacion += "<br/>USD " + this.totalLiquidacionDolares.toLocaleString("en-US")
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
arrayVacaciones.push(new Vacaciones(0, 5, 14));
arrayVacaciones.push(new Vacaciones(6, 10, 21));
arrayVacaciones.push(new Vacaciones(11, 20, 28));
arrayVacaciones.push(new Vacaciones(21, 999, 35));
