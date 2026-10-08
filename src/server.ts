import { createServer } from "node:http";
import { Networks } from "@stellar/stellar-sdk";

const server=createServer((req,res)=>{
  res.setHeader("content-type","application/json");
  if(req.url==="/health") return void res.end(JSON.stringify({ok:true,service:"riskbeacon-backend"}));
  if(req.url==="/network") return void res.end(JSON.stringify({network:Networks.TESTNET}));
  res.statusCode=404; res.end(JSON.stringify({error:"not_found"}));
});
server.listen(Number(process.env.PORT??8787));
