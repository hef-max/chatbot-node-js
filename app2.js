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

const list = ['Hefry', 'Heff', 'Hef', 'heff', "hef", "hefry", "kang eppp", "Hefri", "Hefrii", "Hefri", "hefri", "hefri"];

const helpMessage = `
katakan sesuatu kepada saya
!ping - untuk melihat fitur.
!wiki - untuk mencari sesuatu di Wikipedia, tambahkan (_) bila kalimat [contoh : !wiki kapal_selam].
!google - untuk mencari sesuatu di Google, tambahkan (_) bila kalimat [contoh : !google kapal_selam].
!gs - untuk mencari sesuatu di Google Scholar, tambahkan (+) bila kalimat [contoh : !gs kapal+selam].
!brainly - untuk mencari sesuatu di Brainly, tambahkan (+) bila kalimat [contoh : !brainly kapal+selam].
!yt - untuk mencari sesuatu di Youtube, tambahkan (+) bila kalimat [contoh : !yt justin+song].
!suit - memainkan batu, gunting, dan kertas [contoh: !suit Batu🪨/Gunting✂️/Kertas📄].
!sahur - fitur untuk membangungkan sahur dengan waktu dan nama [contoh: !sahur 03.00 09/04/2022 boby].
`;
            
client.on('message', msg => {
    console.log(msg.body);
    //help
    if (msg.body == '!ping') {
        msg.reply('👻: hay have a nice day');
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
        msg.reply('👻'+ message);
        msg.reply("👻: you can try like this for word = [!wiki kapal_selam]");
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
        msg.reply('👻'+ message);
        msg.reply("👻: you can try like this for word = [!google kapal_selam]");
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
        msg.reply('👻'+ message);
        msg.reply("👻: you can try like this for word = [!gs kapal+selam]");
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
        msg.reply('👻'+ message);
        msg.reply("👻: you can try like this for word = [!brainly kapal+selam]");
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
        msg.reply('👻'+ message);
        msg.reply("👻: you can try like this for word = [!yt song+nanana]");
    }
    //suit
    else if(msg.body.slice(0, 5) == '!suit'){
        if(msg.body == '!suit'){
            msg.reply("[contoh: !suit batu/kertas/gunting]")
        }
        else{
            msg.reply("👻: play to game!");

            let suit = msg.body.slice(6, )
            comp = Math.random();

            if(comp < 0.36){
                comp = ['Batu', 'batu'];
            }else if(comp > 0.36 && comp < 0.68){
                comp = ['Gunting', 'gunting'];
            }else{
                comp = ['Kertas', 'kertas'];
            }

            let hasil = '';

            if(suit == comp[0] || suit == comp[1]){
                hasil = 'Seri!😓';
            }
            else if(suit == 'Batu' || suit == 'batu'){
                if(comp[0] == 'Gunting' || comp[1] == 'gunting'){
                    hasil = "Menang!🥳";
                }else{
                    hasil = "Kalah!😝";
                }
            }
            else if(suit == 'Gunting' || suit == 'gunting'){
                if(comp[0] == 'Kertas' || comp[1] == 'kertas'){
                    hasil = "Menang!🥳";
                }else{
                    hasil = "Kalah!😝";
                }
            }
            else if(suit == 'Kertas' || suit == 'kertas'){
                if(comp[0] == 'Batu' || comp[1] == 'batu'){
                    hasil = "Menang!🥳";
                }else{
                    hasil = "Kalah!😝";
                }
            }
            msg.reply("👻: Kamu memilih: "+suit+", komputer memilih: "+comp[1]+", hasilnya: "+ hasil);
        }
    }
    //sahur
    else if(msg.body.slice(0, 6) == '!sahur'){
        let waktu = msg.body.slice(6, 12);
        let tanggal = msg.body.slice(12, 23)
        let nama = msg.body.slice(23, );
        if(nama != null && waktu != null){
            msg.reply("👻: okey"+nama+", akan dibangunkan sahur pukul "+waktu+", tanggal"+tanggal.slice(0, 3)+" april");
            client.sendMessage(msg.from, '👻: good night😉');

            con.connect(function(err) {
                let sql = `INSERT INTO sahur VALUES ('`+nama+`','`+waktu+`','`+tanggal+`');`;
                con.query(sql, function (err, result) {
                    console.log("1 record inserted");
                });
            });
        }
        else{
            msg.reply("👻: bangunkan sahur dibatalkan");
        }
    }
    // //masih error
    // else if (msg.body === '!mediainfo') {
    //     const attachmentData = msg.downloadMedia();
    //     msg.reply(`
    //         *Media info*
    //         MimeType: ${attachmentData.mimetype}
    //         Filename: ${attachmentData.filename}
    //         Data (length): ${attachmentData.data.length}
    //     `);
    // }
    // //masih error
    // else if(msg.body.slice(0, 5) == "!foto"){
    //     url = 'https://picsum.photos/500/600/?random';

    //     msg.downloadMedia(url);
    // }
    // else if(msg.body == 'i love you' || msg.body == 'I love u' || msg.body == 'i love u' || msg.body == 'I love you' ||msg.body == 'I Love you' ||msg.body == 'love you' ||msg.body == 'Love you' ||msg.body == 'love u' ||msg.body == 'Love u'){
    //         msg.reply("👻: love u too ❤");
    // }
    else if(msg.body != '!ping' || msg.body != '!wiki' || msg.body != '!google' || msg.body != '!brainly' || msg.body != '!gs' || msg.body != '!yt'){
        for(i = 0; i < list.length; i++){
            if(msg.body == list[i]){
                msg.reply('👻: uy!');
                msg.reply('👻: why?');
                msg.reply('👻: u can try !ping to view orders');
            }
        }
    }
    con.connect(function(err) {
        let sql = `INSERT INTO 'teks'('teks', 'time') VALUES ('`+msg.body+`',CURDATE());`;
        con.query(sql, function (err, result) {
        });
    });
});
client.initialize();