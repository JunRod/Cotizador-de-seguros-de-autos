//Constructores

function Seguro( marca, year, tipo) {
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

//Cotizar Seguro
Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    //Leer año
    const diferencia = new Date().getFullYear() - this.year
    cantidad -= ((diferencia * 3)*cantidad /100)


    /*
    Si el seguro es basico se multiplica un 30% mas
    Si el seguro es completo se multiplica un 50% mas
     */

    //Leer Tipo
    if (this.tipo === "basico") {
        cantidad *=  1.30
    } else {
        cantidad *=  1.50
    }

    return cantidad
}
//_________________________________________________________________________

function UI(){}

//Llenar select con los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
            min = max - 20
    const selectYear = document.querySelector("#year")

    for (let i = max; i > min; i--) {
        let option = document.createElement("option")
        option.textContent = i
        option.value = i
        selectYear.appendChild(option)
    }
}

UI.prototype.MostrarMensaje = function (mensaje) {
    limpiarHTML()
    const p = document.createElement("P")
    if (mensaje) {
        p.textContent = mensaje
        p.classList.add("correcto")
        resultado.appendChild(p)

        const spinner = document.querySelector("#cargando")
        spinner.style.display = "flex";
        setInterval(() => {
            spinner.style.display = "none"
        },2000)
    } else {
            p.textContent =  "Debe rellenar todos los campos";
            p.classList.add("error")
            resultado.appendChild(p)
    }
    setTimeout(() => {
        p.remove()
    }, 1000, )

}

UI.prototype.mostrarResultado = (total, seguro) => {

    limpiarHTML()
    let {marca, year, tipo } = seguro

    switch (marca) {
        case '1':
            marca = "Americano"
            break;
        case '2':
            marca = "Asiatico"
            break;
        case '3':
            marca = "Europeo"
            break;
        default:
            break;
    }

    //Crear el resultado
    const div = document.createElement("div")
    div.classList.add("mt-10")
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Tipo: <span class="font-normal">${tipo}</span> </p>
        <p class="font-bold">Marca: <span class="font-normal">${marca}</span> </p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span> </p>
        <p class="font-bold">Total: $<span class="font-normal">${total}</span> </p>
    `
    document.querySelector("#resultado").appendChild(div)

}

//Instancia
const ui = new UI()

addEventListeners()
function addEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        ui.llenarOpciones()
    })

    const formulario = document.querySelector("#cotizar-seguro")
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault()

    //leer marca seleccionada
    const marca = document.querySelector("#marca").value
    //leer el año seleccionado
    const year = document.querySelector("#year").value
    //leer el tipo de cobertura, leemos el valor de 2 radios.
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if (!marca && year && tipo) {
        ui.MostrarMensaje(null)
        return
    }
    ui.MostrarMensaje("Cotizando....")

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()
    //Utilizar el prototype que va a cotizar
    setTimeout(() => {
        ui.mostrarResultado(total, seguro)
    }, 2000)

}

function limpiarHTML() {
    const resultado = document.querySelector("#resultado")
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
