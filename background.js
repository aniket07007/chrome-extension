console.log("Initial consol")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("+++++")
});

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
    console.log(">>>>>>")
});

chrome.runtime.onConnect.addListener(function(port) {
	console.log("port", port)
    if (port.name == "knockknock") {
        port.onMessage.addListener(function(msg) {
			console.log("msg", msg)
            chrome.storage.sync.set({'data': msg.payload}, function() {
                console.log('Settings saved');
            });
		})
    }
})

setInterval(() => {
    var t = new Date()
    var timeString = `${t.getHours()}:${t.getMinutes()}`
    chrome.storage.sync.get(['data'], function(items) {
        items.data.map((obj, i) => {
            if (obj.time == timeString){
                console.log(">>", timeString)
                chrome.notifications.create('test', {
                    type: 'basic',
                    iconUrl: '1.jpg',
                    title: 'Test Message',
                    message: obj.task,
                    priority: 2
                });
            }
        })
    });

}, 3000);