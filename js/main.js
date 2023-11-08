import { getMessages, getMessage } from './api/api_message.js';
import { getUsers, authentifier} from './api/api_user.js';


function liMouseEnter() {
    this.style.cursor = "pointer";
}

function liClick() {
    //alert("booh");
    var id = this.getAttribute('data-id');
    console.log("click", id);
    afficherMessage(id);
}

async function afficherMessage(id) {
    try {
        const message = await getMessage(id);
        console.log(message);
        var modalTitre = document.getElementById('modal-titre');
        modalTitre.innerText = message.titre;
        var modalContenu = document.getElementById('modal-contenu');
        modalContenu.innerText = message.contenu.substr(100);
        //modal bootstrap exemple modal components
        //modal toogle pour afficher le modal
        //https://getbootstrap.com/docs/5.0/components/modal/#via-javascript
        var myModal = new bootstrap.Modal(document.getElementById('MyModal'), {})
        myModal.show();
    }
    catch (erreur) {
        console.log('Erreur :', erreur);
    }
}

async function afficherMessages() {
    try {
        const messages = await getMessages();
        var lesMessages = messages["hydra:member"];
        var olMessages = document.getElementById('olMessages');
        //parcourir tout les messages
        for (let message of lesMessages) {
            //console.log(message.titre);
            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
            li.addEventListener('mouseenter', liMouseEnter, false);//pour avoir un curseur diff quand la souris va sur un message
            li.addEventListener('click', liClick, false);//click pour afficher un modal
            li.setAttribute("data-id", message.id);

            var div = document.createElement("div");
            div.classList.add("ms-2", "me-auto");

            var div2 = document.createElement("div");
            div2.innerText = message.titre;
            div2.classList.add('fw-bold');

            var span = document.createElement("span");
            span.classList.add('badge', 'bg-primary', "rounded-pill");
            span.innerText = message.messages.length;

            //li
            //  div
            //      div(div2)
            //  span
            li.appendChild(div);
            div.appendChild(div2);
            var p = document.createElement("p");
            p.innerText = message.contenu.substr(100);
            div.appendChild(p);

            li.appendChild(span);
            //pour mettre le li dans le olMessages
            olMessages.appendChild(li);
        }
    }
    catch (erreur) {
        console.log('Erreur :', erreur);
    }
}
afficherMessages();

async function afficherUsers() {
    try {
        const users = await getUsers();
        //console.log(users);
        var lesUsers = users["hydra:member"];
        var olUsers = document.getElementById('olUsers');
        //parcourir tout les messages
        for (let user of lesUsers) {
            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start")

            var div = document.createElement("div");
            div.classList.add("ms-2", "me-auto");

            var div2 = document.createElement("div");
            div2.innerHTML = '<span class="material-symbols-outlined m-2">person</span>' + user.nom + ' ' + user.prenom;

            //li
            //  div
            //      div(div2)
            //  span
            li.appendChild(div);
            div.appendChild(div2);

            //pour mettre le li dans le olMessages
            olUsers.appendChild(li);
        }
    }
    catch (erreur) {
        console.log('Erreur :', erreur);
    }
}
afficherUsers();

var connecter = document.getElementById('connecter');
connecter.addEventListener('click', connectClick, false);
function connectClick() {
    token = connect();
    localStorage.setItem('token', token);
}
async function connect(){
    const message = await authentifier("","");
        console.log(message);
}