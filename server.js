const http = require("http");


const todos = [
{id: 1, text: 'Todo One'},
{id: 1, text: 'Todo Two'},
{id: 1, text: 'Todo Three'}
]
 
const server = http.createServer((req, res) => {

      const {headers, url, method} = req;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-By", "NodeJS");
  res.setHeader("X-My-HeaderKey", "MyValue");

//   res.write("<h1>Hello World</h1>");
//   res.write("<h2> Hello Again </h2>");

 let body = [];
 
 let status = 404;
 const response = {
     sucess : false,
     data : null
 };

if(method === 'GET' && url === '/todos') {
    status = 200;
    response.sucess = true;
    response.data = todos;
} else if(method === 'POST' && url === '/todos') {
//    const { id, text} = JSON.parse(body);
   temp = {
    "id": 1,
    "text": "To do four"
}
    temp = JSON.stringify(temp);
   const { id, text } = JSON.parse(temp);
    todos.push({ id, text});
    status = 201;
    response.sucess = true;
    response.data = todos;
}
 req.on('data', chunk => {
     body.push(chunk);
 })
 .on('end', () => {
     body = Buffer.concat(body).toString();

 });
res.writeHead(status, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
});

  res.end(
      JSON.stringify(response)
      );
  });
  
const PORT = 5000;
  
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
