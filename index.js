
const mysql=require('mysql');
const http=require('http');
const express=require('express');
const socketIo=require('socket.io');
const controller=require('./Controller');
const tablesDb=require('./tablesDb');


//...............parmeters......................

const app=express();
const server=http.createServer(app);
const io=socketIo(server);
const port=process.env.PORT||5050;
const config_db ={
        server: '127.0.0.1',
        user: 'fatimah',
        database: 'chat_db',
        password:'123'
      };


const objConection=mysql.createConnection(config_db);


//............listen server.........................

server.listen(port,()=>{

  console.log(`\n..... Server Runing Port ${port} .....\n`);

});


//............connection database.........................
const Inquiries_Agent={};

objConection.connect(function(err)
  {
    if (err){console.log(err.toString());return;}
    console.log(`\n..... Connected to MySQL Server .....\n`);

   
    let sql = `select Inquirie_Id,Agent_Id,Inquirie_name from inquiries`;
    objConection.query(sql,(err, result)=>{
        if (err) throw err;
        
            result.forEach((r)=>{
                Inquiries_Agent[r.Inquirie_Id]={Inquirie_name:r.Inquirie_name,Agent_Id:r.Agent_Id};
                });  

                
    });

    


  });


//................tables objects .....................

const objForm=new tablesDb.FormTable(objConection);
const objFormAttach=new tablesDb.FormAttachmentTable(objConection);
const objFormOrient=new tablesDb.FormOrientedTable(objConection);

const contr_Emplyes=new controller.Emplyes();
const contr_Agents=new controller.Agents(objForm,objFormAttach,objFormOrient,contr_Emplyes,Inquiries_Agent);
const contr_Custemers=new controller.Custemers(objForm,objFormAttach,Inquiries_Agent,contr_Agents);



//..................Routing....................

app.get('/',function(req,res,next){

  res.send("Holle.........");
  
});


//..................connection......................


io.on('connection',(clientsocket)=>{

  
  
  let clientId = clientsocket.handshake.query.Id;
  let clientType = clientsocket.handshake.query.Type;
  console.log(`Connection ${clientType} ID:->[${clientId}]`);

  if(clientType=="Agent")
  {
    contr_Agents.addAgent(clientsocket,clientId);

  }//..........

  else if(clientType=="Custemer")
  {
    contr_Custemers.addCustemer(clientsocket,clientId);
  }//..........

  else if(clientType=="Emplye")
  {
    contr_Emplyes.addEmplye(clientsocket,clientId,contr_Custemers);

  }//..........


});//end connection........................








