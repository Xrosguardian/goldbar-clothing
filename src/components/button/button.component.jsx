import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";


/*
We know we have 3 styles of buttons 
default
inverted
google signin
*/

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
  };

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>(
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

  }[buttonType]
)
  
  const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType)
    return (
      <CustomButton
        {...otherProps}
      >
        {children}
      </CustomButton>
    );
  };
  
  export default Button;