var newRow = function(rowText) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerText = rowText;
    tr.appendChild(td);
    return tr;
}

var repos = fetch('https://api.github.com/users/g-dant/repos').
    then(resp => resp.json()).then(function(dataArray){
        dataArray.forEach((data) => { 
            document.getElementById('projects-node').appendChild(newRow(data.name));
        });
    });