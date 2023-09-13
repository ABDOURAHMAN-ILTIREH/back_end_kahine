const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateProfileUser = async(req, res) => {
    let profileID = req.params.id;
    let {phone,location} = req.body
    try {

    const profileUpdate = await prisma.profile.update({
     where: {id: profileID},
     data: {phone, location}
    })

    if(!profileID){
        return res.status(401).json({error: "profile not fund!"});
    }
    res.status(200).json(profileUpdate);

    } catch (error) {
      res.status(404).json(error);
   }
}

const createUserProfile = async (req, res) =>{
   try {
    const profile = await prisma.profile.create({
      data: req.body

    });

    res.status(200).json(profile);
    
   } catch (error) {
      res.status(404).json(error);
   }
}

module.exports = {createUserProfile,updateProfileUser}