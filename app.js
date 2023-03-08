const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url=='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My First App</title></head>');
        res.write('<body><form action=/message method=POST><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }else if(url=='/message' && method=='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString();
            const message=parseBody.split('=')[1];
            fs.writeFile('message.txt',message,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
});
server.listen(4000); 