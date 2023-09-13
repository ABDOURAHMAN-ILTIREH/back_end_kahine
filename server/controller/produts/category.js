const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCategory = async (req, res) =>{
   try {
      const category = await prisma.category.findMany();
      res.status(200).json(category);
   } catch (error) {
      res.status(401).json(error);
   }
}
const getCategoryByName = async (req, res) =>{
    let category_Name = req.body;
   try {
       if (!category) {
         return res.status(404).json({ error: 'Category not found' });
       }
      const category = await prisma.category.findUnique({
        where: { name: category_Name }
      });

      res.status(200).json(category);
   } catch (error) {
       res.status(401).json(error);
   }
}

const getSingleCategory = async (req, res) =>{
    const categoryID = req.params.id
    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryID }
          });
      
          if (!category) {
            return res.status(404).json({ error: 'Category not found' });
          }
          res.status(200).json(category);
       } catch (error) {
           res.status(401).json(error);
       }
}

const createNewCategory = async (req, res) =>{
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
        data: { name:name }
    });

     res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
}

const deleteCategory = async (req, res) =>{
    const categoryID = req.params.id
    try {
        const category = await prisma.category.delete({
            where : {id : categoryID}
        })

        if (!category) {
            return res.status(404).json({ error: 'Category not found to delete' });
        }
        res.status(200).json(categoryID)

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const updateCategory = async (req, res)=>{
    const categoryID = req.params.id
    try {
        const category = await prisma.category.update({
            where: {id : categoryID},
            data : req.body 
        })

        if (!category) {
            return res.status(404).json({ error: 'Category not found to update' });
        }
        res.status(200).json(categoryID)

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {getAllCategory,getSingleCategory,createNewCategory,deleteCategory,updateCategory,getCategoryByName}
