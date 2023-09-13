const { hash, compare} = require("../../utils/password.crypt");
const { create_Token } = require("../../utils/token");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const register = async (req,res) =>{
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password){
            throw new Error('You must provide an name and a email and a password.');
        }
        const existe = await prisma.users.findUnique({
            where: {
                email
            }
        });
    
        if(existe){
            res.status(400).json("Email already existe!");
        }
        let hashPassword = hash(password)
        const users = await prisma.users.create({
            data:{ 
                name, 
                email,
                password: hashPassword
            }
        });
        const token = create_Token(users.id);

        res.cookie("jwtoken", token, {
          maxAge: 1296000000,
          httpOnly: true,
          secure: true
        });

        res.status(200).json({email,token});

        
       } catch (error) {
        console.log(error)
    }
}

const login = async (req,res) =>{
    let { email, password} = req.body;

    try {
        if(!email || !password){
            throw new Error('You must provide an email and an password.');
        }
         
        const users = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if(!users){
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        let match = compare(password, users.password);
        if(!match){
             throw new Error("Password not match!");
        }

        const token = create_Token(users.id);

        res.cookie("jwtoken", token, {
            maxAge: 1296000000,
            httpOnly: true,
            secure: true
        });

        res.status(200).json({email, token}) 
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {register,login};