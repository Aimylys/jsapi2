const API_URL = 'https://s3-4668.nuage-peda.fr/forum2/api/user';//le mien
//const API_URL = 'https://s3-4987.nuage-peda.fr/frsorum2/api/use';//celui du prof

async function getUsers(page = 1){
    //va retourner la collection avec page 1,variable par défaut mais on peut préciser
    try{
        const response = await fetch(`${API_URL}?page=${page}&order%5Bnom%5D=asc`);
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

async function authentifier(email, password){
    try{
        const data = {
            email: 'raymond.perrier@orange.fr',
            password: 'raymond'
        };

        //création des options de la requête
        const options={
            method: 'POST', //Méthode HTTP
            headers: {
                'Content-Type':'application/json',
                
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`https://s3-4668.nuage-peda.fr/forum2/api/authentication_token`,options);
        if(!response.ok){
            throw new Error('Erreur :'+ response.statusText);
            //on va nous afficher l'erreur qu'on nous a retourner
        }
        const r = await response.json();
        //console.log(r);
        return r.token;
    }
    catch(erreur){
        console.error('Erreur lors de lauthentification: ',erreur);
        throw erreur;
        //throw erreur -> on va franchir l'erreur sans que le reste sois perturber
    }
}

async function patch(email, password){
    try{
        const data = {
            id: "52"
        };

        //création des options de la requête
        const options={
            method: 'POST', //Méthode HTTP
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`https://s3-4668.nuage-peda.fr/forum2/api/authentication_token`,options);
        if(!response.ok){
            throw new Error('Erreur :'+ response.statusText);
            //on va nous afficher l'erreur qu'on nous a retourner
        }
        const r = await response.json();
        //console.log(r);
        return r.token;
    }
    catch(erreur){
        console.error('Erreur lors de lauthentification: ',erreur);
        throw erreur;
        //throw erreur -> on va franchir l'erreur sans que le reste sois perturber
    }
}

export{getUsers, authentifier, patch}
//va exporter la fonction pour autaurisé celle-ci a être uitilisé dans un autre fichier que api_message.js