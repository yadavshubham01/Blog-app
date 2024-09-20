import { PrismaClient } from '@prisma/client/edge.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput,signupInput } from '@shubhamyadav01/common-blogs';
import { Hono } from 'hono'
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET : string
	}
}>();


userRouter.post('/signup', async(c) => {
  const body =await c.req.json();
  const { success } = signupInput.safeParse(body);
 
  if(!success){ 
    console.log("fuck");
    
    c.status(411);
    return c.json({
        msg: "invalid details"
    })   
 }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  try {
   const user=await prisma.user.create({
    data: {
      email :body.email,
      password: body.password,
      name:body.name
    }
   });
   const jwt=await sign({id : user.id},c.env.JWT_SECRET);
   return c.json({
    jwt:jwt
  });
  
  }catch(e){
    console.log(e)
    c.status(403);
     return c.json({error: "error while signing up"});
  }
})

userRouter.post('/signin', async(c) => {
  const body =await c.req.json();
 const { success } = signinInput.safeParse(body);
 if(!success){
  try{}catch(e){
    console.log(e);
    c.status(411);
    return c.json({
        msg: "invalid details"
    })
  }
 }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate())
 const user =await prisma.user.findUnique({
  where: {
    email: body.email
  }
 });
  
 if(!user){
  c.status(403);
  return c.json({error: "user not found"});
 }
  const jwt=await sign({id:user.id},c.env.JWT_SECRET);
  return c.json({
    jwt:jwt
  });
})








//DIRECT_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"