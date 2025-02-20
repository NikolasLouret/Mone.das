//* components
import { LoginContext } from '../../context/LoginContext'

//* react
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//* css
import './Perfil.css'
import PerfilProfessor from './components/PerfilProfessor'
import PerfilEmpresa from './components/PerfilEmpresa'
import PerfilAluno from './components/PerfilAluno'

const Perfil = () => {
	const url = 'http://localhost:3000/api'

	const { user, updateUser, logout } = useContext(LoginContext)
	const navigate = useNavigate()

	const [userType, setUserType] = useState('')
	const [instituicoes, setInstituicoes] = useState([])
	const [cursos, setCursos] = useState([])
	const [departamentos, setDepartamentos] = useState([])
	const [instituicao, setInstituicao] = useState()
	const [id, setId] = useState('')

	useEffect(() => {
		setId(user._id)
		setUserType(user.pessoa.tipo)

		if (user.pessoa.tipo !== 'Empresa') {
			setInstituicao(user.instituicaoEnsino)
			setCursos(user.instituicaoEnsino.cursos)
			setDepartamentos(user.instituicaoEnsino.departamentos)
		}

		fetch(`${url}/instituicaoEnsino`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}

				throw response
			})
			.then(data => setInstituicoes(data))
	}, [navigate, user])

	const handleChangeCourse = selectedId => {
		if (selectedId !== '0') {
			const instituicaoCursos = instituicoes.find(instituicao => instituicao._id === selectedId)

			setInstituicao(instituicaoCursos)
			setCursos(instituicaoCursos.cursos)
		} else setCursos([])
	}

	const handleDeleteAccount = () => {
		fetch(`${url}/${userType}?id=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(resp => resp.json())
			.then(data => {
				alert(data.msg)

				logout()
				navigate('/cadastrar')
			})
			.catch(err => {
				console.error(err)
				alert('Não foi possível apagar a conta.')
			})
	}

	const handleSubmit = formData => {
		if (!formData) {
			return
		}

		const objectForm = Object.fromEntries(formData)

		fetch(`${url}/${userType.toLowerCase()}?id=${user._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(objectForm),
		})
			.then(resp => resp.json())
			.then(data => {
				alert(data.msg)
				console.log(data.response)
				updateUser(data.response)

				navigate('/perfil')
			})
			.catch(err => {
				console.error(err)
				alert('Não foi possível editar a conta.')
			})
	}

	return (
		<div className='perfil-body'>
			{userType === 'Aluno' ? (
				<PerfilAluno
					user={user}
					cursos={cursos}
					instituicoes={instituicoes}
					instituicao={instituicao}
					onChange={handleChangeCourse}
					onSubmit={handleSubmit}
					deleteAccount={handleDeleteAccount}
				/>
			) : userType === 'Professor' ? (
				<PerfilProfessor
					user={user}
					cursos={cursos}
					instituicoes={instituicoes}
					instituicao={instituicao}
					onChange={handleChangeCourse}
					onSubmit={handleSubmit}
					departamentos={departamentos}
					deleteAccount={handleDeleteAccount}
				/>
			) : (
				userType === 'Empresa' && (
					<PerfilEmpresa user={user} onSubmit={handleSubmit} deleteAccount={handleDeleteAccount} />
				)
			)}
		</div>
	)
}

export default Perfil
