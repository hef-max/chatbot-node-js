const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scraping"
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});    
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const list = [''];

const helpMessage = `
katakan sesuatu kepada saya
!ping - untuk melihat fitur
!wiki - untuk mencari sesuatu di Wikipedia, tambahkan (_) bila kalimat [contoh : !wiki kapal_selam]
!google - untuk mencari sesuatu di Google, tambahkan (_) bila kalimat [contoh : !google kapal_selam]
!gs - untuk mencari sesuatu di Google Scholar, tambahkan (+) bila kalimat [contoh : !gs kapal+selam]
!brainly - untuk mencari sesuatu di Brainly, tambahkan (+) bila kalimat [contoh : !brainly kapal+selam]
!yt - untuk mencari sesuatu di Youtube, tambahkan (+) bila kalimat [contoh : !yt justin+song]
`;
            
client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('🤖: hay have a nice day');
        msg.reply(helpMessage);
    }
    //wikipedia
    else if(msg.body.slice(0, 5) == "!wiki"){
        let input = msg.body.slice(5, );
        let inputArray = input.split(" ");
        let message = "";
        let url = "https://id.wikipedia.org/wiki/";

        if(inputArray.length == 1) {
            message = `coba carikan sesuatu di wikipedia
            [contoh: !wiki (pesan)]`;
        }else{
            inputArray.shift();
            message = url + inputArray.join(" ");
        }
        msg.reply('🤖'+ message);
        msg.reply("🤖: you can try like this for word = [!wiki kapal_selam]");
    }
    //google
    else if(msg.body.slice(0, 7) == '!google'){
        let input = msg.body.slice(7, );
        let inputArray = input.split(" ");
        let message = "";
        let url = "https://www.google.com/search?q=";

        if(inputArray.length == 1) {
            message = `coba carikan sesuatu di google
            [contoh: !google (pesan)]`;
        }else{
            inputArray.shift();
            message = url + inputArray.join(" ");
        }
        msg.reply('🤖'+ message);
        msg.reply("🤖: you can try like this for word = [!google kapal_selam]");
    }
    //google scholar
    else if(msg.body.slice(0, 3) == '!gs'){
        let input = msg.body.slice(3, );
        let inputArray = input.split(" ");
        let message = "";
        let url = "https://scholar.google.com/scholar?hl=id&as_sdt=0%2C5&q=";

        if(inputArray.length == 1) {
            message = `coba carikan sesuatu di google scholar
            [contoh: !gs (pesan)]`;
        }else{
            inputArray.shift();
            message = url + inputArray.join(" ") + '&oq=';
        }
        msg.reply('🤖'+ message);
        msg.reply("🤖: you can try like this for word = [!gs kapal+selam]");
    }
    //brainly
    else if(msg.body.slice(0, 8) == '!brainly'){
        let input = msg.body.slice(8, );
        let inputArray = input.split(" ");
        let message = "";
        let url = "https://brainly.co.id/app/ask?entry=hero&q=";

        if(inputArray.length == 1) {
            message = `coba carikan sesuatu di brainly
            [contoh: !brainly (pesan)]`;
        }else{
            inputArray.shift();
            message = url + inputArray.join(" ");
        }
        msg.reply('🤖'+ message);
        msg.reply("🤖: you can try like this for word = [!brainly kapal+selam]");
    }
    //youtube
    else if(msg.body.slice(0, 3) == '!yt'){
        let input = msg.body.slice(3, );
        let inputArray = input.split(" ");
        let message = "";
        let url = "https://www.youtube.com/results?search_query=";

        if(inputArray.length == 1) {
            message = `coba carikan sesuatu di youtube
            [contoh: !yt (pesan)]`;
        }else{
            inputArray.shift();
            message = url + inputArray.join(" ");
        }
        msg.reply('🤖'+ message);
        msg.reply("🤖: you can try like this for word = [!yt song+nanana]");
    }
    else if(msg.body != '!ping' || msg.body != '!wiki' || msg.body != '!google' || msg.body != '!brainly' || msg.body != '!gs' || msg.body != '!yt'){
        for(i = 0; i < list.length; i++){
            if(msg.body == list[i]){
                msg.reply('🤖: uy!');
                msg.reply('🤖: why?');
            }
        }
    }
    con.connect(function(err) {
        // if (err) throw err;
        // console.log("Connected!");
        let sql = `INSERT INTO teks (teks, time) VALUES ('`+msg.body+`', CURDATE());`;
        con.query(sql, function (err, result) {
        //   if (err) throw err;
            console.log("1 record inserted");
        });
    });
});

client.initialize();