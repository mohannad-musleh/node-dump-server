const http = require("http")
const zlib = require('zlib')

const server = http.createServer((req, res) => {
  const IP = res.socket.remoteAddress;
  const DATE = new Date();
  const DATE_ISO = DATE.toISOString();
  console.log(`${req.url} @ ${DATE_ISO} (ip: ${IP})`)
  if(req.url === '/file') {
    res.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});

    var text = "Hello World!";
    var buf = new Buffer(text, 'utf-8');   // Choose encoding for the string.
    return zlib.gzip(buf, function (_, result) {  // The callback will give you the 
      return res.end(result);                     // result, so just send it.
    });
  }else if(req.url !== '/') {
    res.writeHead(404)
    res.write("Not found")
    return res.end()
  }

  res.writeHead(200, {'Content-Type': 'application/json', "X-Server": "NODE", "X-Node-Version": process.version})
  res.write(`{"message": "hello from the other side", "ip": "${IP}", "date_time": "${DATE_ISO}"`)
  res.end()
})

const HOST = '0.0.0.0'
const PORT = 3000

server.listen(PORT, HOST, () => console.log(`server started at localhost:${PORT}`))
