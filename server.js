const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 5050

io.on('disconnect', (evt) => {
    console.log('disconnected')
})
const users = []
const moves = []
const moves1 = []
const moves2 = []
const user1 = ''
let start = 1
const win = ['123', '456', '789', '147', '258', '369', '159', '357', '321', '654', '987', '741', '852', '963', '951', '753']
let find = 0




io.on('connection', (socket) => {

    socket.on('message', (evt) => {


        // if(start >= 5){

        // }
        if (moves1.length >= 3) {
            console.log('i m in')
            let temp = ''
            for (var i = moves1.length - 1; i >= moves1.length - 3; i--) {
                temp = temp + moves1[i]
            }
            let combinations = [];

            for (let i = 0; i < temp.length; i++) {
                for (let j = i + 1; j < temp.length + 1; j++) {
                    combinations.push(temp.slice(i, j));
                }
            }
            combinations.forEach(r => {
                if (win.indexOf(r) !== -1) {
                    find = 1
                    console.log("you win")

                }

            })

        }


        if (moves2.length >= 3) {
            console.log('i m in')
            let temp = ''
            for (var i = moves2.length - 1; i >= moves2.length - 3; i--) {
                temp = temp + moves2[i]
            }
            let combinations = [];

            for (let i = 0; i < temp.length; i++) {
                for (let j = i + 1; j < temp.length + 1; j++) {
                    combinations.push(temp.slice(i, j));
                }
            }
            combinations.forEach(r => {
                if (win.indexOf(r) !== -1) {
                    find = 1
                    console.log("you win")

                }

            })

        }
        // // if(moves2.length >= 3){

        // // }
        if (start % 2 == 0) {
            //   moves1.push()
            moves1.push(evt.cmd.split('\n')[0])
        } else {
            moves2.push(evt.cmd.split('\n')[0])
        }
        // console.log(evt)
        start = start + 1;


        if (find == 1) {
            socket.broadcast.emit('message', {
                username: evt.username,
                cmd: 'lost'
            })
        } else {
            socket.broadcast.emit('message', evt)
        }

    })
})
http.listen(port, () => console.log(`server listening on port: ${port}`))