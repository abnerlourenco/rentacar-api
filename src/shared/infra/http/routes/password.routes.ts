import { Router } from 'express';

import { SendForgotPassowordMailController } from '../../../../modules/accounts/useCases/sendForgotPassowordMail/SendForgotPassowordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPassowordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordRoutes };
