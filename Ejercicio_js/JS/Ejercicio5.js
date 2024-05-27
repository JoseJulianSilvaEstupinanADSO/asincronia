// 5. Lea el archivo user.json y transforme todos los nombres a mayúsculas
// (recorra usuario por usuario) validando que solo se permita ingresar letras
// mayúsculas (se valida con un proxy)
// a. Modifique solo los usuarios que tengan el rol aprendiz en true
// b. Modifique solo los usuarios que más de dos nombres ejemplo (John
// Becerra)
// c. Modifique solo los usuarios que contenga la palabra ADSO en su
// user


// Definición del handler para el Proxy
const handler = {
    // Definición de la función 'set' para interceptar la asignación de propiedades
    set: function(obj, prop, value) {
        // Si la propiedad que se está configurando es 'name'
        if (prop === 'name') {
            // Validar que el valor sea una cadena
            if (typeof value === 'string') {
                // Convertir el valor a mayúsculas y asignarlo
                obj[prop] = value.toUpperCase();
            } else {
                // Mostrar un error si el valor no es una cadena
                console.error(`Valor inválido para ${prop}: ${value}`);
            }
        } else {
            // Para otras propiedades, asignar el valor directamente
            obj[prop] = value;
        }
        // Retornar true para indicar que la asignación fue exitosa
        return true;
    }
};

// Función asíncrona para transformar los nombres de usuario a mayúsculas
async function transformUserNamesToUppercase() {
    try {
        // Leer el archivo users.json
        let response = await fetch('../json/users.json');
        // Convertir la respuesta a JSON
        let jsonData = await response.json();
        
        // Procesar cada usuario y transformar los nombres a mayúsculas usando Proxy
        jsonData.users.forEach(user => {
            // Si el usuario tiene el rol de aprendiz
            if(user.aprendiz === true){
                // Crear un Proxy para el usuario
                const proxy = new Proxy(user, handler);
                // Activar el handler 'set' configurando el nombre nuevamente
                proxy.name = proxy.name;
            }
        });

        // Filtrar los usuarios cuyo nombre de usuario contiene "ADSO"
        let filtro = jsonData.users.filter((x) => {
            if (x.user.toUpperCase().includes("ADSO")) {
                return x.user;
            }
        });

        // Filtrar los usuarios que tienen más de dos nombres
        let filtro2 = jsonData.users.filter((nombres) => {
            if(nombres.name.split(' ').length > 2){
                return(nombres.name);
            }
        });

        // Mostrar los datos transformados en la consola
        console.log("Usuarios con el rol Aprendiz true");
        console.log(jsonData);

        // Mostrar los usuarios cuyo nombre de usuario contiene "ADSO"
        console.log("Usuarios con ADSO en su nombre");
        console.log(filtro);

        // Mostrar los usuarios que tienen más de dos nombres
        console.log("Usuarios con más de 2 nombres");
        console.log(filtro2);

    } catch (error) {
        // Manejo de errores
        console.error('Error:', error);
    }
}

// Ejecutar la función
transformUserNamesToUppercase();