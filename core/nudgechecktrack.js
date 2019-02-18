

const httpsEverywhereID = "https-everywhere@eff.org"
var userID= localStorage.getItem('hostID')/ 4
var currentDate = new Date();

function checkIfExtensionInstalled2(extensionID) {
    return new Promise((resolve, reject) => {
        browser.management
            .get(extensionID)
            .then(() => resolve(true))
            .catch(err => {
                if (err.message.includes("No such addon")) {
                    resolve(false);
                    console.log('nudge')
                    nudge(userID)

                } else {
                    browser.alarms.clearAll() //effectively turn off the extension
                    console.log('complete. update settings')
                    reject(err);

                }
            });
    });
}


//track = updateSettings
function updateSettings () {
    localStorage.setItem('nudgeRepeat', localStorage.getItem('nudgeRepeat') + 1)
    var ke = [localStorage.getItem('times')]
    localStorage.setItem('times', ke.push(JSON.parse(Date.now())))
}

function nudge(userID) {
    var noti = "Nudge for h_e"
    var meta = JSON.parse(localStorage.getItem("messages"))
    browser.notifications.create(noti, {
        "type": "basic",
        // "iconUrl": browser.extension.getURL("icons/cake-96.png"),
        "title": "HTTPS_everywhere installation time!!",
        "message": meta[userID % 4]
    });

    browser.browserAction.onClicked.addListener(()=> {
        var clearing = browser.notifications.clear(cakeNotification);
        clearing.then(() => {
            console.log("cleared");
        });
    // playSound(5)
    });
    updateSettings()
    console.log(localStorage.getItem("times"), localStorage.getItem("nudgeRepeat"))
}


function handleInstalled() {
    Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.')
            return;
        }
        if (result === 'default') {
            console.log('The permission request was dismissed.')
        }
    });
        // localStorage.setItem('hostID', Client.id); //experimental api
        localStorage.setItem('hostID', 0)
        localStorage.setItem('nudgeRepeat', 0)
        var dates= [JSON.stringify(Date.now())]
        localStorage.setItem('times', dates);
        localStorage.setItem('period', JSON.stringify([1, 60, 480, 1440]))
        var items = [JSON.stringify({0: 'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.', //toast
            1 : 'HTTPS-everywhere is ready for installation. When would you be like to be reminded by?', //toast
            2 : 'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.', //require interaction
            3 : 'HTTPS-everywhere is ready for installation. When would you like to enable the browser extension?'})] //require interaction
        localStorage.setItem("messages", items)


        var alarmTimeList = JSON.parse(localStorage.getItem('period'))
        browser.alarms.create("", {periodInMinutes: alarmTimeList[0]})
        browser.alarms.onAlarm.addListener(function(alarm) {
            checkIfExtensionInstalled2(httpsEverywhereID).then(installed => {
                console.log(`(2) extension is ${installed ? "" : "NOT "}installed`)
            });
        });
}

handleInstalled();




