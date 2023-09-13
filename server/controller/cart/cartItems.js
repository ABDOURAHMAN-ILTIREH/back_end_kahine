const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCartItems = async (req, res) => {
   try {
    const cart = await prisma.cart.findMany({
        include:{
          products:{
            select:{
              name: true
            }
          },
          users :{
            select:{
                name:true
            }
          }
        }
    });

    res.status(200).json({message:"successed to get all cartItems",cart});

    } catch (error) {
       res.status(404).json({message:"error occured",error});
    }
}


const createCartItems = async (req, res) =>{
    let {usersID, productID, quantity,productTotalsPrice} = req.body;
  try {

    let user = await prisma.users.findUnique({
        where: {id: usersID}
    });
    
    if(!user){
        res.status(401).json({message:"user not fund for cart add products!"});
    }

    let product = await prisma.products.findUnique({
        where: {id: productID}
    });

    if(!product){
        res.status(401).json({message:"products not fund for cart add products!"});
    }

    if(product.instock <= 0){
        return res.status(401).json({message : "the product is invalible in the stock anymore!"});
    }

    let existingCartItem = await prisma.cart.findFirst({
        where:{usersID, productID}
    });

    if(existingCartItem){
    
        let updateQuantity = existingCartItem.quantity + quantity;
        let productPrice = updateQuantity * product.price;
        cartItem = await prisma.cart.update({
            where: {id: existingCartItem.id},
            data:{ 
                quantity: updateQuantity,
                productTotalsPrice: productPrice,
                users: { connect: user},
                products: { connect: product}
            }
        });
    }

    else{

        // If it's not in the cart, create a new cart item
        let productPrice = product.price * quantity;
        cartItem = await prisma.cart.create({
            data: {
                users: { connect: user},
                products: { connect: product},
                quantity,
                productTotalsPrice: productPrice,
            }
        }
        );  
    }

    // Decrement the product quantity
    await prisma.products.update({
        where: { id: productID },
        data: { instock: product.instock - quantity },
    })
  
    res.status(200).json({message:"success to create a new cartItems", cartItem});

    }catch (error) {
    res.status(404).json({message:"error occured", error})
    }
}

const deleteSingleCartItems = async (req, res)=>{
    let cartItemsID = req.params.id;
    let {productID} = req.body;
  try {

    let product = await prisma.products.findUnique({
        where: {id: productID}
    });

    if(!product){
        res.status(401).json({message:"products not fund for cart add products!"});
    }
    const cartOption = await prisma.cart.findUnique({
        where: {id: cartItemsID}
    })

    // return the orginal product quantity
    await prisma.products.update({
       where: { id: productID },
       data: { instock: product.instock + cartOption.quantity}
    })

    const cart = await prisma.cart.delete({
        where:{id:cartItemsID}
    });

    res.status(200).json({message:"successed to delete the cart", cart});

  } catch (error) {
    res.status(404).json({message: "error occured!",error});
  }
}

const deleteAllCartItems = async (req, res) =>{
   try {
    const cart = await prisma.cart.delete({});
    
    res.status(200).json({message:"successed to delete all  cart", cart});
   } catch (error) {
    res.status(404).json({message: "error occured!", error});
   }
}

module.exports = { createCartItems, deleteSingleCartItems , getCartItems};
