import { useState } from 'react';
import './Auth.css';
import AuthLogic from './AuthLogic';
import logo from '../../images/logo.svg';
import chevron from '../../images/chevron-down-icon.svg';
import supabase from '../../supabaseConfig';

function Register({ setDisplayedPage, setUserInfo }) {
	// shows error message if cannot register
	const [successFlag, setSuccessFlag] = useState(true);
	const { login } = AuthLogic();

	async function handleSubmit(event) {
		event.preventDefault();
		setSuccessFlag(true);

		const username = event.target.elements.username.value;
		const password = event.target.elements.password.value;

		const { data, error } = await supabase.from('Users').insert([
			{
				username: event.target.elements.username.value,
				password: event.target.elements.password.value,
				chats: [],
			},
		]);

		if (error === null) {
			login(username, password, setUserInfo, setDisplayedPage, setSuccessFlag);
		}
	}

	return (
		<main className="register">
			<section className="logo-display">
				<div className="img-container">
					<img src={logo} alt="" />
				</div>
				<h1>BlabberBox</h1>
				<img
					src={chevron}
					alt=""
					onClick={() => {
						window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
					}}
				/>
			</section>
			<section className="auth">
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">USERNAME</label>
						<input id="username" type="text" />
					</div>
					<div>
						<label htmlFor="password">PASSWORD</label>
						<input id="password" type="text" />
					</div>
					<button type="button" onClick={() => setDisplayedPage('Login')}>
						Back
					</button>
					<button type="submit">SUBMIT</button>
				</form>
				{successFlag ? '' : <p>An account using this username already exists</p>}
			</section>
		</main>
	);
}

export default Register;
