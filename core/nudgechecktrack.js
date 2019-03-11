//todos:
// make this extension shut down as soon as the target extension has been downloaded


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
                    browser.alarms.clearAll()
                    reject(err);
                    return;
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
    var meta = JSON.parse(localStorage.getItem("messages"))
    var text = meta[userID % 4]
    console.log("nudging but no noti?")
    var notification = new Notification('Click to download', { body: text, requireInteraction: true});
    setTimeout(notification.close.bind(notification), 10000);
    notification.onclick =  function (event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(httpsEverywhereSite, '_blank');
    }
    updateSettings();
}


function handle() {
    window.Notification.requestPermission().then(function(res) {
        console.log(res);
        if (res === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.')
            return;
        }
        if (res === 'default') {
            console.log('The permission request was dismissed.')

            // return;
        }


        // localStorage.setItem('hostID', Client.id); //experimental api
        localStorage.setItem('hostID', 0)
        localStorage.setItem('nudgeRepeat', 0)

        var dates= [Date.now()]
        localStorage.setItem('dates', JSON.stringify(dates));
        console.log(localStorage.getItem('dates'))
        localStorage.setItem('period', JSON.stringify([0.5, 60, 480, 1440]))
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
    });
}


handle()


