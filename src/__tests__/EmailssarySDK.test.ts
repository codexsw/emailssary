import { EmailssarySDK, SendEmailRequest, SendEmailResponse } from '../index';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('EmailssarySDK', () => {
  const apiKey = 'test-api-key';
  const baseUrl = 'https://api.emailssary.com/v1';
  let sdk: EmailssarySDK;

  beforeEach(() => {
    sdk = new EmailssarySDK(apiKey);
    mockFetch.mockClear();
  });

  describe('constructor', () => {
    it('should initialize with API key', () => {
      const sdk = new EmailssarySDK(apiKey);
      expect(sdk['apiKey']).toBe(apiKey);
      expect(sdk['baseUrl']).toBe(baseUrl);
    });

    it('should throw error when API key is not provided', () => {
      expect(() => new EmailssarySDK('')).toThrow('API key is required');
    });
  });

  describe('sendEmail', () => {
    const mockRequest: SendEmailRequest = {
      recipient: 'test@example.com',
      email_type: 'welcome_email',
      data: { username: 'TestUser' }
    };

    const mockResponse: SendEmailResponse = {
      success: true,
      message: 'Email sent successfully',
      data: {
        id: '123',
        recipient: 'test@example.com',
        sentAt: '2024-03-03T12:00:00Z',
        type: 'welcome_email'
      }
    };

    it('should successfully send an email', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const response = await sdk.sendEmail(mockRequest);

      expect(response).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${baseUrl}/send`,
        {
          method: 'POST',
          body: JSON.stringify(mockRequest),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Invalid email template';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve({ message: errorMessage })
      });

      await expect(sdk.sendEmail(mockRequest))
        .rejects
        .toThrow(`Error 400: ${errorMessage}`);
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network Error'));

      await expect(sdk.sendEmail(mockRequest))
        .rejects
        .toThrow('Network Error');
    });

    it('should handle API errors without message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({})
      });

      await expect(sdk.sendEmail(mockRequest))
        .rejects
        .toThrow('Error 500: Internal Server Error');
    });
  });
}); 