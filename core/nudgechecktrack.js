
//check if https-everywhere exists:         https://stackoverflow.com/questions/3380452/can-you-get-a-list-of-firefox-add-ons-programmatically
//                                          https://stackoverflow.com/questions/46727370/how-to-check-if-a-firefox-webextension-is-installed-or-not-with-page-javascript
//if yes:
        //record date of installation of extension
//if not: nudge the user
        //record time on user store


var httpsEverywhereID = "https-everywhere@eff.org"
var httpsEverywherePromise= browser.management.get(httpsEverywhereID)
var uniqueID= localStorage.setItem('hostID', Math.random(300))
var userID= uniqueID/ 4

function MakeQuerablePromise(promise) {
    if(promise.isResolved)
        return promise;
    var isPending= true;
    var isRejected= false;
    var isFulfilled= false;

    var result = promise.then(function(v) {
                isFulfilled=true;
                isPending= false;
                return v;
    }, function(e) {
        isRejected= true;
        isPending= false;
        throw e;
    });

        result.isFulfilled = function() { return isFulfilled; };
        result.isPending = function() { return isPending; };
        result.isRejected = function() { return isRejected; };
        return result;

}

function resetAlarm (userID) {
    browser.alarms.clearAll()
    browser.alarms.create({periodInMinutes: localStorage.getItem('period')})
}
//track = updateSettings
function updateSettings () {
    localStorage.setItem('nudgeRepeat', localStorage.get('nudgeRepeat') + 1)
    localStorage.setItem('times', localStorage.getItem('times').append(Date.getTime()))
}

function nudge(userID) {
    browser.notifications.create({
        type: 'basic',
        title: 'HTTPS_everywhere checker',
        message: localStorage.get('messages')[userID]
        //message: switch statement based on userID
    });
    playSound(5)
    updateSettings();
}
function check(userID){
    console.log(details.reason);
    if (MakeQuerablePromise(httpsEverywherePromise)) {//fulfilled
        console.log("HTTPS Everywhere has been installed.")
        browser.alarms.clearAll() //effectively turn off the extension
        updateSettings()
    }

    else {//rejected
        nudge(userID);
    }
}

function playSound (volume) {
    if (volume === 0) {
        return
    }

    var sound = new Audio(browser.extension.getURL('sounds/ping.wav'))
    sound.volume = volume
    sound.play()
}


function handleInstalled() {
    Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.');
            return;
        }
        if (result === 'default') {
            console.log('The permission request was dismissed.');
            return;
        }
        resetAlarm(userID)
        check(userID)
    });

}

handleInstalled();




