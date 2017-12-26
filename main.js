var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200) {

        var response = JSON.parse(xhttp.responseText);
        var contacts = response.contacts;
        var contactList = '';
        for (var index = 0; index < contacts.length; index++) {
            contactList += '<li class="collection-item"><a href="contact.html" onmousedown="saveDetails(this)">' + contacts[index].name + '</a></li>';
        }
        document.getElementById('contacts').innerHTML = contactList;
    }
};
xhttp.open('GET', 'contacts.json', true);
xhttp.send();

function saveDetails(contact){
    sessionStorage['name'] = contact.innerHTML;
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            var contacts = response.contacts;
            for (var index = 0; index < contacts.length; index++) {
                if (contacts[index].name == contact.innerHTML) {
                    sessionStorage['photoUrl'] = contacts[index].photoUrl;
                    sessionStorage['contact'] = contacts[index].contact;
                    break;
                }
            }
        }
    };
    xhttp.open('GET', 'contacts.json', true);
    xhttp.send();
}