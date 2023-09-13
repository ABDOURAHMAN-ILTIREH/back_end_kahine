const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { hash} = require("../../utils/password.crypt");

const createUserProfile = () =>{

}


const updateUser = async (req, res) =>{
    const userId = req.params.id;
    let {name, email, password} = req.body;

    try {
        let hashPassword = hash(password)
        const users = await prisma.users.update({
            where: { id: userId },
            data: { name:name, email:email, password:hashPassword },
        });
        
        res.json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
}

module.exports = updateUser;