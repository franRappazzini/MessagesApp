/**
 * -----------FUNCTIONS para 'messages.html'-----------
 */

// -----checkboxs funcionales-----
function checkboxMessages() {
  $("#allMessagesCheckbox").click(() => showAllMessages());
  $("#tenMessagesCheckbox").click(() => showTenMessages());
}

// -----renderiza todos los mensajes que existen-----
function showAllMessages() {
  $(".messages__container").empty().append(`
    <li class="message list-group-item" >
      <span class="d-flex justify-content-between align-items-end">
        <p class="username__text m-0" style="color: #0d6efd">rappanui</p>
        <p class="date__text m-0">(5/10/2021)</p>
      </span>
      <p class="message__text m-0">Hola, bienvenido a mi app!</p>
    </li>`);

  allMessages.forEach((mensaje) => {
    $(".messages__container").append(`
      <li class="message list-group-item" >
        <span class="d-flex justify-content-between align-items-end">
          <p class="username__text m-0" style="color: ${mensaje.color}">${mensaje.userName}</p>
          <p class="date__text m-0">(${mensaje.date})</p>
        </span>
        <p class="message__text m-0">${mensaje.message}</p>
      </li>`);
  });

  // para que cuando cambie mantenga el modo
  darkMode();
}

// -----renderiza los ultimos 10 mensajes-----
function showTenMessages() {
  $(".messages__container").empty().append(`
    <li class="message list-group-item" >
      <span class="d-flex justify-content-between align-items-end">
        <p class="username__text m-0" style="color: #0d6efd">rappanui</p>
        <p class="date__text m-0">(5/10/2021)</p>
      </span>
      <p class="message__text m-0">Hola, bienvenido a mi app!</p>
    </li>`);

  // setTimeout para que le de tiempo a hacer el get
  setTimeout(() => {
    let ultimosDiezMensajes = [...allMessages].splice(-10);

    ultimosDiezMensajes.forEach((mensaje) => {
      $(".messages__container").append(`
        <li class="message list-group-item" >
          <span class="d-flex justify-content-between align-items-end">
            <p class="username__text m-0" style="color: ${mensaje.color}">${mensaje.userName}</p>
            <p class="date__text m-0">(${mensaje.date})</p>
          </span>
          <p class="message__text m-0">${mensaje.message}</p>
        </li>`);
    });

    darkMode();
  }, 1000);

  darkMode();
}

// -----enviar mensajes-----
function sendMessages() {
  // tomo los datos del usuario que inicio sesion
  let userLocalStorage = JSON.parse(localStorage.getItem("UserApp"));

  $(".send-message__form").submit((e) => {
    e.preventDefault();

    let messageForm = $("#messageForm").val();

    // compruebo que userLocalStorage exista
    if (userLocalStorage) {
      // creo objeto Message
      let newMessage = new Message(
        userLocalStorage.email,
        userLocalStorage.userName,
        messageForm,
        userLocalStorage.color,
        today()
      );

      console.log(newMessage);

      // nuevo array para agregar el nuevo mensaje
      let concatMessages = allMessages.concat(newMessage);

      // envio Message
      $.ajax({
        url: "https://api.jsonbin.io/b/61632f3faa02be1d445775a0",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify(concatMessages),
      })
        .done(() => console.log("SUCCESS"))
        .fail((err) => console.log(`Error: ${err}`))
        .always((msg) => console.log(`Always: ${msg}`));

      $(".alert__sesion--message").append(`
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
          <div>Mensaje enviado con exito!</div>
        </div>`);

      $("#messageForm").val("");

      // espera 1" y recarga la pagina
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      $(".alert__sesion--message").append(`
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
          <div>Debes iniciar sesión para poder enviar mensajes.</div>
        </div>`);

      // espera 4" y elimina el aviso
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2500);
    }
  });
}

