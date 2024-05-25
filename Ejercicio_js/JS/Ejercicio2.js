// 2. Lea el archivo users.json suministrado por el instructor y tome como base
// las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.
// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
// y el avatar de cada aprendiz



async function usuario() {
    let response = await fetch("../json/users.json"); 
    let user = await response.json(); 
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true)
    console.log(usuarios)
    await usuarios.forEach(async element => {
        let github = await fetch(`https://api.github.com/users/${element.user}/repos`);
        let usergit = await github.json();
        for (let i = 0; i < 1; i++) {
            const element = usergit[i];
            let x = [element.full_name, element.owner.avatar_url]
            console.table(x)
        }    
    });

}

usuario()

