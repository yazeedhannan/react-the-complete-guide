import {useContext, useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext);

    const noOfCartItems = cartContext.items.reduce((currentNo, item) => {
        return currentNo + item.amount
    }, 0);

    const {items} = cartContext;
    const buttonClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`;

    useEffect(() => {
        if(cartContext.items.length === 0) {
            return;
        }

        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {noOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;