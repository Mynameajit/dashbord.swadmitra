import { TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const AuthInput = ({ type = "text",value,onChange, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      fullWidth
        value={value}
      onChange={onChange}
      size="small"
      margin="normal"
      type={type === "password" && !show ? "password" : "text"}
      placeholder={props.placeholder}
      InputProps={{
        sx: { borderRadius: 3 },
        endAdornment:
          type === "password" && (
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
      }}
      {...props}
    />
  );
};

export default AuthInput;
