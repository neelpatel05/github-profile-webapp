var username;
var followers;
var following;
var photourl;
var repository;
var gist;
var bio;
var login;
var location1;
var blog;


window.onload = function() {

        console.log("Hi!! Web Developer\nIf you would like to contribute please send me pull request on github\nOr contact me @ neel.patel6573@gmail.com");
        new Clipboard('#cloneurl');
        document.getElementById('body').style.backgroundColor="white";
        document.getElementById('data').style.display = "none";
        swal({
            title: 'Username',
            input: 'text',
            showCancelButton: false,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            imageUrl: "https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png",
            preConfirm: function (username) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        var http = new XMLHttpRequest();
                        var url = "https://api.github.com/users/"+username;

                        http.open("GET",url,true);

                        http.onload = function(){
                            if(http.status === 200){
                                resolve(JSON.parse(http.response));
                            }else{
                                reject(http.statusText);
                            }
                        };

                        http.onerror = function(){
                            reject(http.statusText);
                        };

                        http.send();
                    }, 4000);
                })
            },
            allowOutsideClick: false
        }).then(function (data) {
            
            this.login = data.login;
            this.username = data.name;
            this.followers = data.followers;
            this.following = data.following;
            this.repository = data.public_repos;
            this.photourl = data.avatar_url;
            this.location1 = data.location;
            this.bio = data.bio;
            this.blog = data.blog;
            document.getElementById('body').style.backgroundColor="white";
            document.getElementById('data').style.display = "inline";
            manipulatedata(this.login);
        })

};

function manipulatedata(){

    document.getElementById('avatar_url').src=this.photourl;
    document.getElementById('username').innerText=this.login+" ";
    document.getElementById('name').innerText=this.username;
    document.getElementById('followers').innerText=this.followers;
    document.getElementById('following').innerText=this.following;
    document.getElementById('repos').innerText=this.repository;
    document.getElementById('target').href = "https://github.com/"+this.login+"/";

    //Repository Table starts Here
    var repourl = "https://api.github.com/users/" + this.login + "/repos";
    var repos = getjson(repourl);
    repos.then(function(data){

        var x = document.getElementById('table-repos');
        for(var i=0;i<data.length;i++){

            var row = x.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerText = data[i].name;
            cell2.innerText = data[i].language;
            cell3.innerText = data[i].created_at;
            cell4.innerText = data[i].updated_at;
            var y = data[i].clone_url;
            cell5.innerHTML = '<button id="cloneurl" class="btn btn-primary" data-clipboard-target="">Copy Clone URL</button>';

        }
    }).catch(function(error){
        console.log(error);
    })
    //Repository table Ends Here

}

function getjson(url){
    return new Promise(function(resolve,reject){
        var http = new XMLHttpRequest();

        http.open("GET",url,true);

        http.onload = function(){
            if(http.status === 200){
                resolve(JSON.parse(http.response));
            }else{
                reject(http.statusText);
            }
        };

        http.onerror = function(){
            reject(http.statusText);
        };

        http.send();
    });
}