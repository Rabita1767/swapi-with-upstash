"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const character_controller_1 = __importDefault(require("../controllers/character.controller"));
const router = express_1.default.Router();
router.get("/:id", character_controller_1.default.getCharacterById);
router.get("/", character_controller_1.default.getAll);
exports.default = router;
