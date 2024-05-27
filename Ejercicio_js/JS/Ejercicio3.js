// 3. Basado en la solución del punto 2, transforme esta solución utilizando
// async/await
// a. muestre los repositorios públicos de cada aprendiz en consola.
// b. Una todos los resultados en un solo arreglo
// c. Filtre la consulta con solo los aprendices que tengan el rol de
// aprendiz, esta solución se deba dar antes de realizar la solicitud al
// api.

// Definición de una función asíncrona llamada 'usuario'
async function usuario() {
    // Crear un array vacío llamado 'todo'
    let todo = [];
    
    // Realizar una solicitud para obtener el archivo users.json
    let response = await fetch("../json/users.json");
    
    // Convertir la respuesta a formato JSON
    let user = await response.json();
    
    // Filtrar los usuarios que tienen el rol de aprendiz en true
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true);
    
    // Iterar sobre cada usuario filtrado
    usuarios.forEach(async element => {
        // Realizar una solicitud a la API de GitHub para obtener los repositorios del usuario
        let github = await fetch(`https://api.github.com/users/${element.user}/repos`);
        
        // Convertir la respuesta de GitHub a formato JSON
        let usergit = await github.json();
        
        // Agregar el nombre del usuario al array 'todo'
        todo.push(element.name);
        
        // Iterar sobre cada repositorio del usuario en GitHub
        usergit.forEach(element => {
            // Agregar el nombre del repositorio al array 'todo'
            todo.push(element.name);
        });
        
        // Mostrar el contenido del array 'todo' en la consola en formato de tabla
        console.table(todo);
        
        // Limpiar el array 'todo' para la próxima iteración
        todo = [];
    });
}

// Llamar a la función 'usuario' para ejecutar el código
usuario();