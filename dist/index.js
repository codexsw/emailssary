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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailssarySDK = void 0;
class EmailssarySDK {
    constructor(apiKey) {
        this.baseUrl = 'https://www.emailssary.com/api/v1';
        if (!apiKey) {
            throw new Error('API key is required');
        }
        this.apiKey = apiKey;
    }
    request(endpoint, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}${endpoint}`, Object.assign(Object.assign({}, options), { headers: Object.assign({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` }, options.headers) }));
            console.log(response);
            if (!response.ok) {
                const errorBody = yield response.json();
                throw new Error(`Error ${response.status}: ${errorBody.message || response.statusText}`);
            }
            return response.json();
        });
    }
    sendEmail(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('/send', {
                method: 'POST',
                body: JSON.stringify(request),
            });
        });
    }
}
exports.EmailssarySDK = EmailssarySDK;
