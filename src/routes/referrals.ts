import express from 'express';
import * as ReferralsController from '../controllers/referrals';

const router = express.Router();

router.get('/', ReferralsController.getReferrals);

router.get('/:referralId', ReferralsController.getReferral);

router.post('/', ReferralsController.createReferral);

router.patch('/:referralId', ReferralsController.updateReferral);

router.delete('/:referralId', ReferralsController.deleteReferral);

export default router;
