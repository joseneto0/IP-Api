const input = document.querySelector("#inputIpAddress");
let ips = [];
let id = 1;

async function clickSubmit(event){
    if (input.value == ""){
        alert("Digite um ip antes de buscar")
    } else {
        let ip = input.value;
        let url = `https://ipinfo.io/${ip}/json?token=0ce00c5af1537e`;
        event.preventDefault();
        fetch(url).then(
            (response) => response.json()
        ).then(
            (jsonResponse) => insert(jsonResponse)
        )
    }
    
}

function insert(json){
    let ip = ipToString(json.ip);
    if (!onTable(ip)){
        const tbody = document.querySelector("table tbody");
        const row = `<tr id=h${id}>
            <td>${json.ip}</td>
            <td>${addOrg(json.org)}</td>
            <td>${json.country}</td>
            <td>${json.city}</td>
            <td>
            <a href="#">
                <i onclick="handleRemove(${id}, ${ip})" class="fa fa-times 1" style="font-size: 22px;"></i>
            </a>
            </td>
        </tr>`
        tbody.insertAdjacentHTML("beforeend", row);
        ips.push(ip);
        console.log(ips);
        id++;
    } else {
        alert("IP já cadastrado");
    }
    input.value = "";
}

function onTable(ip){
    for (let i = 0; i < ips.length; i++){
        if (ips[i] == ip){
            return true;
        }
    }
    return false;
}

function addOrg(org){
    return org.substr(org.indexOf(" ") + 1);
}   

function handleRemove(id, ip){
    if (confirm("Deseja remover? ")){
        for (let i = 0; i < ips.length; i++){
            if (ips[i] == ip){
                ips.splice(i,1);
                break;
            }
        }
        const row = document.querySelector(`#h${id}`);
        row.remove();
        
    }
}

function ipToString(ip){
    let nIp = "";
    for (let i = 0; i < ip.length; i++){
        if (ip[i] != "."){
            nIp += ip[i];
        }
    }
    return nIp;
}