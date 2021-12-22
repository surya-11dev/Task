const express= require('express');
const { ReplSet } = require('mongodb');
const mongoose=require('mongoose')
const employeeroute=express.Router()
localStorage= require('local-storage');

const employermodel=require('../model/employeemodel')

employeeroute.get('/get_login/:type',(req,res)=>{
    // console.log(req.params.type)
    let user
    if(req.params.type=="admin"){
        user="Admin"
    }else{
        user="User"
    }
    localStorage.set("user_key", req.params.type);
    res.render('login', {
        // EJS variable and server-side variable
        user: user
    });
})

employeeroute.get('/getEmployees',(req,res)=>{
    // console.log(req.body)
    employermodel.find((err,result)=>{
        if(err){
            // res.send(err)
            console.log(err)
            res.json({"status":0,"Error":err})
        }else{
            console.log("express")
            // res.send(result)
            res.json({"status":1,result})
        }
    })
})

employeeroute.get('/addEmployee',(req,res)=>{
    // console.log('get')
    res.render('empNew')
})

employeeroute.get('/getEmployee/:id',(req,res)=>{
    employermodel.findOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":1})
        }else{
            console.log(result)
            // res.send(result)
            // res.json({"status":1,"user":result})
            if(result==null){
                res.json({"status":0,"msg":"employee not available"})
            }
            else{
                let user=localStorage.get("user_key");
                res.render('empEdit', {
                    // EJS variable and server-side variable
                    user: result,
                    type:user
                });
                // res.json({"status":1,"msg":"employee available",result})
            }
        }
    })
})

employeeroute.post('/addemployee',(req,res)=>{
    console.log(req.body)
    const emp={
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    password:req.body.password,
    department:req.body.department,
    dob:req.body.dob
    }
    employermodel.findOne({email:req.body.email},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            if(result==null){
                employermodel.insertMany(emp,(err,result)=>{
                    if(err){
                        res.send("employee not registered")
                    }
                    else{
                        employermodel.find((err,result)=>{
                            if(err){
                                // res.send(err)
                                console.log(err)
                                res.json({"status":0,"Error":err})
                            }else{
                                // console.log("express")
                                // res.send(result)
                                console.log(result)
                                let user=localStorage.get("user_key");
                                console.log(user)
                                // res.json({"status":1,result})
                                res.render('empTable', {
                                    // EJS variable and server-side variable
                                    list: result,
                                    type:user
                                });
                            }
                        })
                        // res.render('empTable')
                        // res.json({"msg":"Registered"})
                    }
            
                })
            }
            else{
                res.send("employee already exist")
            }
        }
    })
    })

employeeroute.post('/editemployee',(req,res)=>{
    console.log(req.body)
        employermodel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, result) => {
        // update({_id:req.params.id},{$set:req.body},(err,result)=>{
            if(err){
                res.send(err)
                // res.json({"status":0,"error":1})
            }else{
                // res.send("data edited")
                // res.json({"status":1,"user":result})
                if(result.modified==0){
                    res.json({"status":0,"msg":"employee not available"})
                }
                else{
                    employermodel.find((err,re)=>{
                        if(err){
                            // res.send(err)
                            console.log(err)
                            res.json({"status":0,"Error":err})
                        }else{
                            // console.log("express")
                            // res.send(result)
                            // console.log(result)
                            let user=localStorage.get("user_key");
                            console.log("user")
                            // res.json({"status":1,result})
                            res.render('empTable', {
                                // EJS variable and server-side variable
                                list: re,
                                type:user
                            });
                        }
                    })
                }
            }
        })
    
})

employeeroute.get('/delete/:id', (req, res) => {
    employermodel.deleteOne({_id:req.params.id}, (err, result) => {
        // console.log(err)
        // console.log(result)
        if (!err) {
            employermodel.find((err,result)=>{
                if(err){
                    // res.send(err)
                    console.log(err)
                    res.json({"status":0,"Error":err})
                }else{
                    // console.log("express")
                    // res.send(result)
                    // console.log(result)
                    let user=localStorage.get("user_key");
                    console.log("user")
                    // res.json({"status":1,result})
                    res.render('empTable', {
                        // EJS variable and server-side variable
                        list: result,
                        type:user
                    });
                }
            })
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

// employeeroute.delete('/deleteemployee/:id',(req,res)=>{
//     employermodel.deleteOne({_id:req.params.id},(err,result)=>{
//         if(err){
//             // res.send("data not deleted")
//             res.json({"status":0,"error":err})
//         }else{
//             // res.json({"status":1,"user":result})
//             if(result.deletedCount==0){
//                 res.json({"status":0,"msg":"employee not available"})
//             }
//             else{
//                 res.json({"status":1,"msg":"employee deleted"})
//             }
//         }
//     })
// })

employeeroute.post('/login',(req,res)=>{
    // console.log(req.body)
    employermodel.findOne({email:req.body.email},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            if(result==null){
                res.json({message:"Employee does not exist",status:0})
                // employermodel.insertMany(emp,(err,result)=>{
                //     if(err){
                //         res.send("employee not registered")
                //     }
                //     else{
                //         res.json({"msg":"Registered"})
                //     }
            
                // })
            }
            else{
                if(req.body.password==result.password){
                    employermodel.find((err,result)=>{
                        if(err){
                            // res.send(err)
                            console.log(err)
                            res.json({"status":0,"Error":err})
                        }else{
                            // console.log("express")
                            // res.send(result)
                            // console.log(result)
                            let user=localStorage.get("user_key");
                            // console.log(user)
                            // res.json({"status":1,result})
                            res.render('empTable', {
                                // EJS variable and server-side variable
                                list: result,
                                type:user
                            });
                        }
                    })
                }else{
                    res.json({message:"Incorrect password"})
                }
                // console.log(result)
                
                // res.send("employee already exist")
            }
        }
    })
    })






module.exports=employeeroute
