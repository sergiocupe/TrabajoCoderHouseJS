//*******************************************************************************************/
//*************** Declaro las variables con los datos ingresados por el usuario *************/
//*******************************************************************************************/

let nombre = prompt("Ingrese su Nombre y Apellido");
let sueldoBruto = IngresarSueldoBruto();
let fechaIngresoLaboral = IngresarFecha("Ingreso Laboral");
let fechaDesvinculacion = IngresarFecha("Desvinculación");
let preaviso = IngresoPreAviso();

//*******************************************************************************************/
//******************************** Declaro las Funciones ************************************/
//*******************************************************************************************/

//Algoritmo en una funcion con ciclo y condicional
function IngresarSueldoBruto() {
	while (true) {
	  let sueldo = prompt("Cual fue su mayor Sueldo Bruto?");
	  if (!isNaN(sueldo) && sueldo != null && sueldo != "") {
		return sueldo;
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
  
  //Algoritmo en una funcion con condicional
  function CalculoMesesAntiguedad(fecha1, fecha2) {
	let meses;
	meses = (fecha1.getFullYear() - fecha2.getFullYear()) * 12;
	meses -= fecha1.getMonth();
	meses += fecha2.getMonth();
  
	if (meses <= 0) 
		return 0;
	else 
		return meses;
  }
  
  //Algoritmo en una funcion con ciclo
  function MostrarSueldoXMeses(meses) {
	let totalSueldo = 0;
	for (i = 1; i <= meses; i++) {
	  console.log("Sueldo mes " + i + ": $" + sueldoBruto);
	  totalSueldo = totalSueldo + parseInt(sueldoBruto);
	}
	console.log("Liquidacion final en sueldos brutos: $" + totalSueldo);
  }

//*******************************************************************************************/
//************************* Imprimo los datos Ingresados y calculos *************************/
//*******************************************************************************************/

//Imprimo Datos Ingresados
console.log(
  "Nombre: " +
    nombre +
    "\nSueldo: " +
    sueldoBruto +
    "\nFecha Ingreso: " +
    fechaIngresoLaboral +
    "\nFecha Desvinculación: " +
    fechaDesvinculacion +
    "\nPreaviso: " +
    preaviso
);

//Realizo Calculos de meses de antiguedad con las fechas ingresadas
let mesesAntiguedad = CalculoMesesAntiguedad(new Date(fechaDesvinculacion),new Date(fechaIngresoLaboral));

  
//Imprimo los calculos de meses
console.log("\nMeses de Antiguedad: " + mesesAntiguedad);

//Muestro los sueldos por cada mes de antiguedad
MostrarSueldoXMeses(mesesAntiguedad);
