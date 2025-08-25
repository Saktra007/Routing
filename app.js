const express=require('express');
const app=express();

const userRoutes=require('./routes/users');
const productRoutes=require('./routes/products');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/users/:id',(req,res)=>{
    const Id=req.params.id;
    res.send(`User ID: ${Id}`);
});

app.get('/search',(req,res)=>{
    const query=req.query.q;
    res.send(`Search Query: ${query}`);
});

app.get('/',(req,res)=>{
    res.send(`Hello World!,
        <form action="/submit" method="post">
            <button type="submit">Submit</button>  
        </form> `
    );
});
app.post('/submit',(req,res)=>{
    res.send('Form submitted!');
});
app.put('/update',(req,res)=>{
    res.send('Data updated!');
});
app.use('/users',userRoutes);
app.use('/products',productRoutes); 
app.delete('/delete',(req,res)=>{
    res.send('Data deleted!');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});