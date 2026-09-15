declare module "@paystack/inline-js" {
    interface PaystackTransactionOptions {
        key?: string;
        email?: string;
        amount?: number;
        currency?: string;
        reference?: string;
        metadata?: Record<string, unknown>;
        onSuccess?: (transaction: {
            reference: string;
            [key: string]: unknown;
        }) => void;
        onCancel?: () => void;
        onError?: (error: unknown) => void;
    }

    class Paystack {
        newTransaction(options: PaystackTransactionOptions): void;

        resumeTransaction(accessCode: string,
            options?: {
                onSuccess?: (transaction: {
                    reference: string;
                    [key: string]: unknown;
                }) => void;
                onCancel?: () => void;
                onError?: (error: unknown) => void;
            },
        ): void;
    }

    export default Paystack;
}