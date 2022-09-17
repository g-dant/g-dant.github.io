var github_user_name = 'g-dant'
var github_api_link = 'https://api.github.com/users/' + github_user_name + '/repos';
var githubProjectLink = project_name => 'https://' + github_user_name +'.github.io/' + project_name;

var thereIsProjectLink = async function(project_name) {
    return fetch(githubProjectLink(project_name)).then(resp => resp.status);
}

var newRow = async function(rowText1,rowText2, rowText1URL, project_name) {
    return thereIsProjectLink(project_name).then((status) => {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var a = document.createElement('a');
        a.href = status == '200' ? rowText1URL : githubProjectLink(project_name);
        a.innerText = rowText1;
        td1.appendChild(a);
        td2.innerText = rowText2;
        tr.appendChild(td1);
        tr.appendChild(td2);
        return tr;
    });
}

var repos = fetch(github_api_link).
    then(resp => resp.json()).then(function(dataArray){
        var promise_array = [];
        dataArray.forEach((data) => { 
            promise_array.push(newRow(data.name, data.description, data.html_url));
        });
        return promise_array.all();
    }).then(elementsArray => 
        elementsArray.forEach(element => document.getElementById('projects-node').appendChild(element)));