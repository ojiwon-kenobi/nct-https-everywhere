// var localStorage= new localStorage('settings', {
//     'nudgeRepeat': 0,
//     'times': [],
//     'period': [15, 60, 480, 1440],
//     'messages':[
//         //1= no commitment -->  4= soft commitment
//         {'id': '1', 'mssg': 'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.'}, //toast
//         {'id': '2', 'mssg': 'HTTPS-everywhere is ready for installation. When would you be like to be reminded by?'}, //toast
//         {'id': '3', 'mssg': 'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.'}, //require interaction
//         {'id': '4', 'mssg': 'HTTPS-everywhere is ready for installation. When would you like to enable the browser extension?'}, //require interaction
//     ],
//     'sound': '0'
// })

// check notifications exist
// if (browser["notifications"]) {
//     console.log('Notifications exist!');
//
//     browser.notifications.create({
//         "type": "basic",
//         "iconUrl": browser.extension.getURL("icons/icon-48.png"),
//         "title": "test",
//         "message": "test"
//     });
// }
// else {
//     console.log('notifications do not exist');
//     console.log(browser);
// } //checkcheck
