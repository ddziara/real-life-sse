//import http from "node:http";
import http from "node:http2";
import rethinkdbdash from "rethinkdbdash";
import fsp from "node:fs/promises";
import fs from "node:fs";

const r = rethinkdbdash();

function nextRow(cursor, cancelled) {
    return new Promise((resolve, reject) => {
        cursor.next((err, row) => err ? reject(err) : resolve(row));
        cancelled.then(() => reject(new Error("Cancelled")));
    });
}

async function* query(cancelled) {
    let cursor = await r.db("rethinkdb").table("stats").changes();
    cancelled.then(() => cursor.close());

    while (true)
        yield nextRow(cursor, cancelled);
}

async function iterStream(res, iter, cancel) {
    res.writeHead(200, { "Content-Type": "text/event-stream" });
    res.connection.on("close", () => cancel());

    for await (let item of iter) {
        console.log(item);
        res.write(`event: item\ndata: ${JSON.stringify(item)}\n\n`);
    }
}

async function handler(req, res) {
    if (req.url === "/events") {
        console.log("EVENTS");
        let cancel, cancelled = new Promise(resolve => cancel = resolve);

        try {
            await iterStream(res, query(cancelled), cancel)
        }
        catch (err) {
            if (err.message === "Cancelled")
                console.log("Connection was closed");
            else console.log("Unexpected error:", err.stack);
        }

        return;
    }

    let fPath = `.${req.url}`;

    if (fPath === "./") {
        fPath = "./index.html";
    }

    // console.log(fPath);

    try {
        const content = await fsp.readFile(fPath);
        // console.log(content.toString());

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content);
    }
    catch (e) {
        if (e.code === "ENOENT") {
            res.writeHead(404, { "Content-Type": "text/plain" })
            res.end("No such file");
        }
        else {
            res.writeHead(500)
            res.end("Server error");
        }
    }



}

//const PORT = 8000;
const PORT = 443;

// http.createServer(handler).listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}

const server = http.createSecureServer(options);

server.on('stream', (stream, headers) => {
    stream.respond({
      'content-type': 'text/html; charset=utf-8',
      ':status': 200,
    });
    stream.end('<h1>Hello World</h1>');
  });
  
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
