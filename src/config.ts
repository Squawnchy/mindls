import dotenv from "dotenv";

dotenv.config();

export const config = {
    bring: {
        mail: __envOrError('BRING_MAIL'),
        password: __envOrError('BRING_PASSWORD')
    }
}

function __envOrError(variable: string) {
    const value = process.env[variable];
    if (value === null || value === undefined) {
        throw new Error(`Environment-Variable ${variable} required, but not found.`)
    }
    return value;
}