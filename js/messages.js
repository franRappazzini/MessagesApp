/**
 * FUNCTIONS para 'messages.html'
 */

// -----muestra todos los mensajes que existen-----
function showMessages() {
  setTimeout(() => {
    allMessages.forEach((mensaje) => {
      $(".messages__container").append(`
        <div class="message mb-3">
          <p class="username__text m-0">${mensaje.userName}</p>
          <p class="message__text m-0">${mensaje.message}</p>
        </div>`);
    });
  }, 1000);
}

// -----enviar mensajes-----
function sendMessages() {
  // tomo los datos del usuario que inicio sesion
  let userLocalStorage = JSON.parse(localStorage.getItem("UserApp"));
  console.log(userLocalStorage);

  $(".send-message__form").submit((e) => {
    e.preventDefault();

    let messageForm = $("#messageForm").val();

    console.log(messageForm);

    // compruebo que userLocalStorage exista
    if (userLocalStorage) {
      // creo objeto Message
      let newMessage = new Message(
        userLocalStorage.email,
        userLocalStorage.userName,
        messageForm
      );
      console.log(newMessage);

      // nuevo array para agregar el nuevo mensaje
      let concatMessages = allMessages.concat(newMessage);
      /**
       * el url no es el original
       */
      // envio Message
      $.ajax({
        url: "https://api.jsonbin.io/b/6158b517aa02be1d445307e7",
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

    $("#messageForm").val("");
  });

  sendMessageWithEnterKey();
}

// -----enviar mensaje presionando tecla enter-----
function sendMessageWithEnterKey() {
  $("#messageForm").keypress((e) => {
    if (e.keyCode == 13) {
      $(".send-message__form").submit();
    }
  });
}

// -----visualiza el usuario en el header-----
function verUser() {
  let userLocalStorage = JSON.parse(localStorage.getItem("UserApp"));

  $(".header__user").append(`
    <svg
      id="Capa_1"
      enable-background="new 0 0 512 512"
      height="40"
      width="40"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <path
            d="m456.291 415.426c34.862-43.74 55.709-99.145 55.709-159.426 0-141.385-114.615-256-256-256s-256 114.615-256 256c0 60.281 20.847 115.686 55.709 159.426z"
            fill="#85faf4"
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

    <p class="m-0">${userLocalStorage.userName}</p>`);
}