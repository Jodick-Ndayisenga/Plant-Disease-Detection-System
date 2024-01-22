//document.addEventListener("DOMContentLoaded", ()=> alert("Hello") );

const conversation = document.querySelector(".conversations")
const userIm = document.getElementById("userImage");
const botIm = document.getElementById("botImage");


  const messageForm = document.getElementById("submitForm");
  const messageInput = document.querySelector("#messageInput");
  
//   function getParameterByName(name) {
//     name = name.replace(/[\[\]]/g, '\\$&');
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//         results = regex.exec(location.search);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }

// function sendQuestion(){
//   var message = decodeURIComponent(getParameterByName('message'));
//     var messageInpu = document.getElementById('messageInput');
//     if (messageInpu) {
//         messageInpu.value = message;
//         document.getElementById('submitForm').submit();
//     }
// }


  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (message.length === 0) {
      return;
    }
    let messageItem = document.createElement("div");
    messageItem.classList.add("botText");
    messageItem.innerHTML = `
    <div class="head">
    <div>
      <img src="${userIm.src}" alt="">
      <h1>You</h1>
    </div>
    <div id="time">
    </div>
  </div>
  <p>${message}</p>
    `;
      
    
    conversation.appendChild(messageItem);
    messageInput.value = "";

    const messageItem1 = document.createElement("div");
    messageItem1.classList.add("userText");
    messageItem1.innerHTML = `
    <div class="head">
        <div>
        <img src="${botIm.src}">
        <h1>Agri Bot</h1>
        </div>
        <div id="time">
        </div>
    </div>
    <p>Agri Bot is thinking...</p>`;

    

    conversation.appendChild(messageItem1);

    let answer = messageItem1.querySelector("p");
   

    fetch("agribot", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        csrfmiddlewaretoken: document.querySelector(
          "[name=csrfmiddlewaretoken]"
        ).value,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const response = data.response;
        const replacedString = response.replace(/\n/g, "<br>");
        let index = 0;
       

        let displayMessageText = setInterval(() => {
            answer.innerHTML = replacedString.slice(0, index);
            index++;
            if (index > replacedString.length) {
              setTimeout(() => {
                      clearInterval(displayMessageText);
                      index = 0;
                    }, 70);
            }
          }, 10);
        
    });
});
