// medoto ready
$(() => {
  getJSON();
  newUser();
  iniciarSesion();
});

const Users = "https://api.jsonbin.io/b/6158ba66aa02be1d44530a03/latest";
const Messages = "https://api.jsonbin.io/b/6158bb13aa02be1d44530a48/latest";
// var para ingresar todos los datos obtenidos de los json
let allUsers = [];
let allMessages = [];

/**
 * -----------CLASS-----------
 */

class User {
  constructor(id, name, lastName, userName, email, password, message) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.message = message;
  }
}

/**
 * -----------FUNCTIONS-----------
 */

// -----obtener datos de sitio externo-----
function getJSON() {
  // usuarios
  $.get(Users, (respuesta, estado) => {
    if (estado === "success") {
      for (let user of respuesta) {
        let id = 1;

        allUsers.push(
          new User(
            id,
            user.name,
            user.lastName,
            user.userName,
            user.email,
            user.password
          )
        );
        console.log(allUsers);
        id++;
      }
    }
  });

  // mensajes
  $.get(Messages, (respuesta, estado) => {
    if (estado === "success") {
      for (let mensaje of respuesta) {
        allMessages.push(mensaje);
        console.log(allMessages);
      }
    }
  });
}

// -----creacion de nuevo usuario-----
function newUser() {
  $(".registro__form").submit((e) => {
    e.preventDefault();

    let nameRegistro = $("#nameRegistro").val();
    let lastNameRegistro = $("#lastNameRegistro").val();
    let userNameRegistro = $("#userNameRegistro").val();
    let emailRegistro = $("#emailRegistro").val();
    let passwordRegistro = $("#passwordRegistro").val();

    let newUser = new User(
      buscarIDMayor() + 1,
      nameRegistro,
      lastNameRegistro,
      userNameRegistro,
      emailRegistro,
      passwordRegistro
    );

    // comprueba que no haya un mismo mail o nombre de usuario registrado
    let searchUserData = allUsers.findIndex(
      (user) =>
        user.email === emailRegistro || user.userName === userNameRegistro
    );

    console.log(searchUserData);

    if (searchUserData != -1) {
      alert("Ya hay un usuario creado con estos datos");
    } else alert("Usuario creado exitosamente");

    // $.ajax({
    //   url: "https://api.jsonbin.io/b/6158ba66aa02be1d44530a03",
    //   contentType: "application/json",
    //   method: "PUT",
    //   // XMasterKey: "$2b$10$qH15jVVrZx5IdUwzpCr5hOTNWz.4Tp.zkCRLbq/rGD5TSdkjh4eIq",
    //   data: JSON.stringify(newUser),
    // })
    //   .done(() => console.log("SUCCESS"))
    //   .fail((msg) => console.log(`Error: ${msg}`))
    //   .always((msg) => console.log(`Always: ${msg}`));

    // window.location.reload();
  });
}

// -----inicio de sesion-----
function iniciarSesion() {
  $(".ingreso__form").submit((e) => {
    e.preventDefault();

    let emailIngreso = $("#emailIngreso").val();
    let passwordIngreso = $("#passwordIngreso").val();

    // busco si el mail ingresado esta registrado
    let searchEmail = allUsers.findIndex((user) => user.email === emailIngreso);
    // busco su contrasena
    let searchPassword = allUsers[searchEmail].password;

    console.log(searchEmail, searchPassword);

    if (searchEmail != -1 && searchPassword === passwordIngreso) {
      alert("INGRESO CORRECTO");
    } else alert("INCORRECTO");
  });
}

// -----busca el id mayor de todos los usuarios para poder asignarle +1 a un nuevo usuario-----
function buscarIDMayor() {
  for (let i = 0; i <= allUsers.length; i++) {
    return Math.max(allUsers[i].id);
  }
}

// -----enviar mensajes-----
function sendMessages() {
  $(".send-message__form").submit((e) => {
    e.preventDefault();
  });
}
