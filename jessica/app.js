const input = document.querySelector('#searchInput');
const usercabecera = document.querySelector('#usercabecera');
const userList = document.querySelector('#users');
var encabezado=document.getElementById("encabezado1");
var tabla=document.getElementById("tab");
encabezado.style.backgroundColor="red";

let users = [];

let url = "https://fakerapi.it/api/v1/persons?_quantity=10";

document.addEventListener('DOMContentLoaded', async () => {
   
    userList.innerHTML = `<h1>Cargando...</h1>`;
    const data = await loadUsers();
    users = data.data;
    console.log(users.filter(user => user.gender === 'male'));
   
    
    renderUsers(users);
});

input.addEventListener('keyup', e => {
    const newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()} ${user.gender.toLowerCase()}`.includes(input.value.toLowerCase()));
    renderUsers(newUsers);
    
    

});

async function loadUsers(){
    let respuesta = await fetch(url);
    
    return res = respuesta.json();
   
}

// const createUserItems = users => users.map(user => `<li class="bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer">${user.firstname} ${user.lastname}</li>`).join(' ');

const createUserItems = users => users.map(user => 
    
    `
    <tr>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.gender}</td>
        
    </tr>
`).join(' ')

if(users.filter(user => user.gender === 'male')){
    tabla.style.backgroundColor="red";
    console.log("holiwi");
    console.log("holiwi2");


}
;

function renderUsers(users) {
    const itemsTable= `
        <thead>
            <th>FirstName</th>
            <th>LastName</th>
            <th>gender</th>
        </thead>
    `;
 
    const itemsString = createUserItems(users);

    usercabecera.innerHTML = itemsTable;
    userList.innerHTML = itemsString;
}

function color(parametro){
    
}