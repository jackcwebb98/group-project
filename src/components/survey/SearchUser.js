import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  card: {

    width: '90vw',
    objectFit: 'cover',
    minHeight: '100%',
    minWidth: '100%',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardMedia: {
    height: '150px',
    width: '150px'
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'row'
  },
  test: {
    display: 'flex',
  },
  button: {
    margin: '15px',
    paddingLeft: '15px',
    paddingRight: '15px'
  }
})

function SearchUser(props) {
  const { classes } = props;
  const { questionee_id: id, profile_pic, username, bio } = props

  return (
    <>
      <div style={{ padding: 5,}}>
        <Grid container spacing={40} className={classes.cardGrid}>
          <Grid item xs={10} md={6}>
            <Card className={classes.card}>
              <div className={classes.test}>
                <div>
                  <CardMedia
                    className={classes.cardMedia}
                    image={profile_pic} // eslint-disable-line max-len
                    title="Image title"
                  />
                  <Link to={`/surveypage/${id}`} className={classes.link}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    > Take Survey
                  </Button>
                  </Link>
                </div>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <div>{username}</div>
                    <div>{bio}</div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  )

}


SearchUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchUser);

