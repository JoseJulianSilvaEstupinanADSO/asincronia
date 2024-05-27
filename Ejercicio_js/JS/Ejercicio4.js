// 4. Basados en la solución del punto 3 daremos solución a los siguientes
// puntos:
// a. Muestre solo los resultados que tengan menos de 5 repositorios
// públicos en una tabla por consola.
// b. Muestre solo los resultados de los repositorios que contengan la
// palabra JavaScript en su name
// c. Ordene de menor a mayor según el nombre del repositorio
// d. Muestre solo los repositorios que tengan mas de cinco letras en su
// nombre

// Definición de la función asíncrona 'usuario'
async function usuario() {
    // Realizar una solicitud para obtener el archivo users.json
    let response = await fetch("../json/users.json");
    
    // Convertir la respuesta a formato JSON
    let user = await response.json();
    
    // Filtrar los usuarios que tienen el rol de aprendiz en true
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true);
    
    // Iterar sobre cada usuario filtrado utilizando 'map'
    usuarios.map(async (element) => {
        // Realizar una solicitud a la API de GitHub para obtener los repositorios del usuario
        let github =  await fetch(`https://api.github.com/users/${element.user}/repos`);
        
        // Convertir la respuesta de GitHub a formato JSON
        let usergit = await github.json();
        
        // Crear un array vacío llamado 'cant'
        let cant = [];
        
        // Imprimir separadores en la consola
        console.log("//////////////////////////////////////////////////////////////////////////////");
        console.log("//////////////////////////////////////////////////////////////////////////////");
        
        // Imprimir el nombre del aprendiz en la consola
        console.log("Aprendiz: " + element.name);
        
        // Iterar sobre cada repositorio del usuario en GitHub y agregar el nombre al array 'cant'
        usergit.map((elemento) => {
            cant.push(elemento.name);
        });

        // Aprendices con 5 o menos repositorios
        if (cant.length <= 5) {
            // Si el aprendiz tiene 5 o menos repositorios, imprimir mensaje y los repositorios
            console.log("El aprendiz tiene 5 o menos repositorios");
            console.table(cant);
        } else {
            // Si el aprendiz tiene más de 5 repositorios, imprimir mensaje
            console.log("El aprendiz tiene 6 o más repositorios");
        }

        // Aprendices con repositorios que contienen la palabra 'javascript'
        let javascrip = [];
        
        // Filtrar los repositorios que contienen la palabra 'javascript' y agregarlos al array 'javascrip'
        let filtro = cant.filter((filt) => {
            if (filt.toLowerCase().includes("javascript")) {
                javascrip.push(filt);
            }
        });

        // Si hay repositorios con la palabra 'javascript', imprimir mensaje y los repositorios
        if (javascrip.length >= 1) {
            console.log("El aprendiz tiene los siguientes repositorios con la palabra JavaScript");
            console.table(javascrip);
        }

        filtro; // Esta línea no hace nada, puede ser removida

        // Ordenar los repositorios
        let orden = cant.sort();
        console.log("Repositorios Ordenados");
        console.table(orden);

        // Repositorios con 5 o más caracteres
        let caracteres = [];
        
        // Filtrar los repositorios que tienen más de 5 caracteres y agregarlos al array 'caracteres'
        cant.filter((fil) => {
            if (fil.length > 5) {
                caracteres.push(fil);
            }
        });
        
        // Imprimir los repositorios con 5 o más caracteres
        console.log("Los repositorios de aprendiz con 5 o más caracteres son: ");
        console.table(caracteres);
    });
}

// Llamar a la función 'usuario' para ejecutar el código
usuario();
