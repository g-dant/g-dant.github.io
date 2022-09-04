var newRow = function(rowText) {
    var td = document.createElement('td');
    td.innerText = rowText;
    return td;
}

var repos = fetch('https://api.github.com/users/g-dant/repos').
    then(resp => resp.json()).then(function(dataArray){
        dataArray.forEach((data) => { 
            document.getElementById('projects-node').appendChild(newRow(data.name));
        });
    });