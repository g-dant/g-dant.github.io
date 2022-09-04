var newRow = function(rowText1,rowText2) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.innerText = rowText1;
    td2.innerText = rowText2;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}

var repos = fetch('https://api.github.com/users/g-dant/repos').
    then(resp => resp.json()).then(function(dataArray){
        dataArray.forEach((data) => { 
            document.getElementById('projects-node').appendChild(newRow(data.name, data.description));
        });
    });