// -----renderiza el usuario en el header-----
function verUser() {
  let userLocalStorage = JSON.parse(localStorage.getItem("UserApp"));

  console.log(userLocalStorage);

  $(".header__user").append(`
    <svg
      id="dropdownMenuButton1"
      enable-background="new 0 0 512 512"
      height="40"
      width="40"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      class="dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <g>
        <g>
          <path
            d="m456.291 415.426c34.862-43.74 55.709-99.145 55.709-159.426 0-141.385-114.615-256-256-256s-256 114.615-256 256c0 60.281 20.847 115.686 55.709 159.426z"
            fill="${userLocalStorage.color}"
          />
        </g>
        <g>
          <path
            d="m142.02 182-86.311 233.426c46.904 58.849 119.187 96.574 200.291 96.574s153.387-37.725 200.291-96.574l-86.311-233.426z"
            fill="#b2381b"
          />
        </g>
        <g>
          <path
            d="m159.994 182h-17.974l-86.311 233.426c28.497 35.754 66.373 63.688 109.893 80.125l15.178-61.426c1.408-5.699-5.671-9.554-9.694-5.279l-4.789 5.088c-4.097 4.353-11.28.276-9.642-5.473l8.31-29.179c1.558-5.471-4.973-9.603-9.25-5.852-4.446 3.9-11.158-.707-9.118-6.258l75.423-205.172z"
            fill="#9e2d16"
          />
        </g>
        <g>
          <path
            d="m222.228 33.127c-23.565 7.296-28.561-33.127-47.228-33.127s-7.99 78.333-7.99 78.333l55.218-31.333z"
            fill="#c04a27"
          />
        </g>
        <g>
          <path
            d="m289.772 33.127c23.565 7.296 28.561-33.127 47.228-33.127s7.99 78.333 7.99 78.333l-55.218-31.333z"
            fill="#c04a27"
          />
        </g>
        <g>
          <path
            d="m347.836 44.816c-9.888-9.218-21.843-16.312-35.774-21.266-5.743 7.264-12.372 12.648-22.291 9.577v13.873l55.218 31.333c.001 0 2.179-15.988 2.847-33.517z"
            fill="#b2381b"
          />
        </g>
        <g>
          <path
            d="m167.01 78.333 55.218-31.333v-13.873c-9.802 3.035-16.39-2.188-22.087-9.322-14.045 5.094-26.052 12.392-35.943 21.86.705 17.192 2.812 32.668 2.812 32.668z"
            fill="#b2381b"
          />
        </g>
        <g>
          <path
            d="m390.504 176.403c-19.243-17.545-30.044-42.501-30.044-68.542v-.836c0-29.309-21.46-77.025-104-77.025s-104 47.716-104 77.025c0 26.391-11.252 51.474-30.785 69.22-22.359 20.313-35.675 45.832-35.675 73.549 0 66.274 76.112 120 170 120s170-53.726 170-120c0-27.644-13.244-53.103-35.496-73.391z"
            fill="#d85e41"
          />
        </g>
        <g>
          <path
            d="m334.286 356.333c-135.715 1.334-195.422-55.333-195.422-114.666s39.469-84 49.636-127.833 61.167-80.707 101.272-80.707v-.09c-9.808-1.945-20.86-3.037-33.312-3.037-82.54 0-104 47.716-104 77.025 0 26.391-11.252 51.474-30.785 69.22-22.359 20.313-35.675 45.832-35.675 73.549 0 66.274 76.112 120 170 120 28.233 0 54.854-4.864 78.286-13.461z"
            fill="#c04a27"
          />
        </g>
        <g><circle cx="256" cy="275.232" fill="#f4cb6e" r="46.768" /></g>
        <g>
          <path
            d="m287.45 158.164h-31.45-31.45c-17.37 0-31.45 14.081-31.45 31.45v69.618c0 17.37 14.081 31.45 31.45 31.45 17.369 0 31.45-14.081 31.45-31.45 0 17.37 14.081 31.45 31.45 31.45 17.37 0 31.45-14.081 31.45-31.45v-69.618c.001-17.37-14.08-31.45-31.45-31.45z"
            fill="#f9d778"
          />
        </g>
        <g>
          <path
            d="m224.55 259.232v-69.618c0-17.37 14.081-31.45 31.45-31.45h-31.45c-17.37 0-31.45 14.081-31.45 31.45v69.618c0 17.37 14.081 31.45 31.45 31.45 5.73 0 11.098-1.54 15.725-4.218-9.398-5.438-15.725-15.593-15.725-27.232z"
            fill="#f4cb6e"
          />
        </g>
        <g>
          <path
            d="m256 290.683c-4.142 0-7.5-3.358-7.5-7.5v-104.637c0-4.142 3.358-7.5 7.5-7.5 4.142 0 7.5 3.358 7.5 7.5v104.636c0 4.143-3.358 7.501-7.5 7.501z"
            fill="#f4cb6e"
          />
        </g>
        <g>
          <path
            d="m284.487 140.938c-10.896-5.792-15.398 5.646-28.487 5.646s-17.59-11.438-28.487-5.646c-28.487 15.142 0 49.788 28.487 49.788s56.973-34.646 28.487-49.788z"
            fill="#7e5966"
          />
        </g>
        <g>
          <path
            d="m245.787 144.108c-6.314-2.99-10.783-7.151-18.274-3.17-28.487 15.142 0 49.788 28.487 49.788 3.899 0 7.796-.653 11.549-1.812-21.894-6.762-38.813-30.883-21.762-44.806z"
            fill="#725057"
          />
        </g>
        <g><circle cx="188.5" cy="113.833" fill="#543438" r="15" /></g>
        <g><circle cx="196" cy="106.333" fill="#fff" r="7.5" /></g>
        <g><circle cx="323.5" cy="113.833" fill="#543438" r="15" /></g>
        <g><circle cx="331" cy="106.333" fill="#fff" r="7.5" /></g>
      </g>
    </svg>

    <p class="m-0">${userLocalStorage.userName}</p>
    
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li class="form-check form-switch p-0 d-flex align-items-center">
        <svg class="ms-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </svg>
        <input class="form-check-input mx-1 my-0" type="checkbox" id="checkboxDarkMode">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
        </svg>
      </li>
      <li><a href="index.html" class="dropdown-item">Volver al inicio</a></li>
      <li><a id="cerrarSesion" href="index.html" class="dropdown-item link-danger">Cerrar sesión</a></li>
    </ul>`);

  // para activar/desactivar el dark mode
  $("#checkboxDarkMode").change(() => {
    $("#checkboxDarkMode").is(":checked") ? darkModeON() : darkModeOFF();
  });

  darkMode();
}

