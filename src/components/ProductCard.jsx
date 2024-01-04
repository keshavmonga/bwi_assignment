import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const ProductCard = ({ id, title, description, price, url }) => {
  const temp = title.split(' ');
  temp.length = 2;
  const ftitle = temp.join(' ')
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const bool = cart?.items?.findIndex(f => f.id == id);
  const inCart = bool > -1
    ? true
    : false;
  const quantity = bool > -1
    ? cart?.items[bool]?.quantity
    : 0;

  const handleRemove = () => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart', {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, description, url }));
    toast.success('Item added to cart', {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }

  return (
    <>
      <Card sx={{ width: '20%', maxHeight: '330px', marginBotton: '1rem' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={url}
        />
        <CardContent>
          <Typography  variant="body1" component="div">
            {ftitle}
          </Typography>
          <Typography gutterBottom variant="caption" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2">
            Rs.{price}
          </Typography>
        </CardContent>
        <CardActions>
          {inCart
            ? (
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleRemove}>-</Button>
                <p>{quantity}</p>
                <Button onClick={handleAdd}>+</Button>
              </div>
            )
            : (<Button onClick={handleAdd}>Add to Cart</Button>)
          }
        </CardActions>
      </Card>
    </>
  )
}

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  url: PropTypes.string
};
