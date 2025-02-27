// Online Shopping Cart System
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to get user input
function question(query) {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}

// Initial products array
let cart = [
  { productName: "Laptop", price: 999.99, quantity: 1 },
  { productName: "Headphones", price: 89.99, quantity: 2 },
  { productName: "Mouse", price: 29.99, quantity: 1 }
];

// Add Product: Function to add a new product to the cart
const addProduct = (cart, productName, price, quantity) => {
  // Convert to numbers to ensure proper calculations
  price = parseFloat(price);
  quantity = parseInt(quantity);
  
  const existingProductIndex = cart.findIndex(item => item.productName === productName);
  
  if (existingProductIndex !== -1) {
    return cart.map((item, index) => 
      index === existingProductIndex 
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    return [...cart, { productName, price, quantity }];
  }
};

// Calculate Total: Function to calculate total cost using reduce()
const calculateTotal = cart => {
  return cart.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
};

// Remove Product: Arrow function to remove a product by name
const removeProduct = (cart, productName) => {
  return cart.filter(product => product.productName !== productName);
};

// Display cart summary using destructuring and template literals
const displayCart = cart => {
  if (cart.length === 0) {
    console.log("Your cart is empty");
    return;
  }
  
  console.log("\nYour Shopping Cart:");
  cart.forEach(product => {
    const { productName, price, quantity } = product;
    console.log(`Product: ${productName}, Price: $${price.toFixed(2)}, Quantity: ${quantity}`);
  });
  console.log(`Total: $${calculateTotal(cart).toFixed(2)}\n`);
};

// Function to get user input for adding a product
const getProductInputFromUser = async () => {
  const productName = await question("Enter product name: ");
  if (!productName) return null; // User cancelled
  
  const priceStr = await question("Enter product price: ");
  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) {
    console.log("Invalid price. Please enter a positive number.");
    return null;
  }
  
  const quantityStr = await question("Enter quantity: ");
  const quantity = parseInt(quantityStr);
  if (isNaN(quantity) || quantity <= 0) {
    console.log("Invalid quantity. Please enter a positive number.");
    return null;
  }
  
  return { productName, price, quantity };
};

// Function to ask user which product to remove
const getProductToRemove = async () => {
  return await question("Enter the name of the product you want to remove: ");
};

// Main function to handle user interaction
const manageShoppingCart = async () => {
  let running = true;
  
  while (running) {
    console.log("\nShopping Cart Menu:");
    console.log("1: View Cart");
    console.log("2: Add Product");
    console.log("3: Remove Product");
    console.log("4: Exit");
    
    const action = await question("What would you like to do? ");
    
    switch (action) {
      case "1": // View Cart
        displayCart(cart);
        break;
        
      case "2": // Add Product
        const productData = await getProductInputFromUser();
        if (productData) {
          const { productName, price, quantity } = productData;
          cart = addProduct(cart, productName, price, quantity);
          console.log(`Added ${quantity} ${productName}(s) to cart.`);
          displayCart(cart);
        }
        break;
        
      case "3": // Remove Product
        if (cart.length === 0) {
          console.log("Your cart is empty. Nothing to remove.");
          break;
        }
        
        const productToRemove = await getProductToRemove();
        if (productToRemove) {
          const oldCartLength = cart.length;
          cart = removeProduct(cart, productToRemove);
          
          if (cart.length < oldCartLength) {
            console.log(`Removed ${productToRemove} from cart.`);
          } else {
            console.log(`Product "${productToRemove}" not found in cart.`);
          }
          
          displayCart(cart);
        }
        break;
        
      case "4": // Exit
        running = false;
        console.log("Thank you for shopping!");
        rl.close();
        break;
        
      default:
        console.log("Invalid option. Please try again.");
    }
  }
};

// Start the shopping cart application
manageShoppingCart();