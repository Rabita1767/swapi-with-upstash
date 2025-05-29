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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const appError_1 = __importDefault(require("../utils/appError"));
const messages_1 = require("../utils/messages");
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const cacheHelper_1 = require("../cache/cacheHelper");
dotenv_1.default.config();
const BASE_URL = process.env.BASE_URL || 'https://swapi.dev/api';
class CharacterService {
    fetchCharacters() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            var _a;
            const response = yield axios_1.default.get(`${BASE_URL}/people?page=${page}&limit=${limit}`);
            if (!response) {
                throw new appError_1.default(messages_1.Messages.FAILED_TO_FETCH_CHARACTERS, statusCode_1.default.BAD_GATEWAY);
            }
            return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results;
        });
    }
    fetchCharacterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = `character:${id}`;
            const cached = yield (0, cacheHelper_1.getCache)(cacheKey);
            if (cached) {
                return { result: cached, cached: true };
            }
            const response = yield axios_1.default.get(`${BASE_URL}/people/${id}`);
            if (!response) {
                throw new appError_1.default(messages_1.Messages.FAILED_TO_FETCH_CHARACTER, statusCode_1.default.BAD_GATEWAY);
            }
            if (response.status === 200 || response.data) {
                yield (0, cacheHelper_1.setCache)(cacheKey, response.data, 3600);
            }
            return { result: response.data, cached: false };
        });
    }
    enrichCharacterDetails(characters) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(characters.map((character) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const cacheKey = `character-details:${character.uid}`;
                    const cachedDetails = yield (0, cacheHelper_1.getCache)(cacheKey);
                    if (cachedDetails) {
                        return Object.assign(Object.assign({}, character), { details: cachedDetails }); // Use cached data
                    }
                    const additionalInfo = yield axios_1.default.get(character.url); // Fetch additional info
                    yield (0, cacheHelper_1.setCache)(cacheKey, additionalInfo.data.result, 3600); // Cache for 1 hour
                    return Object.assign(Object.assign({}, character), { details: additionalInfo.data.result }); // Merge additional info
                }
                catch (error) {
                    console.log(error);
                    return Object.assign(Object.assign({}, character), { details: null }); // Return null if additional info fetch fails
                }
            })));
        });
    }
    getAll(page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = `getAll:page:${page}:limit:${limit}:search:${search || "none"}`;
            const cachedData = yield (0, cacheHelper_1.getCache)(cacheKey);
            if (cachedData) {
                return { result: cachedData, cached: true };
            }
            let allCharacters = [];
            allCharacters = yield this.fetchCharacters(1, 100);
            if (search) {
                const filteredResult = allCharacters.filter((character) => character.name.toLowerCase().includes(search.toLowerCase()));
                allCharacters = filteredResult;
            }
            const totalCharacters = allCharacters.length;
            const totalPages = Math.ceil(totalCharacters / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedCharacters = allCharacters.slice(startIndex, endIndex);
            // Apply enrichCharacterDetails to get all properties
            const enrichedCharacters = yield this.enrichCharacterDetails(paginatedCharacters);
            // Prepare the response
            const response = {
                totalCharacters,
                totalPages,
                currentPage: page,
                characters: enrichedCharacters
            };
            // Cache the response
            yield (0, cacheHelper_1.setCache)(cacheKey, response, 3600); // Cache for 1 hour
            return { result: response, cached: false };
        });
    }
}
exports.default = new CharacterService;