// -----toma el dia actual para el mensaje-----
function today() {
  let date = new Date();

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// -----limpia el localStorage al cerrar la sesion-----
function clearLocalStorage() {
  $("#cerrarSesion").click(() => localStorage.clear());
}

// -----dark mode-----
function darkMode() {
  let darkModeLocalStorage = localStorage.getItem("DarkMode");

  if (darkModeLocalStorage) {
    $("#checkboxDarkMode").attr("checked", true);
    darkModeON();
  } else darkModeOFF();
}

// -----funciones del dark mode encendido-----
function darkModeON() {
  $("body").addClass("dark-mode-intenso");
  $(".card").addClass("dark-mode-suave");
  $("p, h1, h2, h6, .labelForCheckbox, .labelForColorPicker, .bi-eye").addClass(
    "dark-mode-light"
  );
  $(".btn-outline-primary")
    .removeClass("btn-outline-primary")
    .addClass("btn-outline-light");

  $(".message").css("background-color", "#212529");

  // guardo en el localStorage asi queda activado hasta que sea desactivado manualmente
  localStorage.setItem("DarkMode", "checked");
}

// -----funciones del dark mode apagado-----
function darkModeOFF() {
  $("body").removeClass("dark-mode-intenso");
  $(".card").removeClass("dark-mode-suave");
  $(
    "p, h1, h2, h6, .labelForCheckbox, .labelForColorPicker, .bi-eye"
  ).removeClass("dark-mode-light");
  $(".btn-outline-primary")
    .removeClass("btn-outline-light")
    .addClass("btn-outline-primary");

  $(".message").css("background-color", "rgb(238, 238, 238)");

  // lo elimino del localStorage
  localStorage.removeItem("DarkMode");
}
