// 4. Basados en la solución del punto 3 daremos solución a los siguientes
// puntos:
// a. Muestre solo los resultados que tengan menos de 5 repositorios
// públicos en una tabla por consola.
// b. Muestre solo los resultados de los repositorios que contengan la
// palabra JavaScript en su name
// c. Ordene de menor a mayor según el nombre del repositorio
// d. Muestre solo los repositorios que tengan mas de cinco letras en su
// nombre

async function usuario() {
    let response = await fetch("../json/users.json"); 
    let user = await response.json(); 
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true)
    usuarios.map(async (element) => {
        let github =  await fetch(`https://api.github.com/users/${element.user}/repos`);
        let usergit = await github.json();
        let cant = []
        console.log("Aprendiz: "+ element.name)
        usergit.map((elemento) =>{
             cant.push(elemento.name)
        })
        // Aprendices con 5 o menos repositorios
        if (cant.length <= 5) {
            console.log("El Aprendis tiene 5 o menos repositorios")
            console.table(cant)
        }
        else{
            console.log("El aprendiz tiene 6 o mas repositorios")
        }
        //Aprendices con repositorios con la palabra javascritp
        let javascrip = [];
        let filtro = cant.filter((filt) => {
            if(filt.toLowerCase().includes("javascript")){
                javascrip.push(filt)           
            }
        })
        if (javascrip.length >= 1) {
            console.log("El aprendiz tiene los siguientes repositorios con la palabra JavaScript")
            console.table(javascrip)
        }
        filtro
        //Ordenar repositorios
        let orden = cant.sort()
        console.log("Repositorios Ordenados")
        console.table(orden)

        //Repositorios con 5 o mas caracteres
        let caracteres = [];
        cant.filter((fil) => {
            if(fil.length > 5){
                caracteres.push(fil)
            }
        })
        console.log("Los repositorios de aprendiz con 5 o mas caracteres son: ")
        console.table(caracteres)
    })
    

}

usuario()
