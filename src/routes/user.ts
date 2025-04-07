import { registerUser } from '../controllers/user';
import { Router } from 'express';


const UserRouter = Router();

// ✅ This is the correct way
UserRouter.post('/register', registerUser);
UserRouter.post('/some-test', registerUser);
UserRouter.post('/new-route', registerUser);




export default UserRouter;
