const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')



const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/AssignMe')
.then(()=> console.log("db connected Successfully"))
.catch((error)=>console.log("error occured during db connection",error))



//the req will first enter here if contenttype json then the express.json() will parse it 
//for multipart/form-data use multer 
app.use(express.json())
app.use(cors())
require('dotenv').config()
const SECREATKEY = process.env.SECREAT


//models
const Admin = require('./Models/Admin')
const Agents = require('./Models/Agents')
const Tasks = require('./Models/Tasks')


const authenticate = async(req, res,next)=>{
    const token = req.headers?.authorization.split(' ')[1]
    // console.log(token)
    if(!token)
    {
        console.log("token is not there")
        return res.json({success : false, message:"Unauthorized Access"})
    }
    else{
        try{
            const decoded =  jwt.verify(token,SECREATKEY)
            if(decoded)
            {
                req.userId = decoded?.userId
                req.role = decoded?.role
                // console.log(req?.userId)
                next() 
            }
            else{
                return res.json({success:false, message :"Unauthorized Access"})     
            }
        }
        catch(err)
        {
            console.log("erro in decoding of jwt ")
            return res.json({success:false,message:"error at token"})
        }

    }
}

app.post('/verify-token',async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token)
    {
        return res.json({valid : false})

    }
    else{
        try{
            const decoded = jwt.verify(token,SECREATKEY)
            return res.json({valid : true, userId : decoded?.userId , role : decoded?.role })
        }
        catch(err)
        {
            return res.json({valid : false})
        }
    }
})


app.post('/signin',async(req,res)=>{
    console.log("inside siginin")
    const {userName,email,password} = req.body
    
    try{
        const userExists = await Admin.findOne({email : email})
        // console.log("checking userexists")
        if(userExists)
        {
            // console.log(" userexists")
            return res.json({success : false, message :"user already exists"})
        }
        // console.log("user doesnot exists")

        const hashedPassword = await bcrypt.hash(password,10)
        const newAdmin = new Admin({name : userName, email, password: hashedPassword})
        // console.log(newAdmin)
        newAdmin.save()
        return res.json({success : true, message : "Admin Created"})
    }
    catch(err)
    {
        return res.json({success : false, message : "Error in Saving into db"})
    }
    
})





app.post('/login',async(req,res)=>{
   const {email, password} = req.body
   if(email && password)
   {
    const user = await Admin.findOne({email : email})
    if(user)
    {
        
        const isMatch = await bcrypt.compare(password,user?.password)
        if(!isMatch)
        {
            return res.json({success:false, message:"Incorrect Credentials"})
        }
        //token is json format with three fields ({},s,{}) 
        const token = jwt.sign({userId : user?._id, role : "admin"},SECREATKEY,{expiresIn:'1d'})
        return res.json({success:true, message:"login Successfull" ,  token})
    }
    else{
        return res.json({success : false , message : "Sigin Required"})
    }
   }
   else{
    return res.json({success:false , message:"data field is missing"})
   }
   
})


app.post('/add-agent', authenticate, async(req,res)=>{
    // console.log(req)
    const {agentName, agentEmail, agentPassword} = req.body
    
    if(!agentName  && !agentEmail && !agentPassword)
    {
        return res.json({success:false, message:"enter all the fields"})
    }
    
    try{
        const exists = await Agents.findOne({agentEmail : agentEmail})

        if(exists)
        {
            return res.json({success:false,message:"the Agent already exists "})
        }
        else{
            const hashedPassword = await bcrypt.hash(agentPassword,10)
            const newAgent =  new Agents({agentName, agentEmail, agentPassword:hashedPassword, createdBy:req?.userId})
            newAgent.save()
            return res.json({success:true, message:"Agent Added Successfully"})
        }
    }
    catch(error)
    {
        return res.json({success:false, message:"Error while Saving Agent "})
    }
})


