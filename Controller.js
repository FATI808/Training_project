
function Agents(objForm,objFormAttach,objFormOrient,objEmplyes,Inquiries_Agent)
{
    
 
    this.objForm=objForm;
    this.objFormAttach=objFormAttach;
    this.objFormOrient=objFormOrient;
    this.objEmplyes=objEmplyes;
    this.Inquiries_Agent=Inquiries_Agent;
   

    this.connectionAgents={};

    this.addAgent=function(clientsocket,clientId)
    {

        let room=`${clientId}Agent`;  
        clientsocket.join(room);
        this.connectionAgents[clientId]={socket:clientsocket,room:room}; 

        clientsocket.on('SendFormOriented',(FormOriented)=>{

           
            FormOriented['orientationDate']=new Date().toISOString().slice(0, 19).replace('T', ' ');
            FormOriented['deliveryDate']='0000-00-00 00:00:00';
            FormOriented['deliveryStatus']=0;
   
            if( FormOriented['employeId'] in this.objEmplyes.connectionEmplyes)
            {   
                formsend={}; 
                objForm.Select(['Summary_text','customer_Id','Inquirie_Id','sending_date'],`form_Id=${FormOriented['formId']}`,function(result){
                   
                    formsend['customerId']=`${result[0].customer_Id}`;
                    formsend['formId']=FormOriented['formId'];
                    formsend['sendingDate']=`${result[0].sending_date.toISOString().slice(0, 19).replace('T', ' ')}`;
                    formsend['orientationDate']=FormOriented['orientationDate'];
                    formsend['inquirieName']=Inquiries_Agent[result[0].Inquirie_Id.toString()].Inquirie_name;
                    formsend['summaryText']=result[0].Summary_text;
                    clientsocket.in(objEmplyes.connectionEmplyes[ FormOriented['employeId']].room).emit('ReciveFormOriented',formsend);
                    FormOriented['deliveryStatus']=1;
                    FormOriented['deliveryDate']=FormOriented['orientationDate'];

                });//end select
            }//end if

            let frmorgint_recod= objFormOrient.CreateFormOriented(FormOriented['deliveryDate'],FormOriented['deliveryStatus'],FormOriented['formId'],FormOriented['employeId']);
            objFormOrient.Insert(frmorgint_recod,(result)=>{
             console.log("1 Form Orgind Inserted, ID:" +result.insertId);
               });        

        });//end  SendOrigintForm.....


        clientsocket.on('disconnect',()=>{

            clientsocket.leave(room);
            console.log(`Disconnection Agent ID:->[${clientId}]`);
            delete this.connectionAgents[clientId];

        });//...........








}//...........









}//end Agents.....................




function Custemers(objForm,objFormAttach,Inquiries_Agent,objAgents)
{  
    this.objForm=objForm;
    this.objFormAttach=objFormAttach;
    this.Inquiries_Agent=Inquiries_Agent;
    this.objAgents=objAgents;
    this.connectionCustemers={};


    this.addCustemer=function(clientsocket,clientId)
    {
        
        let room=`${clientId}Custemer`;  
        clientsocket.join(room);
        this.connectionCustemers[clientId]={socket:clientsocket,room:room}; 
        
        
        clientsocket.on('disconnect',()=>{

            clientsocket.leave(room);
            console.log(`Disconnection Custemer ID:->[${clientId}]`);
            delete this.connectionCustemers[clientId];

        });//....end disconnect.......


        clientsocket.on('SendForm',(frm)=>{

            console.log(`Send Form  Custemer ID:->[${clientId}]`);
            console.log(frm)
            
            let frmRecive= JSON.parse(JSON.stringify(frm));
            frmRecive.Form['inquirieName']=this.Inquiries_Agent[frm.Form.inquirieId].Inquirie_name;
            frmRecive.Form['idForm']=' ';
            delete frmRecive.Form['inquirieId'];

            
            let summaryText=frm.Form.summaryText;
            let customerId=frm.Form.customerId;
            let inquirieId=frm.Form.inquirieId;
            let deliveryStatus=0;
            let deliveryDate='0000-00-00 00:00:00';


            let reciveId=this.Inquiries_Agent[frm.Form.inquirieId].Agent_Id;
            
            if(reciveId in this.objAgents.connectionAgents)
            {   
                deliveryStatus=1;
                deliveryDate=new Date().toISOString().slice(0, 19).replace('T', ' ');

            }//end if
                   
            

            //Create Form .....
            let form_recode=this.objForm.CreateForm(summaryText,customerId,inquirieId,deliveryStatus,deliveryDate);
            
            // Insert Form....

            this.objForm.Insert(form_recode,function(result){
                
                if(deliveryStatus==1)
                {   
                    frmRecive.Form.idForm=`${result.insertId}`; 
                    clientsocket.in(objAgents.connectionAgents[reciveId].room).emit("ReceiveForm",frmRecive);

                }
                console.log("1 Form Inserted, ID:" +result.insertId);

                for(i in frm.FormAttachment)
                {
                    
                  let attachType=frm.FormAttachment[i].attachType;
                 
                  let attachContent=frm.FormAttachment[i].attachContent;
                  
                  console.log(attachContent)
                  let Attach_recode=objFormAttach.CreateFormAttachment(attachType,attachContent,result.insertId);
                  objFormAttach.Insert(Attach_recode,(result)=>{
                    console.log("1 FormAttachment Inserted, ID:" +result.insertId);
                  });

                }//end for..
    
            });//end insert....

            

        });//.....end sendForm......




        






    }//...........


}//end Custemers.....................







function Emplyes()
{

    this.connectionEmplyes={};

    this.addEmplye=function(clientsocket,clientId,objCustemers)
    {    

        this.objCustemers=objCustemers;    
        let room=`${clientId}Emplye`;  
        clientsocket.join(room);
        this.connectionEmplyes[clientId]={socket:clientsocket,room:room}; 


        clientsocket.on('SendRespons',(resspons)=>{

           let reciveId= resspons['customerId'];
            if(reciveId in this.objCustemers.connectionCustemers)
            {   
                let respRecive= JSON.parse(JSON.stringify(resspons));
                delete respRecive['customerId'],respRecive['formId'];
                clientsocket.in(this.objCustemers.connectionCustemers[reciveId].room).emit("ReceiveRespons",respRecive);

            }//end if

        });
        //end of SendRespons..................


       
        clientsocket.on('disconnect',()=>{

            clientsocket.leave(room);
            console.log(`Disconnection Emplye ID:->[${clientId}]`);
            delete this.connectionEmplyes[clientId];

        });//...........

    }//...........


}//end Emplyes.....................





//..................exports......................

module.exports={
    Agents:Agents,
    Custemers:Custemers,
    Emplyes:Emplyes 
};






