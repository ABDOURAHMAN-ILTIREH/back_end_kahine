const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async(req,res) =>{
  try {
    const products = await prisma.products.findMany({
      include : {
        category:{
          select:{
            name: true
          }
        },
        comments :{
          include:true
        }
      }
    });
    res.status(200).json(products);
    
  } catch (error) {
    res.status(401).json(error)
  }
}

const getsingleProducts = async (req,res) =>{
    let bookID = req.params.id
   try {
     const book = await prisma.products.findUnique({
        where: {
            id:bookID
        },
        include : {
          category:{
            select:{
              name: true
            }
          },
          comments :{
            include: true
          }
        }
     })
     res.status(200).json(book)
    
   } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
   }
}

const createNewProducts = async (req,res) =>{
  let {name, description, price, instock, booksLanguage,categoryName} = req.body;
  try {
    const categorys = await prisma.category.findMany({
      where: { name: categoryName }
    });
    console.log(categorys);
    if (!categorys) {
      return res.status(404).json({ error: 'Category not found' });
    }  
    const products = await prisma.products.create({
        data: {
          name,description,price,instock,booksLanguage,
          category: { connect: categorys[0]}
        }
    })
    res.status(200).json({message:"successed to create a products",products})
        
    } catch (error) {
        res.status(401).json({message: "error occurated to create the products",error});
    }
}

const updateProducts = async (req,res) => {
  let bookID = req.params.id;
  let { name, description, price, instock, booksLanguage} = req.body;

  try {
    const book = await prisma.products.update({
      where:{ id:bookID },
      data:{name, description, price, instock, booksLanguage},

    });
    res.status(200).json(book);
    
  } catch (error) {
    res.status(401).json({ error: 'An error occurred while updating the product.' });
  }
}

const deleteProducts = async (req,res) =>{
  try {
    const bookID = req.params.id;
    const book = await prisma.products.delete({
      where: { id: bookID },
    });
    
    res.status(200).json({ message: 'book deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the book.' });
  }
}

module.exports = {getAllProducts, getsingleProducts, createNewProducts, updateProducts, deleteProducts}