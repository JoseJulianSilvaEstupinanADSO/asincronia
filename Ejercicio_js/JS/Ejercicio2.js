// 2. Lea el archivo users.json suministrado por el instructor y tome como base
// las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.
// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
// y el avatar de cada aprendiz



async function usuario() {
    let response = await fetch("../json/users.json"); 
    let user = await response.json(); 
    let usuarios = user.users
    console.log(user)
    usuarios.forEach(async element => {
        let github = await fetch(`https://api.github.com/users/${element.name}/repos`);
        let usergit = await github.json();
        let avatar = await usergit.owner
        if (element.aprendiz === true) {
            let x = [element.name,avatar[0].avatar_url]
            console.log(x)
        }
    });

}

usuario()

