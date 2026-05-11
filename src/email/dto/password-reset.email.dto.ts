export type PasswordResetEmailDto = {
    code: string;
    email: string;
    expiresAt: Date;
    name: string;
}