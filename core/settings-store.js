var localStorage= new Storage('settings', {
    hostID: '',
    nudgeRepeat: '0',
    times: [],
    period: [15, 60, 480, 1440],
    messages:[
        //1= no commitment -->  4= soft commitment
        {id: '1', mssg: 'HTTPS-everywhere is ready for installation.'},
        {id: '2', mssg: ''},
        {id: '3', mssg: ''},
        {id: '4', mssg: 'HTTPS-everywhere is ready for installation. When would you like to enable the browser extension?'},
    ],
    sound: '0'
})