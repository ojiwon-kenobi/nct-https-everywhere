var localStorage= new Storage('settings', {
    hostID: '', //random number assigned
    nudgeRepeat: '0',
    times: [],
    period: [15, 60, 480, 1440],
    messages:[
        //1= no commitment -->  4= soft commitment
        {id: '1', mssg: 'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.'}, //toast
        {id: '2', mssg: 'HTTPS-everywhere is ready for installation. When would you be like to be reminded by?'}, //toast
        {id: '3', mssg: 'HTTPS-everywhere is ready for installation. Please click to install HTTPS-everywhere.'}, //require interaction
        {id: '4', mssg: 'HTTPS-everywhere is ready for installation. When would you like to enable the browser extension?'}, //require interaction
    ],
    sound: '0'
})