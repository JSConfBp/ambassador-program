import fetch from 'isomorphic-unfetch'
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: theme.mixins.gutters({
		width: '40vw',
		paddingTop: 16,
		paddingBottom: 16,
		margin: '0 auto',
		marginTop: theme.spacing.unit * 5,
		marginBottom: theme.spacing.unit * 5,
	}),
	title: {
		marginBottom: theme.spacing.unit * 3,
	},
	textField: {
		width: '100%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
	},
	button: {
		marginTop: theme.spacing.unit,
		marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
	},
	form: {
		marginTop: theme.spacing.unit * 3,
	}
});

const Index = class extends React.Component {

	constructor () {
		super()
		this.state = {
			community: {
				value: '',
				error: false
			},
			city: {
				value: '',
				error: false
			},
			email: {
				value: '',
				error: false
			},
			name: {
				value: '',
				error: false
			},
			description: {
				value: '',
				error: false
			}
		}
	}

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
	}

	submit () {
		console.log('submit');
		console.log(this.state);


		const data = Object.entries(this.state).reduce((obj, [key, val]) => {
			obj[key] = val.value

			return obj
		},{})


		fetch('https://ambassador-program-service.herokuapp.com/register', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			}
		})

	}

	onChange(prop, value) {
		this.setState({
			[prop]: {
				value,
				error: this.state[prop].error
			}
		})
	}

	onKeyUp ({ keyCode }) {
		if (13 === keyCode) this.submit()
	}

  render() {
		const { classes } = this.props;

    return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<div className={classes.paper}>
						<Typography className={classes.title} variant="headline" component="h3">
							Ambassador Program sign-up form
						</Typography>
						<Typography component="p">
							Lorem ipsum
						</Typography>

						<div className={classes.form}>

							<TextField
									required
									id="community"
									label="Community name"
									className={classes.textField}
									margin="normal"
									variant="outlined"
									error={ this.state.community.error }
									helperText="For example: JS Meetup in Rivet City"
									onKeyUp={ e => this.onKeyUp(e) }
									onChange={e => this.onChange('community', e.target.value) }
								/>

							<TextField
									required
									id="city"
									label="City & Country you located in"
									className={classes.textField}
									margin="normal"
									variant="outlined"
									error={ this.state.city.error }
									onKeyUp={ e => this.onKeyUp(e) }
									onChange={e => this.onChange('city', e.target.value) }
								/>

							<TextField
									required
									id="email"
									label="Contact Email"
									type="email"
									className={classes.textField}
									margin="normal"
									variant="outlined"
									error={ this.state.email.error }
									onKeyUp={ e => this.onKeyUp(e) }
									onChange={e => this.onChange('email', e.target.value) }
								/>

							<TextField
									id="name"
									label="Contact Name"
									className={classes.textField}
									margin="normal"
									variant="outlined"
									error={ this.state.name.error }
									onKeyUp={ e => this.onKeyUp(e) }
									onChange={e => this.onChange('name', e.target.value) }
								/>

							<TextField
									id="description"
									multiline
									rowsMax="4"
									label="About your community"
									className={classes.textField}
									margin="normal"
									variant="outlined"
									error={ this.state.description.error }
									onKeyUp={ e => this.onKeyUp(e) }
									onChange={e => this.onChange('description', e.target.value) }
								/>

								<Button
									color="primary"
									variant={'contained'}
									onClick={ e => this.submit() }
									className={classes.button}>
									Submit
								</Button>

							</div>
						</div>
					</div>
				</MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Index)