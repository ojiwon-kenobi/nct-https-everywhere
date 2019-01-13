
//check if https-everywhere exists:         https://stackoverflow.com/questions/3380452/can-you-get-a-list-of-firefox-add-ons-programmatically
//                                          https://stackoverflow.com/questions/46727370/how-to-check-if-a-firefox-webextension-is-installed-or-not-with-page-javascript
//if yes:
        //record date of installation of extension
//if not: nudge the user
        //record time on user store


//related work: https://github.com/ghinda/nudgeti





var https_everywhereID = "https-everywhere@eff.org"
var userID= browser.management.get(----)

var https_everywherePromise = browser.management.get(https_everywhereID);
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

function updateSettings () {
    nudgeRepeat = parseInt(settingsStore.get('nudgeRepeat')) + 1
    timeUpdate = settingsStore.get('times').append(Date.getTime())
    notifySound = parseFloat(settingsStore.get('sound'))
}



function nudge(userID) {
    browser.notifications.create({
        type: 'basic',
        title: 'HTTPS_everywhere checker',
        message: settingsStore.get('messages')[hostID]
        //message: switch statement based on hostID
    });
    playSound(notifySound)
    updateSettings();
    settingsStore.change(updateSettings);

}

// function playSound (volume) {
//     if (volume === 0) {
//         return
//     }
//
//     var sound = new Audio(browser.extension.getURL('sounds/sound.wav'))
//     sound.volume = volume
//     sound.play()
// }



if (MakeQuerablePromise(https_everywherePromise)) {//fulfilled
    console.log("HTTPS_everywhere has been installed.")
}

else {//rejected
    nudge(userID);

}



