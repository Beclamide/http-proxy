var http = require('http');

http.createServer(onRequest).listen(1337);

function onRequest(client_req, client_res) {
    var options;
    if (client_req.url === '/') {
        options = {
            hostname: 'localhost',
            port: 4000,
            path: `/prospect?page=default`,
            method: 'GET'
        };
    } else {
        options = {
            hostname: 'localhost',
            port: 4000,
            path: client_req.url,
            method: 'GET'
        };
    }

    var proxy = http.request(options, res => {
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}
