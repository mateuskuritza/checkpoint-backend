/* eslint-disable @typescript-eslint/no-extraneous-class */
import jsonwebtoken from 'jsonwebtoken';

class JWT {
    verify(token: string): { valid: boolean; payload?: any } {
        try {
            const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? '');
            return {
                valid: true,
                payload,
            };
        } catch {
            return {
                valid: false,
            };
        }
    }

    create(payload: any): string {
        return jsonwebtoken.sign(payload, process.env.JWT_SECRET ?? '', {
            expiresIn: '1h',
        });
    }
}

export const JWTHelper = new JWT();
