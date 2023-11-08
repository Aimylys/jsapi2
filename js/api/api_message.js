const API_URL = 'https://s3-4668.nuage-peda.fr/forum2/api/messages';//le mien
//const API_URL = 'https://s3-4987.nuage-peda.fr/forum2/api/messages';//celui du prof

async function getMessages(page = 1){
    //va retourner la collection avec page 1,variable par défaut mais on peut préciser
    try{
        const response = await fetch(`${API_URL}?page=${page}&exists%5Bparent%5D=false`);
        //fetch -> appeler mon api et ensuite va me répondre
        if(!response.ok){
            throw new Error('Erreur :'+ response.statusText);
            //on va nous afficher l'erreur qu'on nous a retourner
        }
        const data = await response.json();
        return data;
    }
    catch(erreur){
        console.error('Erreur lors de la récupération: ',erreur);
        throw erreur;
        //throw erreur -> on va franchir l'erreur sans que le reste sois perturber
    }
}


async function getMessage(id){
    try{
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok){
            throw new Error('Erreur :'+ response.statusText);
        }
        const data = await response.json();
        return data;
    }
    catch(erreur){
        console.error('Erreur lors de la récupération: ',erreur);
        throw erreur;
    }
}

export{getMessages, getMessage}
//va exporter la fonction pour autaurisé celle-ci a être uitilisé dans un autre fichier que api_message.js