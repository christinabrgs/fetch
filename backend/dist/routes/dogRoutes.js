"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const database_1 = require("../database");
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dogId } = req.body;
        if (!dogId) {
            res.status(400).json({ error: 'Missing dogId' });
            return;
        }
        database_1.db.run('INSERT INTO dogs (id) VALUES (?)', [dogId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving dog' });
            }
            res.json({ message: 'Dog saved successfully', dogId });
        });
    }
    catch (err) {
        console.error('error saving dog', err);
        res.status(500).json({ error: 'Server error' });
    }
}));
router.get('/matched', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        database_1.db.all('SELECT id FROM dogs', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: "Error retrieving saved dogs" });
                return;
            }
            const dogIds = rows.map((row) => row.id);
            res.json({ matchedDogs: dogIds });
        });
    }
    catch (err) {
        console.error('error retrieving dog', err);
        res.status(500).json({ error: 'Server error' });
    }
}));
router.delete('/remove/:dogId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dogId } = yield req.params;
        database_1.db.run("DELETE FROM dogs WHERE id = ?", [dogId], (err) => {
            if (err) {
                res.status(500).json({ error: 'Error removing dog' });
                return;
            }
            res.json({ message: "Dog removed successfully" });
        });
    }
    catch (err) {
        console.error('error deleting dog', err);
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
