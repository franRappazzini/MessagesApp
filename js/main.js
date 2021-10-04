// medoto ready
$(() => {
  mainBtns();
  getJSON();
  newUser();
  iniciarSesion();

  // message.js
  showMessages();
  sendMessages();
  verUser();
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

class Message {
  constructor(email, userName, message) {
    this.email = email;
    this.userName = userName;
    this.message = message;
  }
}

/**
 * -----------FUNCTIONS-----------
 */

function mainBtns() {
  $("#crearUsuario").click(() => {
    $(".ingreso__form").hide();
    $(".bienvenida__container").hide();
    $(".registro__form").fadeIn();
  });

  $("#iniciarSesion").click(() => {
    $(".registro__form").hide();
    $(".bienvenida__container").hide();
    $(".ingreso__form").fadeIn();
  });
}

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
        allMessages.push(
          new Message(mensaje.email, mensaje.userName, mensaje.message)
        );
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

    // creo objeto User
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
      $(".alert__sesion").append(`
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>Ya hay un usuario creado con estos datos. Intente iniciar sesión o use otros datos.</div>
        </div>`);

      // espera 4" y elimina el aviso
      setTimeout(() => {
        $(".alert__sesion .alert").remove();
      }, 4000);
    } else {
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

      $(".registro__form").hide();

      $(".alert__sesion").append(`
        <div class="alert alert-success d-flex align-items-center" role="alert">
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
            <use xlink:href="#check-circle-fill" />
          </svg>
          <div>Felicidades. Usuario creado con exito!</div>
        </div>`);

      // espera 3" y elimina el aviso
      setTimeout(() => {
        $(".alert__sesion .alert").remove();
      }, 3000);
    }
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
      // guardo el usuario que inicia sesion en localStorage
      localStorage.setItem("UserApp", JSON.stringify(allUsers[searchEmail]));
      window.location.href = "messages.html";
    } else {
      $(".alert__sesion").append(`
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Danger:"
          >
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>Datos ingresados incorrectos.</div>
        </div>`);

      // espera 3" y elimina el aviso
      setTimeout(() => {
        $(".alert__sesion .alert").remove();
      }, 3000);
    }
  });
}

// -----busca el id mayor de todos los usuarios para poder asignarle +1 a un nuevo usuario-----
function buscarIDMayor() {
  for (let i = 0; i <= allUsers.length; i++) {
    return Math.max(allUsers[i].id);
  }
}

// console.log(
//   "%c Welcome to my App!!",
//   `font-weight: bold;
//     font-size: 50px;
//     color: #FACA15;
//     text-shadow: 3px 3px 0 #E64980,
//                 6px 6px 0 #31C48D,
//                 9px 9px 0 #FF8A4C,
//                 12px 12px 0 #9061F9`
// );
