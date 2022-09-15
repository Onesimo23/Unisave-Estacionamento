// isolando as cariaveis, para que o usuario não altere no console


(function() {
  ///////
var senhagerada;
  function Password() {
    
    let senha = "0123456789abcdefghijklmnopqrstuvwxyz"
    //se for pra senha segura use eata parte///ABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
    let senha2 = 10; //numeros de caracterios tem a senha gerada
    let senhaFinal = "";
    

    for (var i = 0; i < senha2; i++) {
      let numerosenha = Math.floor(Math.random() * senha.length);
      senhagerada = senhaFinal += senha.substring(numerosenha, numerosenha + 1)

    }
   

  }
Password()

  const $ = q => document.querySelector(q);

  function convertPeriod(mil) {
    var min = Math.floor(mil / 60000);
    var sec = Math.floor((mil % 60000) / 1000);
    return `${min}m e ${sec}s`;
  };

  function renderGarage() {
    
    const garage = getGarage();
    $("#garage").innerHTML = "";
    garage.forEach(c => addCarToGarage(c))
  };

  function addCarToGarage(car) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.licence}</td>  
            <td>${car.cargo}</td>  
            <td>${car.dono}</td>  
                     <td data-time="${car.time}">
                ${new Date(car.time)
                        .toLocaleString('pt-BR', { 
                            hour: 'numeric', minute: 'numeric' 
                })}
            </td> 
             <td>${car.senha}</td>  
            <td>
             
                <button class="delete">Retirar</button>
            </td>
        `;

    $("#garage").appendChild(row);
  };

  function checkOut(info) {
    let period = new Date() - new Date(info[2].dataset.time);
    period = convertPeriod(period);

    const licence = info[1].textContent;
    const msg = `O veículo ${info[0].textContent} de placa ${licence} permaneceu ${period} estacionado. \n\n Deseja encerrar?`;

    if (!confirm(msg)) return;

    const garage = getGarage().filter(c => c.licence !== licence);
    localStorage.garage = JSON.stringify(garage);

    renderGarage();
  };
  // se esse localstorage de nome garafe existir, vamos pegar e trazer no formato json
  const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

  renderGarage();
  $("#send").addEventListener("click", e => {
    
    const name = $("#name").value;
    const licence = $("#licence").value;
    const cargo = $("#cargo").value;
    const dono = $("#dono").value;
    const senha = senhagerada
    




    // SE NAM, licence, cargo e dono forem false, vai dar o alert
    if (!name || !licence || !cargo || !dono) {
      alert("Os campos são obrigatórios.");
      return;
    }

    const car = { name, licence, cargo, dono,senha, time: new Date() }; // a senha e adicionada junto com um.objeto novo (carro)

    const garage = getGarage();
    garage.push(car);
    

    // pegar todos objetos no garage e mostrar. salva em texto e retorna em json
    localStorage.garage = JSON.stringify(garage);
    // limpar sempre depois do clique
    addCarToGarage(car);
    $("#name").value = "";
    $("#licence").value = "";
    $("#cargo").value = "";
    $("#dono").value = "";
    senhagerada = "";
    Password()
    

  })
  $("#garage").addEventListener("click", (e) => {
    if (e.target.className === "delete")
      checkOut(e.target.parentElement.parentElement.cells);
  });
})()
