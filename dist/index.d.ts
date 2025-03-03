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
export declare class EmailssarySDK {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string);
    private request;
    sendEmail(request: SendEmailRequest): Promise<SendEmailResponse>;
}
