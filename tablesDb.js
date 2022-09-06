
function FormTable(objConection)
{

    this.objConection=objConection;
    
    this.CreateForm=function(summaryText,customerId,inquirieId,deliveryStatus,deliveryDate)
    {   
        form=
        { 
            fields:
            {
                summaryText:summaryText,
                customerId:customerId,
                inquirieId:inquirieId,
                deliveryStatus:deliveryStatus,
                deliveryDate:deliveryDate
            },
            
            fieldsStr:
            {       
                summaryText:`'${summaryText}'`,
                customerId:`${customerId}`,
                inquirieId:`${inquirieId}`,
                deliveryStatus:`${deliveryStatus}`,
                deliveryDate:`'${deliveryDate}'`

            }
            
        };
        
        return form;
    }
    
    //........ End Function CreateForm ........

    this.Insert=function(form,func)
    {   
        let fldsStr=form.fieldsStr;
        let formstr=`(${fldsStr.summaryText},${fldsStr.customerId},${fldsStr.inquirieId},${fldsStr.deliveryStatus},${fldsStr.deliveryDate})`; 
        let sql = "INSERT INTO forms(Summary_text,customer_Id,Inquirie_Id,delivery_status,delivery_date) VALUES "+formstr;
        
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Insert ........


    this.Select=function(fieldsSelects,statmentWhere,func)
    {   
        let sql = `select ${fieldsSelects} from forms where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {   
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Select ........


    this.Update=function(statmentSet,statmentWhere,func)
    {   
        let sql = `update forms set ${statmentSet} where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Update ........


    this.Delete=function(statmentWhere,func)
    {   
        let sql = `delete from forms where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Delete ........

}

//.....................End Function FormTable...................



function FormAttachmentTable(objConection)
{

    this.objConection=objConection;
    
    this.CreateFormAttachment=function(attachType,attachContent,formId)
    {   
        FormAttachment=
        { 
            fields:
            {
                attachType:attachType,
                attachContent:attachContent,
                formId:formId
            },
            
            fieldsStr:
            {       
                attachType:`'${attachType}'`,
                attachContent:`${attachContent}`,
                formId:`${formId}`
            }
            
        };
        
        return FormAttachment;
    }
    
    //........ End Function CreateFormAttachment ........

    this.Insert=function(FormAttachment,func)
    {   
        let fldsStr=FormAttachment.fieldsStr;
        let frmAttstr=`(${fldsStr.attachType},${fldsStr.attachContent},${fldsStr.formId})`; 
        let sql = "INSERT INTO forms_attachments(attach_type,attach_content,form_Id) VALUES "+frmAttstr;
        
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Insert ........


    this.Select=function(fieldsSelects,statmentWhere,func)
    {   
        let sql = `select ${fieldsSelects} from forms_attachments where ${statmentWhere}`;
        
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Select ........


    this.Update=function(statmentSet,statmentWhere,func)
    {   
        let sql = `update forms_attachments set ${statmentSet} where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Update ........


    this.Delete=function(statmentWhere,func)
    {   
        let sql = `delete from forms_attachments where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Delete ........

}

//.....................End Function FormAttachmentTable...................



function FormOrientedTable(objConection)
{

    this.objConection=objConection;
    
    this.CreateFormOriented=function(deliveryDate,deliveryStatus,formId,employeId)
    {   
        FormOriented=
        { 
            fields:
            {
                deliveryDate:deliveryDate,
                deliveryStatus:deliveryStatus,
                formId:formId,
                employeId:employeId
            },
            
            fieldsStr:
            {       
                deliveryDate:`'${deliveryDate}'`,
                deliveryStatus:`${deliveryStatus}`,
                formId:`${formId}`,
                employeId:`${employeId}`
            }
            
        };
        
        return FormOriented;
    }
    
    //........ End Function CreateFormOriented ........

    this.Insert=function(FormOriented,func)
    {   
        let fldsStr=FormOriented.fieldsStr;
        let frmOrid=`(${fldsStr.deliveryDate},${fldsStr.deliveryStatus},${fldsStr.formId},${fldsStr.employeId})`; 
        let sql = "INSERT INTO forms_oriented(delivery_date,delivery_status,form_Id,employe_Id) VALUES "+frmOrid;
        
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Insert ........


    this.Select=function(fieldsSelects,statmentWhere,func)
    {   
        let sql = `select ${fieldsSelects} from forms_oriented where ${statmentWhere}`;
        
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Select ........


    this.Update=function(statmentSet,statmentWhere,func)
    {   
        let sql = `update forms_oriented set ${statmentSet} where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Update ........


    this.Delete=function(statmentWhere,func)
    {   
        let sql = `delete from forms_oriented where ${statmentWhere}`;
        this.objConection.query(sql,function (err, result) {
        if (err) throw err;
        if(func) func(result);
        });

    }

    //........ End Function Delete ........

}

//.....................End Function FormOrientedTable...................















//............Exports..................

module.exports=
{
    FormTable:FormTable,
    FormAttachmentTable:FormAttachmentTable,
    FormOrientedTable:FormOrientedTable 
};