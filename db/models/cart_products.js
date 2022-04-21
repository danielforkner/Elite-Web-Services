// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  addProductToCart,
};

async function addProductToCart({
  cartId,
  productId,
  quantity,
  purchasedCost,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO cart_products("cartId", "productId", quantity, "purchasedCost")
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [cartId, productId, quantity, purchasedCost]
    );
    return product;
  } catch (error) {
    throw error;
  }
}