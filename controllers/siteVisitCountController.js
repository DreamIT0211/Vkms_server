// controllers/siteVisitCountController.js

const { sql, poolPromise } = require("../config/db");
const SiteVisitCount = require("../models/siteVisitCount");

class SiteVisitCountController {
    async getVisitCount(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query("SELECT VisitCount FROM SiteVisitCount");
            if (result.recordset.length > 0) {
                const visitCount = result.recordset[0].VisitCount;
                res.json(new SiteVisitCount(visitCount));
            } else {
                res.status(404).send('No visit count found.');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async incrementVisitCount(req, res) {
        try {
            const pool = await poolPromise;
            await pool.request().query("UPDATE SiteVisitCount SET VisitCount = VisitCount + 1");
            const result = await pool.request().query("SELECT VisitCount FROM SiteVisitCount");
            const visitCount = result.recordset[0].VisitCount;
            res.json(new SiteVisitCount(visitCount));
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new SiteVisitCountController();
