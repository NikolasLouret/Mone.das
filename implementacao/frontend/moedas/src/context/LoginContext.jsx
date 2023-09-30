import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginContext = createContext()

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const url = 'http://localhost:3000'

	useEffect(() => {
		const recoveredUser = JSON.parse(localStorage.getItem('userLAB'))

		if (recoveredUser) {
			fetch(`${url}/api/${recoveredUser.tipo.toLowerCase()}/pessoa/${recoveredUser._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					setUser(data)
					setLoading(false)
				})
		} else setLoading(false)
	}, [])

	const loginCreateAccount = async loginUser => {
		console.log(loginUser)
		await fetch(`${url}/api/${loginUser.tipo.toLowerCase()}/pessoa/${loginUser.pessoa}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => {
				setUser(data)
				setLoading(false)
				navigate('/')
			})
	}

	const login = async formData => {
		let data

		if (!formData) {
			return
		}

		const objectForm = Object.fromEntries(formData)

		await fetch(`${url}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(objectForm),
		})
			.then(resp => resp.json())
			.then(respJson => {
				data = respJson
			})

		if (data.status === 201) {
			const user = data.user
			console.log(user)
			localStorage.setItem('userLAB', JSON.stringify(user))

			await fetch(`${url}/api/${user.tipo.toLowerCase()}/pessoa/${user._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(resp => resp.json())
				.then(data => {
					setUser(data)
					setLoading(false)
					navigate('/')
				})
			return
		}

		return data
	}

	const logout = () => {
		localStorage.removeItem('userLAB')

		setUser(null)
		navigate('/login')
	}

	const updateUser = newUser => {
		setUser(newUser)
	}

	return (
		<LoginContext.Provider
			value={{
				authenticated: !!user,
				user,
				loading,
				login,
				logout,
				updateUser,
				loginCreateAccount,
			}}>
			{children}
		</LoginContext.Provider>
	)
}
