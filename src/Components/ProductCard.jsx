import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Button } from "@mui/material";

const CardWrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  maxWidth: 300,
  margin: theme.spacing(2),
}));

const ImageWrapper = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  marginBottom: theme.spacing(1),
}));

const ProductInfoWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const NameWrapper = styled(Typography)(() => ({
  fontWeight: "bold",
}));

const IconWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

const PriceWrapper = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: "bold",
}));

const VegIconWrapper = styled(FiberManualRecordIcon)(({ theme }) => ({
  color: theme.palette.success.main,
  fontSize: "1.2rem",
  marginRight: theme.spacing(0.5),
}));

const NonVegIconWrapper = styled(FiberManualRecordIcon)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "1.2rem",
  marginRight: theme.spacing(0.5),
}));

export default function ProductCard({
  cart,
  addToCart,
  image,
  name,
  price,
  isVegetarian,
  handleNotification,
}) {
  const handleAddToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.name === name);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      addToCart(updatedCart);
    } else {
      addToCart([...cart, { name, price, isVegetarian, quantity: 1 }]);
    }
    handleNotification((prev) => !prev);
  };

  return (
    <CardWrapper>
      <ImageWrapper src={image} alt={name} />
      <ProductInfoWrapper>
        <NameWrapper
          style={{ height: "3rem", overflow: "hidden" }}
          variant="subtitle1"
          component="div"
        >
          {name}
        </NameWrapper>
        <IconWrapper>
          {isVegetarian ? (
            <>
              <VegIconWrapper />
            </>
          ) : (
            <>
              <NonVegIconWrapper />
            </>
          )}
        </IconWrapper>
      </ProductInfoWrapper>
      <PriceWrapper variant="subtitle2" component="div">
        &#8377;{price}
      </PriceWrapper>
      <Box mt={2}>
        <Button onClick={handleAddToCart} variant="contained" color="success">
          Add to Cart
          <ShoppingCartIcon />
        </Button>
      </Box>
    </CardWrapper>
  );
}
