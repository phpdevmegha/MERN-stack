import e from "express";
const app = e()

app.get("/",(req,resp)=>{
    resp.send({
        message:"test backend",
        sucess:true
    })
})
app.listen(3200);