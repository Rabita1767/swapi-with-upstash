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
const common_1 = require("../utils/common");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const messages_1 = require("../utils/messages");
const character_service_1 = __importDefault(require("../services/character.service"));
class CharacterController {
    getCharacterById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield character_service_1.default.fetchCharacterById(id);
                return (0, common_1.sendResponse)(res, statusCode_1.default.OK, messages_1.Messages.CHARACTER_FETCHED_SUCCESSFULLY, data.cached, data.result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const search = req.query.search || '';
                const data = yield character_service_1.default.getAll(page, limit, search);
                return (0, common_1.sendResponse)(res, statusCode_1.default.OK, messages_1.Messages.CHARACTER_FETCHED_SUCCESSFULLY, data.cached, data.result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new CharacterController;
