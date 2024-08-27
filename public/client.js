const socket = io();

let names;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message-area")

do{
    names = prompt("please enter your name");
}while(!names)

    document.getElementById("userName").innerHTML = names;
    textarea.addEventListener('keyup',(e)=>{
        if(e.key === 'Enter'){
            sendMessage(e.target.value);
        }
    })

    function sendMessage(message){
        let msg = {
            user : names,
            message: message.trim()
        }

       

        //apprnd
        appendMessage(msg, 'outgoing')
        textarea.value = ''
        scrollToBootom()

        //send message to server
        socket.emit('message', msg);
    }
    
  function appendMessage(msg, type){
    let maindev = document.createElement('div');
    let classname = type;
    

    maindev.classList.add(classname, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maindev.innerHTML = markup;
    messageArea.appendChild(maindev);
    
}


///recieve message

socket.on('message',(msg)=> {
    appendMessage(msg, 'incoming')
    scrollToBootom();
})

function scrollToBootom(){
    messageArea.scrollTop = messageArea.scrollHeight
}