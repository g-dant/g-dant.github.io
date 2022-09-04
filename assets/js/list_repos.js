var newRow = function(rowText1,rowText2, rowText1URL) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.innerText = '<a href="' + rowText1URL + '">' + rowText1 + '</a>';
    td2.innerText = rowText2;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}

var repos = fetch('https://api.github.com/users/g-dant/repos').
    then(resp => resp.json()).then(function(dataArray){
        dataArray.forEach((data) => { 
            document.getElementById('projects-node').appendChild(newRow(data.name, data.description, data.html_url));
        });
    });