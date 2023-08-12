let miToken = "";
const btnFiltrar = document.querySelector('#btnFiltrar');
const btnLoguear = document.querySelector('#btnLoguear');

const validateEmail = (email) => {
	const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	if( validEmail.test(email) ){		
		return true;
	}else{		
		return false;
	}
} 

const listadoFiltrado = async () => {
      const body = document.querySelector('#body');
      const url = 'http://localhost:8080/api/department';
      let name = document.querySelector('#name').value;
      let groupname = document.querySelector('#groupname').value;
      let start = document.querySelector('#start').value;
      let end = document.querySelector('#end').value;
      if(!start) start = '1900-01-01';
      if(!end) end = '2100-12-31';
      const datos = {
            name,
            groupname,
            start,
            end
      }
      const opciones = {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': miToken
            },
            body: JSON.stringify(datos)
      }
      const response = await fetch(url, opciones);
      const department = await response.json();
      console.log(department);
      body.innerHTML = '';
      if (department) {
            department.forEach(fila => {
                  let row = document.createElement('tr');
                  let did = document.createElement('td');
                  did.innerHTML = fila.departmentid;
                  row.appendChild(did);
                  let name = document.createElement('td');
                  name.innerHTML = fila.Department.name;
                  row.appendChild(name);
                  let groupname = document.createElement('td');
                  groupname.innerHTML = fila.Department.groupname;
                  row.appendChild(groupname);
                  let businessentityid = document.createElement('td');
                  businessentityid.innerHTML = fila.businessentityid;
                  row.appendChild(businessentityid);
                  let startd = document.createElement('td');
                  startd.innerHTML = fila.startdate;
                  row.appendChild(startd);
                  body.appendChild(row);
            });
      }
}

const llenaCombos = async (token) => {
      const urldepart = 'http://localhost:8080/api/department';
      const opciones = {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
            }
      }      
      const promesaDepartment = await fetch(urldepart, opciones);
      const department = await promesaDepartment.json();      

      const ComboGroupnames = document.querySelector('#groupname');
      const ComboNames = document.querySelector('#name');      
      let option = document.createElement("option");
      option.value = '';
      option.text = 'Name';
      let data = [];
      department.forEach(dat => {
            data.push(dat.Department.name);
      });
      let comNames = data.filter((item,index)=>{
            return data.indexOf(item) === index;
      });
      ComboNames.appendChild(option);
      comNames.forEach(dat => {
            option = document.createElement("option");
            option.value = dat;
            option.text = dat;
            ComboNames.appendChild(option);
      });      
      option = document.createElement("option");
      option.value = '';
      option.text = 'Group Name';
      ComboGroupnames.appendChild(option);
      data = [];
      department.forEach(dat => {
            data.push(dat.Department.groupname);
      });
      let comGroup = data.filter((item,index)=>{
            return data.indexOf(item) === index;
      });
      comGroup.forEach(dat => {
            option = document.createElement("option");
            option.value = dat;
            option.text = dat;
            ComboGroupnames.appendChild(option);
      });
      /************** Se llena la tabla *****************/
      const body = document.querySelector('#body');
      body.innerHTML = '';
      if (department) {
            department.forEach(fila => {
                  let row = document.createElement('tr');
                  let did = document.createElement('td');
                  did.innerHTML = fila.departmentid;
                  row.appendChild(did);
                  let name = document.createElement('td');
                  name.innerHTML = fila.Department.name;
                  row.appendChild(name);
                  let groupname = document.createElement('td');
                  groupname.innerHTML = fila.Department.groupname;
                  row.appendChild(groupname);
                  let businessentityid = document.createElement('td');
                  businessentityid.innerHTML = fila.businessentityid;
                  row.appendChild(businessentityid);
                  let startd = document.createElement('td');
                  startd.innerHTML = fila.startdate;
                  row.appendChild(startd);
                  body.appendChild(row);
            });
      }
}

const logueandose = async () => {
      const urllogin = 'http://localhost:8080/api/signin';      
      const email = document.querySelector('#txtCorreo').value;
      const password = document.querySelector('#txtPassword').value;
      if (!validateEmail(email)){
            alert("Error! email invalido (ej. mimail@correo.com)");
            return;
      }
      const datos = {
            email,
            password
      }
      const opciones = {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
      }            
      const response = await fetch(urllogin, opciones);
      const { token, msg } = await response.json();
      console.log(msg);
      if(!token){
            alert(msg);
            console.log(msg);
      }else{
            miToken = token;
            $("#loginPrincipal").hide();
            $("#filtros").show();
            $("#tablita").show();
            llenaCombos(token);            
      }
}

$("#filtros").hide();
$("#tablita").hide();
btnFiltrar.addEventListener('click', listadoFiltrado);
btnLoguear.addEventListener('click', logueandose);