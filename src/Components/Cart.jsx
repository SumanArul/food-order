import {
  AdUnits,
  AddShoppingCart,
  Delete,
  DeleteOutline   ,
  RemoveShoppingCart,
} from "@mui/icons-material";
import { styled, Grid, Button } from "@mui/material";

const StyledTable = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
  "& th": {
    padding: "12px 16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#333",
  },
  "& td": {
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
    color: "#fff",
    backgroundColor: "#444",
  },
  "& tbody tr:last-child td": {
    borderBottom: "none",
  },
});

const StyledButton = styled(Button)({
  color: "#fff",
  borderColor: "#fff",
});

const Cart = ({
  cartItems,
  handleDecrease,
  handleIncrease,
  handleRemove,
  calculateUnitTotal,
}) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>&#8377;{item.price}</td>
            <td>{item.quantity}</td>
            <td>&#8377;{calculateUnitTotal(item)}</td>
            <td>
              <Grid container>
                <Grid item xs={4}>
                  <StyledButton onClick={() => handleDecrease(index)}>
                    <RemoveShoppingCart />
                  </StyledButton>
                </Grid>
                <Grid item xs={4}>
                  <StyledButton onClick={() => handleIncrease(index)}>
                    <AddShoppingCart />
                  </StyledButton>
                </Grid>
                <Grid item xs={4}>
                  <StyledButton onClick={() => handleRemove(index)}>
                    <Delete />
                  </StyledButton>
                </Grid>
              </Grid>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Cart;
