import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Chip, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface TextfieldWithTooltipProps {
  defaultValue?: string[];
  label: string;
  placeholder: string;
  handleChange: (value: string[]) => void;
}

export const TextfieldWithTooltip = ({
  defaultValue,
  placeholder,
  handleChange,
  label,
}: TextfieldWithTooltipProps) => {
  const [value, setValue] = useState(defaultValue ?? []);
  const handleChipDelete = (index: number) => {
    setValue((latestValue) => {
      const data = [...latestValue];
      data.splice(index, 1);
      return data;
    });
  };
  const handleSubmit = (formData: any) => {
    const textfieldValue = formData.get("textfield");
    setValue((latestValue) => [...latestValue, textfieldValue]);
    toast(`Add ${textfieldValue}`);
  };
  useEffect(() => {
    handleChange(value);
  }, [value]);

  return (
    <Box>
      <form action={handleSubmit}>
        <Typography sx={{ color: "#595959", fontSize: "15px", mb: 1 }}>
          {label}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            name='textfield'
            required
            placeholder={placeholder}
            sx={{
              width: "300px",
              border: "2px solid #3c3c3c4a",
              borderRadius: "8px",

              "& .Mui-focused": {
                borderColor: "#3c3c3c", // Apply the primary color on focus
              },

              input: {
                "&::placeholder": {
                  color: "#595959",
                },
                color: "white", // if you also want to change the color of the input, this is the prop you'd use
              },
            }}
          />
          <IconButton type='submit' sx={{ backgroundColor: "#3c3c3c4a" }}>
            <AddRoundedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </form>
      {value.map((each, index) => (
        <Chip
          label={each}
          key={index}
          variant='outlined'
          onDelete={() => {
            handleChipDelete(index);
          }}
        />
      ))}
      <Toaster />
    </Box>
  );
};
