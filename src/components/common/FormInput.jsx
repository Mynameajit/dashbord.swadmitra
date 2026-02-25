import {
  Stack,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";

/* ================= Animation ================= */
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: d },
  }),
};

const MTextField = motion(TextField);
const MTypography = motion(Typography);

const FormInput = ({
  label,
  placeholder,
  value = "",
  onChange,
  type = "text",
  width = "100%",
  custom = 0.2,
  select = false,
  options = [],
  isMobileNo = false,
  onlyRead = false,
    name 
}) => {
  return (
    <Stack width={width} spacing={0.7}>
      {/* Label */}
      <MTypography
        variant="body2"
        fontWeight={600}
        initial="hidden"
        animate="visible"
        custom={custom - 0.05}
        variants={variants}
      >
        {label}
      </MTypography>

      {/* Input */}
      <MTextField
        fullWidth
        size="small"          // 🔥 small → medium
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={onlyRead}
        select={select}
        initial="hidden"
        animate="visible"
        custom={custom}
        variants={variants}
        name={name}
        SelectProps={
          select
            ? {
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) return placeholder;
                  return (
                    options.find((o) => o.value === selected)?.label ||
                    selected
                  );
                },
              }
            : undefined
        }
        InputProps={
          isMobileNo
            ? {
                startAdornment: (
                  <InputAdornment position="start" sx={{ fontSize: 14 }}>
                    +91
                  </InputAdornment>
                ),
              }
            : undefined
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            minHeight: "40px",          // 🔥 height increase
          },
          input: {
            fontSize: "14px",
            padding: "11px 14px",       // 🔥 more padding
            "&::placeholder": {
              fontSize: "13px",
              opacity: 0.65,
            },
            "&::-webkit-inner-spin-button": {
              display: "none",
            },
            "&[type=number]": {
              MozAppearance: "textfield",
            },
          },
        }}
      >
        {select &&
          options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </MTextField>
    </Stack>
  );
};

export default FormInput;