app.get('/show-agent', authenticate, async(req,res)=>{
    const userId = req?.userId;
    const role = req?.role;
    // console.log("inside the show-agent")
    try{
        const existedAgent = await Agents.find({createdBy : userId})
        // console.log("agent exists that the suer is created ")
        // console.log(existedAgent)
        if(existedAgent.length > 0)
        {
            return res.json({success : true , existedAgent})
        }
        else{
            // console.log("agent does not exist ")
            return res.json({success : false , message : "Agent is Empty Add agent"})
        }
    }
    catch(error)
    {
        return res.json({success : false, message :"Error in the Show agent at backend"})
    }

})

app.delete('/delete-agent/:agentEmail', authenticate,async(req,res)=>{
    const fetchedEmail = req.params.agentEmail
    if(fetchedEmail)
    {
        try{
            const agentExist =  await Agents.findOne({agentEmail : fetchedEmail})
            if(agentExist)
            {
                await Agents.deleteOne({agentEmail: fetchedEmail})
                return res.json({success : true, message:"Agent Deleted SuccessFully"})
            }
            else{
                return res.json({success : false, message:"Agent Does Not Exist"})
            }
        }
        catch(error)
        {
            console.log("Error at the delete-agent")
            return res.json({success : false, message :"error at the backend"})
        }
    }
})


app.post('/edit-agent',authenticate,async(req,res)=>{
    const{eName, eEmail,prevemail} = req.body
    try{
        if(eName && eEmail && prevemail)
        {
            const toUpdateAgent =  await Agents.findOne({agentEmail:prevemail})

            if(!toUpdateAgent)
            {
                return res.json({success:false, message:"the Agent Doesnot exist "})
            }
            toUpdateAgent.agentName = eName;
            toUpdateAgent.agentEmail = eEmail;

            await toUpdateAgent.save()
            return res.json({success : true, message:"updated Successfully" , toUpdateAgent})

        }
    }
    catch(error)
    {
        return res.json({success : false, message :"Error Occured at Backedn"})
    }
})



const upload = multer({dest:'uploads/'})
const csv = require('csv-parser')
const fs = require('fs')
//here the file will be there in req.file or files 
//in req.body it only contains the plain text 
app.post('/upload-csv',authenticate, upload.single('csvfile'),async(req,res)=>{
    const csv_file = req.file;
    if(!req.file)
    {
        return res.json({success:false, message:"csv file is Missing "})
    }
    else{
        const agents = await Agents.find({createdBy : req.userId})
        if(agents.length === 0)
        {
            return res.json({success:false, message :"Agent is Empty"})
        }
        const tasks = [];
        let agentindex =0 


        fs.createReadStream(csv_file.path)
        .pipe(csv()) //parser 

        //on start
        .on('data', (row)=>{
            const assignedAgent = agents[agentindex];
            tasks.push({
                row : row,
                assignedTo : assignedAgent._id,
                createdBy : req.userId
            });

            agentindex = (agentindex + 1) % agents.length;
        })

        //specifies after the task is finished then
        .on('end', async()=>{
            await Tasks.insertMany(tasks)
            return res.json({success : true, message:"Task Assigned Successfully"})
        })
    }
})



app.get('/show-tasks', authenticate, async(req,res)=>{
    const userId  = req.userId;

    const existTask = await Tasks.find({createdBy : userId});
    if(!existTask)
    {
        return res.json({success : false, message:"Empty Task"})
    }

    //aggregation 
    //aggregatiion based on the assigneto and a task lisk
    //id , assignedto, tasks [] 
    const aggregateTasks = await  Tasks.aggregate(
        [

            { $match : { createdBy :  new  mongoose.Types.ObjectId(userId) } },
            { $group : { _id : "$assignedTo" , tasks : {$push : "$row"} } },
            { $project : {assignedTo : "$_id", tasks : 1}}
        ]);
        console.log(aggregateTasks)
    return res.json({success : true, message:"success" , aggregateTasks})
})

app.listen(port,()=>{
    console.log("Server is Listnening",port)
})