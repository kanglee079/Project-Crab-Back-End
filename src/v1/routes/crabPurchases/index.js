"use strict";

const express = require('express');
const router = express.Router();
const CrabPurchaseController = require('../../controllers/crabPurchase.controller');
const asyncHandle = require('../../utils/asyncHandle');
const { checkAuthentication, checkIsAdmin, checkOwnership } = require('../../middlewares/index');
const CrabPurchase = require('../../models/crabPurchase.model');

// CRUD hóa đơn mua cua
router.post('/', checkAuthentication, asyncHandle(CrabPurchaseController.createCrabPurchase));
router.get('/', checkAuthentication, asyncHandle(CrabPurchaseController.getAllCrabPurchases));
router.get('/:id', checkAuthentication, checkOwnership(CrabPurchase, 'id'), asyncHandle(CrabPurchaseController.getCrabPurchaseById));
router.put('/:id', checkAuthentication, checkOwnership(CrabPurchase, 'id'), asyncHandle(CrabPurchaseController.updateCrabPurchase));
router.delete('/:id', checkAuthentication, checkOwnership(CrabPurchase, 'id'), asyncHandle(CrabPurchaseController.deleteCrabPurchase));

// Các route tổng hợp và báo cáo
router.get('/depot/:depotId/date/:date', checkAuthentication, asyncHandle(CrabPurchaseController.getCrabPurchasesByDepotAndDate));
router.get('/depot/:depotId/trader/:traderId', checkAuthentication, asyncHandle(CrabPurchaseController.getCrabPurchasesByDepotAndTrader));
router.get('/depot/:depotId/month/:month/year/:year', checkAuthentication, asyncHandle(CrabPurchaseController.getCrabPurchasesByDepotAndMonth));
router.get('/depot/:depotId/year/:year', checkAuthentication, asyncHandle(CrabPurchaseController.getCrabPurchasesByDepotAndYear));
router.get('/all/by-depot', checkAuthentication, checkIsAdmin, asyncHandle(CrabPurchaseController.getAllCrabPurchasesByDepot));
router.post('/depot/:depotId/summary/today', checkAuthentication, asyncHandle(CrabPurchaseController.createDailySummaryByDepotToday));
router.get('/depot/:depotId/summary/today', checkAuthentication, asyncHandle(CrabPurchaseController.getDailySummaryByDepotToday));
router.get('/depot/:depotId/summaries', checkAuthentication, asyncHandle(CrabPurchaseController.getAllDailySummariesByDepot));
router.get('/summaries/all', checkAuthentication, checkIsAdmin, asyncHandle(CrabPurchaseController.getAllDailySummariesForAdmin));
router.get('/summaries/date/:date', checkAuthentication, checkIsAdmin, asyncHandle(CrabPurchaseController.getDailySummariesByDateForAdmin));

module.exports = router;
