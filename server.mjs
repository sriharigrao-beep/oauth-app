import http from 'node:http';
import fs from 'node:fs';
import {researchRoute} from './src/research.mjs';
const port=Number(process.env.PORT||3000);
const origin=new URL(process.env.PUBLIC_ORIGIN||process.env.RENDER_EXTERNAL_URL||`http://localhost:${port}`).origin;
const allowedOrigin=process.env.ALLOWED_ORIGIN?new URL(process.env.ALLOWED_ORIGIN).origin:origin;
const html=fs.readFileSync(new URL('./index.html',import.meta.url));
export async function handle(request){
 const path=new URL(request.url).pathname;
 if(path.startsWith('/api/')){
  if(request.headers.get('origin')!==allowedOrigin)return new Response('Origin not allowed',{status:403});
  const cors={'Access-Control-Allow-Origin':allowedOrigin,'Vary':'Origin','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, X-Research-Key','Cache-Control':'no-store'};
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
  const response=await researchRoute(request,fetch,allowedOrigin);
  const headers=new Headers(response.headers);for(const [k,v]of Object.entries(cors))headers.set(k,v);
  return new Response(response.body,{status:response.status,headers});
 }
 if(request.method!=='GET')return new Response('Method not allowed',{status:405});
 if(path==='/health')return new Response('ok');
 if(!['/','/index.html'].includes(path))return new Response('Not found',{status:404});
 return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"}});
}
export function start(){return http.createServer(async(req,res)=>{try{
 let size=0,chunks=[];
 for await(const chunk of req){size+=chunk.length;if(size>6000){res.writeHead(413);res.end('Request too large');return}chunks.push(chunk)}
 const request=new Request(origin+req.url,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(chunks)})});
 const response=await handle(request);
 res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500);res.end('Server error')}}).listen(port,'0.0.0.0',()=>console.log('OAuth Path listening on port '+port));}
if(process.env.NODE_ENV!=='test')start();
