

const httpsEverywhereID = "https-everywhere@eff.org"
var userID= localStorage.getItem('hostID')/ 4
var currentDate = new Date();
const httpsEverywhereSite = "https://addons.mozilla.org/en-US/firefox/addon/https-everywhere/"
var title = "HTTPS_everywhere installation time!!"



function checkIfExtensionInstalled2(extensionID) {
    return new Promise((resolve, reject) => {
        browser.management
            .get(extensionID)
            .then(() => resolve(true))
            .catch(err => {
                if (err.message.includes("No such addon")) {
                    resolve(false);
                    nudge(userID)

                } else {
                    browser.alarms.clearAll() //effectively turn off the extension
                    reject(err);

                }
            });
    });
}


//track = updateSettings
function updateSettings () {
    localStorage.setItem('nudgeRepeat', localStorage.getItem('nudgeRepeat') + 1)
    var ke = JSON.parse(localStorage.getItem('dates'))
    ke.push(Date.now())
    localStorage.setItem('dates', JSON.stringify(ke))
    console.log(localStorage.getItem("dates"))
}

function onCreated(tab) {
    console.log(`Created new tab: ${tab.id}`)
}

function onError(error) {
    console.log(`Error: ${error}`);
}



function nudge(userID) {
    var noti = "Nudge for h_e"
    var meta = JSON.parse(localStorage.getItem("messages"))
    browser.notifications.create(noti, {
        "type": "basic",
        "title": "HTTPS_everywhere installation time!!",
        "message": meta[userID % 4]
    });
    updateSettings();

    // setTimeout(noti.close.bind(noti), 10000);
    browser.notifications.onClicked.addListener(function(notificationId) {
        console.log('Notification ' + notificationId + ' was clicked by the user');
        var creating = browser.tabs.create({
            url: httpsEverywhereSite
        });
        creating.then(onCreated, onError);
    });
}



function handleInstalled() {
    Notification.requestPermission().then(function(result) {
        console.log(result);
        if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.')
            return;
        }
        if (result === 'default') {
            console.log('The permission request was dismissed.')
            return;
        }
        if (result === 'granted') {
            console.log('The permission request was accepted.')

        }
    });
        // localStorage.setItem('hostID', Client.id); //experimental api
        localStorage.setItem('hostID', 0)
        localStorage.setItem('nudgeRepeat', 0)

        var dates= [Date.now()]
        localStorage.setItem('dates', JSON.stringify(dates));
        console.log(localStorage.getItem('dates'))
        localStorage.setItem('period', JSON.stringify([0.2, 60, 480, 1440]))
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




