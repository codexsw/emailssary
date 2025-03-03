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
const index_1 = require("../index");
// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;
describe('EmailssarySDK', () => {
    const apiKey = 'test-api-key';
    const baseUrl = 'https://api.emailssary.com/v1';
    let sdk;
    beforeEach(() => {
        sdk = new index_1.EmailssarySDK(apiKey);
        mockFetch.mockClear();
    });
    describe('constructor', () => {
        it('should initialize with API key', () => {
            const sdk = new index_1.EmailssarySDK(apiKey);
            expect(sdk['apiKey']).toBe(apiKey);
            expect(sdk['baseUrl']).toBe(baseUrl);
        });
        it('should throw error when API key is not provided', () => {
            expect(() => new index_1.EmailssarySDK('')).toThrow('API key is required');
        });
    });
    describe('sendEmail', () => {
        const mockRequest = {
            recipient: 'test@example.com',
            email_type: 'welcome_email',
            data: { username: 'TestUser' }
        };
        const mockResponse = {
            success: true,
            message: 'Email sent successfully',
            data: {
                id: '123',
                recipient: 'test@example.com',
                sentAt: '2024-03-03T12:00:00Z',
                type: 'welcome_email'
            }
        };
        it('should successfully send an email', () => __awaiter(void 0, void 0, void 0, function* () {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            });
            const response = yield sdk.sendEmail(mockRequest);
            expect(response).toEqual(mockResponse);
            expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/send`, {
                method: 'POST',
                body: JSON.stringify(mockRequest),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });
        }));
        it('should handle API errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Invalid email template';
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Bad Request',
                json: () => Promise.resolve({ message: errorMessage })
            });
            yield expect(sdk.sendEmail(mockRequest))
                .rejects
                .toThrow(`Error 400: ${errorMessage}`);
        }));
        it('should handle network errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockFetch.mockRejectedValueOnce(new Error('Network Error'));
            yield expect(sdk.sendEmail(mockRequest))
                .rejects
                .toThrow('Network Error');
        }));
        it('should handle API errors without message', () => __awaiter(void 0, void 0, void 0, function* () {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: () => Promise.resolve({})
            });
            yield expect(sdk.sendEmail(mockRequest))
                .rejects
                .toThrow('Error 500: Internal Server Error');
        }));
    });
});
