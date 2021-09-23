import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Link } from "@mui/material";
import PropTypes from "prop-types";
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardAction: {
    marginTop: "auto",
  },
});

function ArticleCard({ rss = "" }) {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const getData = (requestURL) => {
    fetch(requestURL)
      .then((response) => response.json())
      .then((res) => {
        let newData = [];
        res.forEach((d) => {
          let tempData = {};
          tempData["thumbnail"] = d.thumbnail;
          tempData["title"] = d.title;
          tempData["categories"] = d.categories;
          tempData["pubDate"] = d.pubDate;
          tempData["link"] = d.link;
          newData.push(tempData);
        });
        // setData(newData);
        console.log(newData);
      });
  };
  useEffect(() => {
    if (rss !== "") {
      getData(rss);
    }
  }, [rss]);
  return (
    <Grid container spacing={3}>
      {data.map((d) => (
        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <Link href={d.link}>
                <CardMedia
                  component="img"
                  alt={d.title}
                  height="150"
                  image={d.thumbnail}
                  title={d.title}
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {d.pubDate}
                </Typography>

                <Link href={d.link}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {d.title}
                  </Typography>
                </Link>
                <Typography variant="body2" color="textSecondary" component="p">
                  {d.categories.map((category) => "#" + category + " ")}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
ArticleCard.propTypes = {
  rss: PropTypes.string,
};
export default ArticleCard;
