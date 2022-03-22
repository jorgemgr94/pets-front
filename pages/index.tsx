import { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LoginForm from "../src/Login/Form";

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
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

function onReceiveMessage(message: any) {
	console.log(message);
}

const getTotal = (order) =>
	order.items.reduce(
		(item, totalPrice) => totalPrice + item.unitPrice * item.units,
		0
	);

const pay = (total, invoiceInfo) => {
	const request = new PaymentService.Request({
		total,
		invoiceInfo,
	});
	const response = PaymentService.pay(request);

	sendInvoice(response.invoice);
};

const payOrder = (order) => {
	const total = getTotal(order);
	const invoiceInfo = getInvoice(order);

	pay(total, invoiceInfo);
};

const createOrder = ({ order }) => {
	checkIfAvailable(order);
	payOrder(order);
	shipOrder(order);
};

export default function Home() {
	const classes = useStyles();

	useEffect(() => {
		// if (ws) ws.close();
		let ws = new WebSocket(`wss://echo.websocket.org`);
		ws.addEventListener("message", onReceiveMessage);

		console.log("Apoco se conecto al socket?");

		return () => {
			console.log("Adios socket?");

			ws.removeEventListener("message", onReceiveMessage);
		};
	}, []);

	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<LoginForm email="jorgemgr94@hotmail.com" />
				</div>
			</Grid>
		</Grid>
	);
}
