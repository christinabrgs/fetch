"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const dogRoutes_1 = __importDefault(require("./routes/dogRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use('/dogs', dogRoutes_1.default);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => { console.log(`server running on port ${PORT}`); });
