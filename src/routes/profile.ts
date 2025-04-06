
import { getProfile } from '../controllers/profile';
import { Router } from 'express';

const ProfileRouter = Router();

ProfileRouter.get('/', getProfile);

export default ProfileRouter;
