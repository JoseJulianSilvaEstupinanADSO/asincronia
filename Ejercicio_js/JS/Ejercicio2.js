// 2. Lea el archivo users.json suministrado por el instructor y tome como base
// las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.
// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
// y el avatar de cada aprendiz



async function usuario() {
    let response = await fetch("../json/users.json"); 
    // Realiza una solicitud HTTP para obtener un archivo JSON desde la URL especificada "../json/users.json".
    // 'await' hace que la ejecución espere hasta que la promesa de fetch se resuelva.
    // El resultado se almacena en la variable 'response'.

    let user = await response.json(); 
    // 'response.json()' convierte la respuesta en un objeto JSON.
    // 'await' espera a que esta conversión termine.
    // El objeto JSON resultante se almacena en la variable 'user'.

    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true);
    // Filtra el array 'user.users' para obtener solo aquellos objetos donde 'aprendiz.aprendiz' sea verdadero.
    // El array filtrado se almacena en la variable 'usuarios'.

    console.log(usuarios);
    // Imprime el array filtrado 'usuarios' en la consola.

    await usuarios.forEach(async element => {
        // Itera sobre cada elemento del array 'usuarios'.
        // 'await' se usa aquí para asegurarse de que cada iteración del forEach espere a que las operaciones asíncronas se completen antes de pasar a la siguiente iteración.

        let github = await fetch(`https://api.github.com/users/${element.user}/repos`);
        // Realiza una solicitud HTTP a la API de GitHub para obtener los repositorios del usuario especificado en 'element.user'.
        // 'await' hace que la ejecución espere hasta que la promesa de fetch se resuelva.
        // El resultado se almacena en la variable 'github'.

        let usergit = await github.json();
        // 'github.json()' convierte la respuesta en un objeto JSON.
        // 'await' espera a que esta conversión termine.
        // El objeto JSON resultante se almacena en la variable 'usergit'.

        for (let i = 0; i < 1; i++) {
            // Un bucle for que solo se ejecuta una vez.
            const element = usergit[i];
            // Obtiene el primer elemento del array 'usergit'.

            let x = [element.full_name, element.owner.avatar_url];
            // Crea un array 'x' que contiene el nombre completo del repositorio y la URL del avatar del propietario del repositorio.

            console.table(x);
            // Imprime el array 'x' en la consola en forma de tabla.
        }    
    });
}

usuario();
// Llama a la función asíncrona 'usuario' para ejecutar el código.