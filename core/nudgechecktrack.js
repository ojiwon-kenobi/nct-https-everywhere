

var httpsEverywhereID = "https-everywhere@eff.org";
var userID= localStorage.getItem('hostID')/ 4;
var currentDate = new Date();

function MakeQuerablePromise(promise) {
    if (promise.isResolved)
        return promise;
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    var result = promise.then(function (v) {
        isFulfilled = true;
        isPending = false;
        return v;
    }, function (e) {
        isRejected = true;
        isPending = false;
        catch(e);
    });

    result.isFulfilled = function () {
        return isFulfilled;
    };
    result.isPending = function () {
        return isPending;
    };
    result.isRejected = function () {
        return isRejected;
    };
    return result;

}

function resetAlarm (userID) {
    browser.alarms.clearAll()
    browser.alarms.create({periodInMinutes: localStorage.getItem('period')[userID]})
}
//track = updateSettings
function updateSettings () {
    localStorage.setItem('nudgeRepeat', localStorage.getItem('nudgeRepeat') + 1)
    var ke = [localStorage.getItem('times')]
    console.log(ke)
    localStorage.setItem('times', ke.push(Date.now()))
}

function nudge(userID) {
    browser.notifications.create({
        type: 'basic',
        title: 'HTTPS_everywhere checker',
        message: localStorage.getItem('messages')[userID]
    });
    // playSound(5)
    updateSettings();
}
function check(userID){
    console.log('in check', browser.management.get(httpsEverywhereID));
    console.log("fulfill?", MakeQuerablePromise(browser.management.get(httpsEverywhereID)).isFulfilled())
    console.log("fail?", MakeQuerablePromise(browser.management.get(httpsEverywhereID)).isRejected())
    console.log("pending?",MakeQuerablePromise(browser.management.get(httpsEverywhereID)).isPending())
    if (MakeQuerablePromise(browser.management.get(httpsEverywhereID)).isFulfilled()) {//fulfilled
        console.log( "HTTPS Everywhere has been installed.")
        browser.alarms.clearAll() //effectively turn off the extension
        updateSettings()
    }

    else if (MakeQuerablePromise(browser.management.get(httpsEverywhereID)).isPending()) {//rejected or pending = fulfilled is false
        nudge(userID);
    }
}

// function playSound (volume) {
//     if (volume === 0) {
//         return
//     }
//
//     var sound = new Audio(browser.extension.getURL('sounds/ping.wav'))
//     sound.volume = volume
//     sound.play()
// }


function handleInstalled() {
    Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.');
            return;
        }
        if (result === 'default') {
            console.log('The permission request was dismissed.');
        }
        // localStorage.setItem('hostID', Client.id); //experimental api
        localStorage.setItem('hostID', 100);
        localStorage.setItem('nudgeRepeat', 0);
        var dates= [Date.now()]
        console.log(dates)
        localStorage.setItem('times', dates);
        localStorage.setItem('period', [15, 60, 480, 1440]);
        localStorage.setItem('messages', [
                        //1= no commitment -->  4= soft commitment
                        'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.', //toast
                        'HTTPS-everywhere is ready for installation. When would you be like to be reminded by?', //toast
                        'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.', //require interaction
                        'HTTPS-everywhere is ready for installation. When would you like to enable the browser extension?', //require interaction
                    ])
        console.log('checking if user has h.e.');
        resetAlarm(userID);

        check(userID)
     });
}

handleInstalled();




