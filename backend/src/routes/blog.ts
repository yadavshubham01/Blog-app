import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@shubhamyadav01/common-blogs";
import { Hono } from "hono";
import { verify } from 'hono/jwt';


export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables :{
        userId : string;
    }
}>();


bookRouter.use('/*', async (c, next) => {
    const header=c.req.header("authorization") || "";
   // const token=header.split('')[1];
 //  const response= await verify(header,c.env.JWT_SECRET);
try{
    const response= await verify(header,c.env.JWT_SECRET);
    if(response){
        c.set("userId",String(response.id));
        await next();
     
    }else{
        c.status(403);
        return c.json({error:"You are not logged in"})
    }
    }catch(e){
        console.log(e);
    c.status(403);
        return c.json({error:"unauthorized"})
  } 
   
  })

bookRouter.post('/', async(c) => {
   
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    
    const body =await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
          c.status(411);
          return c.json({
              msg: "invalid details"
          })
        }
        const userId =c.get('userId');
    const post =await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({
        id:post.id
    })
  });
  
bookRouter.put('/blog', async(c) => {
    const userId =c.get('userId');
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body=await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){

          c.status(411);
          return c.json({
              msg: "invalid details"
          })
        }
       
    const post=await prisma.post.update({
        where :{
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    
    return c.json({
        id:post.id
    })
  })

bookRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

   const posts = await prisma.post.findMany({
    select: {
        content: true,
        title: true,
        id: true,
        author: {
            select: {
                name: true
            }
        }
    }
   })
    return c.json({
        posts
    });
  })  

bookRouter.get('/:id', async(c) => {
    const id =c.req.param('id');
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
try{
   const post = await prisma.post.findUnique({
    where: {
        id 
    },
    select: {
        id:true,
        title: true,
        content: true,
        author:{
            select: {
                name:true
            }
        }
    }
   })
    return c.json({
        post
    });
  }catch(e){
     c.status(411);
     return c.json({
        msg:"Error while fetching blog post"
     })
  } 
  })
  
