// 5. Lea el archivo user.json y transforme todos los nombres a mayúsculas
// (recorra usuario por usuario) validando que solo se permita ingresar letras
// mayúsculas (se valida con un proxy)
// a. Modifique solo los usuarios que tengan el rol aprendiz en true
// b. Modifique solo los usuarios que más de dos nombres ejemplo (John
// Becerra)
// c. Modifique solo los usuarios que contenga la palabra ADSO en su
// user


async function usuario() {
    let response = await fetch("../json/users.json"); 
    let user = await response.json(); 
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true)
    console.log(usuarios)
    

}

usuario()
