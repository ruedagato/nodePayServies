// ----------------------------------------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------------------------------------
import { Router } from 'express'
import { User } from '../models/user.models'
import { IRespond, loginAdmin } from '../config'

// ----------------------------------------------------------------------------------------------------------------
// Attributes
// ----------------------------------------------------------------------------------------------------------------

const index: Router = Router()

// ----------------------------------------------------------------------------------------------------------------
// Routers
// ----------------------------------------------------------------------------------------------------------------

index.get('/', (req, res, nex) => {
	res.send('hello index 9')
})

index.post('/newUser', loginAdmin, (req, res, next) => {
	const { email, password } = req.body
	if (email == null || password == null) next('email and password are required')
	else
		User.createUser(email, password)
			.then((uid) => {
				const resp: IRespond = {
					complete: true,
					data: { uid },
					error: null
				}
				res.status(200).json(resp)
			})
			.catch((err) => next(err))
})

export default index

// ----------------------------------------------------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------------------------------------------------
interface DataPayU {
	// Merchant data when
	merchant: {
		apiKey: string
		apiLogin: string
	}
	accountId: number
	merchantId: number
	url: string
	urlReport: string
	respond: string
}
