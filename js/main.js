// medoto ready
$(() => {
  mainBtns();
  getJSON();
  newUser();
  iniciarSesion();
  verEstadisticas();

  // message.js
  showTenMessages();
  sendMessages();
  verUser();
  checkboxMessages();
  clearLocalStorage();
});

const Users = "https://api.jsonbin.io/b/615b91fd4a82881d6c5ae0b4/latest";
const Messages = "https://api.jsonbin.io/b/615c512aaa02be1d44548b30/latest";

// vars para ingresar todos los datos obtenidos de los json
let allUsers = [];
let allMessages = [];

/**
 * -----------CLASS-----------
 */

class User {
  constructor(id, name, lastName, userName, email, password, color) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.color = color;
  }
}

class Message {
  constructor(email, userName, message, color, date) {
    this.email = email;
    this.userName = userName;
    this.message = message;
    this.color = color;
    this.date = date;
  }
}

/**
 * -----------FUNCTIONS-----------
 */

// -----funciones de btns crear usuario e iniciar sesion-----
function mainBtns() {
  $("#crearUsuario").click(() => {
    $(".ingreso__form").hide();
    $(".bienvenida__container, .estadisticas__container").hide();
    $(".registro__form").fadeIn();
  });

  $("#iniciarSesion").click(() => {
    $(".registro__form").hide();
    $(".bienvenida__container, .estadisticas__container").hide();
    $(".ingreso__form").fadeIn();
    inicioSesionAutomatico();
  });
}

// -----obtener datos de sitio externo-----
function getJSON() {
  // usuarios
  $.get(Users, (respuesta, estado) => {
    if (estado === "success") {
      for (let user of respuesta) {
        allUsers.push(
          new User(
            user.id,
            user.name,
            user.lastName,
            user.userName,
            user.email,
            user.password,
            user.color
          )
        );
      }
    }
  });

  // mensajes
  $.get(Messages, (respuesta, estado) => {
    if (estado === "success") {
      for (let mensaje of respuesta) {
        allMessages.push(
          new Message(
            mensaje.email,
            mensaje.userName,
            mensaje.message,
            mensaje.color,
            mensaje.date
          )
        );
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
    let colorPickerRegistro = $("#colorPickerInput").val();

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
      // creo objeto User
      let newUser = new User(
        buscarIDMayor(),
        nameRegistro,
        lastNameRegistro,
        userNameRegistro,
        emailRegistro,
        passwordRegistro,
        colorPickerRegistro
      );

      // nuevo array para agregar el nuevo usuario
      let concatUsers = allUsers.concat(newUser);

      $.ajax({
        url: "https://api.jsonbin.io/b/615b91fd4a82881d6c5ae0b4",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify(concatUsers),
      })
        .done(() => console.log("SUCCESS"))
        .fail((err) => console.log(`Error: ${err}`))
        .always((msg) => console.log(`Always: ${msg}`));

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

      // espera 2" y elimina el aviso
      setTimeout(() => {
        $(".alert__sesion .alert").remove();
        getJSON();
        $("#iniciarSesion").click();
      }, 2000);
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

    if (searchEmail != -1) {
      // busco su contrasena (lo pongo aca y no fuera porque sino falla por no encontrar directamente el email)
      let searchPassword = allUsers[searchEmail].password;

      if (searchPassword === passwordIngreso) {
        // guardo el usuario que inicia sesion en localStorage
        localStorage.setItem("UserApp", JSON.stringify(allUsers[searchEmail]));
        // lo envio a la pagina de mensajes
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

// -----muestra las estadisticas reales de la app (cant de users y mensajes)-----
function verEstadisticas() {
  // pruebo fetch*
  // usuarios
  fetch("https://api.jsonbin.io/b/615b91fd4a82881d6c5ae0b4/latest")
    .then((res) => res.json())
    .then((data) => {
      let usuarios = data;

      $(".card__number").append(usuarios.length);
    });

  // mensajes
  fetch("https://api.jsonbin.io/b/615c512aaa02be1d44548b30/latest")
    .then((res) => res.json())
    .then((data) => {
      let mensajes = data;

      $(".card__number--messages").append(mensajes.length);
    });
}

// -----busca el id mayor de todos los usuarios para poder asignarle +1 a un nuevo usuario-----
function buscarIDMayor() {
  let usersID = [];

  allUsers.forEach((user) => usersID.push(user.id));

  return Math.max(...usersID) + 1;
}

// -----si existe el usuario en el localStorage inicia sesion sin poner datos-----
function inicioSesionAutomatico() {
  let userLocalStorage = JSON.parse(localStorage.getItem("UserApp"));

  console.log(userLocalStorage);

  let { email, password, userName, color } = userLocalStorage;

  console.log(email, password, userName, color);

  if (email && password && userName && color) {
    window.location.href = "messages.html";
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
