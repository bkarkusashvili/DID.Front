import * as React from "react";
import img from "../../../assets/cover.jpg";
import {
  Button,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@material-ui/core";

function card() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Accounting & Financial Services
        </Typography>
        <Typography variant="body2" color="text.secondary">
          domain.com
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Submit</Button>
      </CardActions>
    </Card>
  );
}

export default card;
