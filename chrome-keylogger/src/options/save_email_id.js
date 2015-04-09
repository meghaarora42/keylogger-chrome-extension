function store_add(ei) {
    
	var json = {email: ei};
	chrome.storage.local.set(json,function(){console.log('saved email-id', json);});
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit-email-id');
    link.addEventListener('click', function() {
    	var ei = document.getElementById('email-id').value;
        store_add(ei);
    	alert('email-id has been stored');
    });
});