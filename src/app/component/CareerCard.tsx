import { Box, Typography } from "@mui/material";
import GroqResponse from "../Interface/GroqResponse";
interface CareerCardProps {
  data: GroqResponse;
}

const CareerCard = ({ data }: CareerCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#181818",
        borderRadius: "16px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography sx={{ color: "#e6e6e6", fontSize: "18px" }}>
        {data.name}
      </Typography>
      <Typography sx={{ color: "#7a7a7a", fontSize: "16px" }}>
        {data.description}
      </Typography>
    </Box>
  );
};

export default CareerCard;
