const productsRouter = require("express").Router();
const { Product } = require("../db/models");
const { requireUser } = require("./utils");

productsRouter.use("/", (req, res, next) => {
  console.log("A request is being made to /products");

  next();
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const publicProducts = await Product.getPublicProducts();

    res.send(publicProducts);
  } catch ({ name, message }) {
    console.log("Yes we are here");
    next({ name, message });
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const publicProducts = await Product.getPublicProducts();

    res.send(publicProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post("/", requireUser, async (req, res, next) => {
  // const creatorId = req.user.id;
  const { typeId, name, description, price, isPublic } = req.body;

  const productsData = {
    // creatorId,
    typeId,
    name,
    description,
    price,
    isPublic,
  };

  try {
    const product = await Product.createProduct(productsData);

    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  // const creatorId = req.user.id;
  const { typeId, name, description, price, isPublic } = req.body;

  const updateFields = {
    // creatorId,
    id: productId,
    typeId,
    name,
    description,
    price,
    isPublic,
  };

  try {
    // const originalProduct = await Product.getProductById(productId);

    // if (originalProduct.creatorId === req.user.id) {
    const updatedProduct = await Product.updateProduct(updateFields);

    res.send(updatedProduct);
    // } else {
    //   next({
    //     name: "UnauthorizedUserError",
    //     message: "You cannot update a product that is not yours",
    //   });
    // }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.delete("/:productId", requireUser, async (req, res, next) => {
  try {
    const deletedProduct = await Product.deleteProduct(req.params);

    res.send(deletedProduct)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/types", async (req, res, next) => {
  try {
    const types = await Product.getAllTypes();

    res.send(types);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
