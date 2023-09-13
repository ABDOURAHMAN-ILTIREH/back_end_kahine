const { hash} = require("../../utils/password.crypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// get all user endpoint
const getAllUser = async (req,res) => {
    try {
        const users = await prisma.users.findMany({
          include :{
            profile:{
              include: true
            }
          }
        });
        res.json(users);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
      }
}
//get unique user endpoint
const getUniqueUser = async (req, res) =>{
    const userId = req.params.id;
    try {
        const user = await prisma.users.findUnique({
         where: {id: userId},
         include :{
          profile:{
            include: true
          }
        }
       });
       res.status(200).json(user);
    } catch (error) {
      res.status(401).json({error: error.message});
    }
}

//upadate user endpoint
const updateUser = async (req, res) =>{
  
  try {
       const userId = req.params.id;
       let {name, email, password,role} = req.body;

       
       if(!name || !email || !password){
        throw new Error('You must provide an name and a email and a password.');
       }

        let hashPassword = hash(password)
        const users = await prisma.users.update({
            where: { id: userId },
            data: { name, email , password:hashPassword ,role},
        });
        
        res.json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
}
// delete User endpoint

const deleteUser = async (req, res) =>{
    const userId = req.params.id;
    try {
      const deletedUser = await prisma.users.delete({
        where: { id: userId },
      });
      
      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
}


module.exports = { getUniqueUser,getAllUser,updateUser,deleteUser}