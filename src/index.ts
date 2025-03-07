export interface SendEmailRequest {
  recipient: string;
  email_type: string;
  data?: Record<string, any>;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    recipient: string;
    sentAt: string;
    type: string;
  };
}

export class EmailssarySDK {
  private apiKey: string;
  private baseUrl: string = 'https://www.emailssary.com/api/v1';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    console.log(response);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `Error ${response.status}: ${errorBody.message || response.statusText}`
      );
    }

    return response.json();
  }

  async sendEmail(request: SendEmailRequest): Promise<SendEmailResponse> {
    return this.request<SendEmailResponse>('/send', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

