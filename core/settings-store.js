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

// const httpsEverywhereID = "https-everywhere@eff.org";
//
// // Check if the extension is installed and print out the result right away
// browser.management
//     .get(httpsEverywhereID)
//     .then(result => console.log(result))
//     .catch(err => {
//         if (err.message.includes("No such addon")) {
//             console.warn("(0) extension not installed");
//         } else {
//             console.log(err);
//         }
//     });
//
// /** An API for checking if extension is installed using callbacks */
// function checkIfExtensionInstalled1(extensionID, callback) {
//     browser.management
//         .get(extensionID)
//         .then(() => callback(true))
//         .catch(err => {
//             if (err.message.includes("No such addon")) {
//                 callback(false);
//             } else {
//                 reject(err);
//             }
//         });
// }
//
// checkIfExtensionInstalled1(httpsEverywhereID, installed => {
//     console.log(`(1) extension is ${installed ? "" : "NOT "}installed`);
// });
//
// /** An API for checking if extension is installed using an explicitly constructed Promise */
// function checkIfExtensionInstalled2(extensionID) {
//     return new Promise((resolve, reject) => {
//         browser.management
//             .get(extensionID)
//             .then(() => resolve(true))
//             .catch(err => {
//                 if (err.message.includes("No such addon")) {
//                     resolve(false);
//                 } else {
//                     reject(err);
//                 }
//             });
//     });
// }
//
// checkIfExtensionInstalled2(httpsEverywhereID).then(installed => {
//     console.log(`(2) extension is ${installed ? "" : "NOT "}installed`);
// });
//
// /** An API for checking if extension is installed using chained Promises */
// function checkIfExtensionInstalled3(extensionID) {
//     return browser.management
//         .get(extensionID)
//         .then(() => true)
//         .catch(err => {
//             if (err.message.includes("No such addon")) {
//                 return false;
//             } else {
//                 throw err;
//             }
//         });
// }
//
// checkIfExtensionInstalled3(httpsEverywhereID).then(installed => {
//     console.log(`(3) extension is ${installed ? "" : "NOT "}installed`);
// });
