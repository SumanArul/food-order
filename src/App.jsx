import { Alert, Button, Grid, Snackbar } from "@mui/material";
import "./App.css";
import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";
import { useEffect, useState } from "react";
import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cart from "./Components/Cart";
import { ToggleButtonGroup, ToggleButton, styled } from "@mui/material";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.text.main,
    },
  },
  ":hover": {
    color: "white",
  },
}));

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [nopen, setNopen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] =useState([]);

  const handleIncrease = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrease = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
    }
    setCartItems(updatedCartItems);
  };

  const handleRemove = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const calculateUnitTotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateUnitTotal(item),
      0
    );
  };

  const handleNotification = () => {
    setNopen((prev) => !prev);
  };

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../Data/products.json");
        const data = await response.json();
        let filteredData = data;
        if (category !== "all") {
          filteredData = data.filter(
            (product) => product.category === category
          );
        }
        if (searchQuery !== "") {
          filteredData = filteredData.filter((product) =>
            product.name
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase())
          );
        }
        setProducts(filteredData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [category, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../Data/categories.json");
      const data = await response.json();

      setCategories(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Snackbar
        open={nopen}
        autoHideDuration={2000}
        onClose={handleNotification}
        style={{ marginTop: "40px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully added to cart!
        </Alert>
      </Snackbar>
      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={(e) => handleCategoryChange(e.target.value)}
        aria-label="category"
      >
        {categories.map((category) => (
          <StyledToggleButton
            key={category.value}
            value={category.value}
            aria-label={category.name}
          >
            {category.name}
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>

      <Navbar setSearchQuery={setSearchQuery} />

      <Grid container spacing={0}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
            <ProductCard
              cart={cartItems}
              addToCart={setCartItems}
              image={product.image}
              name={product.name}
              price={product.price}
              isVegetarian={product.isVegetarian}
              handleNotification={handleNotification}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={isCartOpen}
        onClose={handleCartToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Your Cart</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <DialogContentText id="alert-dialog-description">
              Your cart is empty.
            </DialogContentText>
          ) : (
            <>
              <Cart
                cartItems={cartItems}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                handleRemove={handleRemove}
                calculateUnitTotal={calculateUnitTotal}
              />
              <div>
                <center>
                  <strong>Total: ${calculateTotal()}</strong>
                </center>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCartToggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCartToggle}
        style={{ position: "fixed", bottom: "30px", right: "30px" }}
      >
        {isCartOpen ? <RemoveShoppingCart /> : <ShoppingCart />}
      </Button>
    </>
  );
}

export default App;
