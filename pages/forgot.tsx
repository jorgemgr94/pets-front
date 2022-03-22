import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage:
			"url(https://i.pinimg.com/originals/a2/f4/7b/a2f47b5e528f371394a8fa696ad7d3f4.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	}
}));

export default function Home() {
	const classes = useStyles();
	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Link href="/" variant="body2">
						Index
					</Link>
				</div>
			</Grid>
		</Grid>
	);
}
