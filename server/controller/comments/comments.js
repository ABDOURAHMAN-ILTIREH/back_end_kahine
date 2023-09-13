const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create_Comment = async (req, res) =>{
    let {comment, starts, userID, productID } = req.body;
    try {
        
        const user = await prisma.users.findUnique({
            where: { id: userID }
        });
        const product = await prisma.products.findUnique({
            where:{ id: productID}
        })
        
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        
        const Comments = await prisma.comments.create({
          data: {
            comment, starts,
            users: { connect: user},
            products: { connect: product}
          }
        });
        res.status(200).json({message: "successed to create comments", Comments});
      } catch (error) {
        res.status(401).json({message:"error occuraded",error});
      }
}

const update_Comment = async (req, res) =>{
    const commentId = req.params.id;
    const {content, starts} = req.body;
    try {
        if(!commentId) {
            res.status(401).json({message:"comment id not fund"})
        }
        const comments = await prisma.comments.update({
          where: { id: commentId },
          data: { 
            comment: content, starts
           },
        });
        res.status(200).json({message: "successed to update comments", comments});
    } catch (error) {
        res.status(400).json(error);
    }
}

const delete_comment = async (req, res) =>{
    let delete_CommentID = req.params.id
   try {

    const comment_delete = await prisma.comments.delete({
        where:{id: delete_CommentID}
    })
    res.status(200).json({message: "deleting the comment successed",comment_delete});
    
   } catch (error) {
    res.status(400).json({message:"something wrong while deleting the comments"});
   }
}
module.exports = {update_Comment, create_Comment,delete_comment}