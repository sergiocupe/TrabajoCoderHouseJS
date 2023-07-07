//Declaro las variables con los datos ingresados por el usuario
let nombre = prompt("Ingrese su Nombre y Apellido")
let sueldoBruto = IngresarSueldoBruto()
let fechaIngresoLaboral = IngresarFecha("Ingreso Laboral")
let fechaDesvinculacion = IngresarFecha("Desvinculación")
let preaviso = IngresoPreAviso()

//Comienzo a hacer los calculos
let mesesAntiguedad = CalculoMesesAntiguedad(new Date(fechaDesvinculacion),new Date(fechaIngresoLaboral))
alert ("Nombre: " + nombre + "\nSuelo: " + sueldoBruto + "\nFecha Ingreso: " + fechaIngresoLaboral + "\nFecha Desvinculación: " + fechaDesvinculacion + "\nPreaviso: " + preaviso + "\nMeses de Antiguedad: " + mesesAntiguedad)

//Funciones
function IngresarSueldoBruto(){
	while(true){
		let sueldo = prompt("Cual fue su mayor Sueldo Bruto?")
		if(!isNaN(sueldo) && sueldo != null && sueldo != ""){
			return sueldo
		  break
		}else{
			alert('El sueldo ingresado es incorrecto.')
		  continue
		}
	}
}
function IngresarFecha(tipoFecha){
	while(true){
		let fecha = prompt("Cual fue su fecha de " + tipoFecha + " dd/MM/aaaa?")

		var fechaAux = fecha.split("/")
		var fecha1 = new Date(parseInt(fechaAux[2]),parseInt(fechaAux[1]-1),parseInt(fechaAux[0]))

		if(!isNaN(fecha1) && fecha1 != null && fecha1 != ""){
			return fecha1.toLocaleDateString('en-EN')
		  break
		}else{
			alert('El fecha ingresada es incorrecto.')
		  continue
		}
	}
}

function IngresoPreAviso()
{
	while(true){
		let preAviso = prompt("Hubo preaviso (S o N)?")
		if(preAviso == "S" || preAviso == "N"){
			return preAviso
		  break
		}else{
			alert('El valor ingresado es incorrecto.')
		  continue
		}
	}
}

function CalculoMesesAntiguedad(fecha1,fecha2)
{
	let meses
	meses = (fecha1.getFullYear() - fecha2.getFullYear()) * 12
	meses -= fecha1.getMonth() 
	meses += fecha2.getMonth() 

	if (meses<=0)
		return 0
	else
		return meses
}