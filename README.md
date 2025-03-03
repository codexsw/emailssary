# Emailssary SDK

A TypeScript/JavaScript SDK for interacting with the Emailssary API. Send transactional and templated emails with ease.

## Installation

```bash
npm install emailssary-sdk
```

## Usage

### Initialize the SDK

```typescript
import { EmailssarySDK } from 'emailssary-sdk';

const sdk = new EmailssarySDK('your-api-key');
```

You can also customize the base URL if needed:

```typescript
const sdk = new EmailssarySDK('your-api-key', {
  baseUrl: 'https://custom-api.emailssary.com'
});
```

### Sending Emails

Send emails using predefined templates:

```typescript
async function sendWelcomeEmail() {
  try {
    const response = await sdk.sendEmail({
      recipient: 'user@example.com',
      email_type: 'welcome_email',
      data: {
        username: 'JohnDoe',
        // Add any template variables here
      }
    });
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
```

### Response Type

The `sendEmail` method returns a promise that resolves to:

```typescript
interface EmailResponse {
  id: string;          // Unique identifier for the sent email
  status: 'sent' | 'failed';  // Status of the email
  message: string;     // Success/error message
  timestamp: string;   // ISO timestamp of when the email was sent
}
```

## API Reference

### EmailssarySDK

#### Constructor

```typescript
new EmailssarySDK(apiKey: string, config?: { baseUrl?: string })
```

#### Methods

##### sendEmail

```typescript
sendEmail(params: SendEmailParams): Promise<EmailResponse>
```

Parameters:
- `recipient`: Email address of the recipient
- `email_type`: Type/template of the email to send
- `data`: Object containing template variables

## Error Handling

The SDK throws errors for various cases:
- Invalid API key
- Network errors
- Invalid email templates
- Server errors

Example with error handling:

```typescript
try {
  const response = await sdk.sendEmail({
    recipient: 'user@example.com',
    email_type: 'welcome_email',
    data: { username: 'JohnDoe' }
  });
  console.log('Email sent successfully:', response);
} catch (error) {
  if (error.response) {
    // Handle API error response
    console.error('API Error:', error.response.data);
  } else if (error.request) {
    // Handle network error
    console.error('Network Error:', error.message);
  } else {
    // Handle other errors
    console.error('Error:', error.message);
  }
}
```

## License

MIT

## Support

For support, please contact support@emailssary.com or open an issue in our GitHub repository.
