import './App.css';
import { useEffect, useState } from 'react';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Main from './Pages/Main/Main';
import HelperFunctions from './HelperFunctions';

// controls which component (login/register/main) to display according to displayedPage
// gets userInfo from Login, then passes it into Main
function App() {
	const { updateUserInfoHelper, updateChatsInfoHelper } = HelperFunctions();
	const [displayedPage, setDisplayedPage] = useState('Login'); // sets current page display
	const [userInfo, setUserInfo] = useState(); // user's info
	const [chatsInfo, setChatsInfo] = useState([]); // info for all of user's chats

	async function updateUserInfo() {
		updateUserInfoHelper(userInfo.username, userInfo.password, setUserInfo);
	}

	async function updateChatsInfo(f) {
		updateChatsInfoHelper(userInfo, setChatsInfo, f);
	}

	useEffect(() => {
		if (localStorage.userInfo !== undefined) {
			setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
			setDisplayedPage('Main');
		}
	}, []);

	useEffect(() => {
		if (userInfo) {
			updateChatsInfo(0);
		}
	}, [userInfo]);

	// for user login and sets userInfo
	if (displayedPage === 'Login') {
		return <Login setDisplayedPage={setDisplayedPage} setUserInfo={setUserInfo} />;
	}

	// for registering users
	if (displayedPage === 'Register') {
		return <Register setDisplayedPage={setDisplayedPage} setUserInfo={setUserInfo} />;
	}

	// after logging in, displayedPage = Main, returns the actual chatting app
	if (displayedPage === 'Main') {
		return (
			<Main
				userInfo={userInfo}
				setUserInfo={setUserInfo}
				setDisplayedPage={setDisplayedPage}
				updateUserInfo={updateUserInfo}
				chatsInfo={chatsInfo}
				updateChatsInfo={updateChatsInfo}
			/>
		);
	}
}

export default App;
