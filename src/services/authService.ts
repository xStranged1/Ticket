import auth0 from 'auth0-js';
import { environment } from '../environments/environment';
import Cookies from 'js-cookie';

class AuthService {
    private auth0Client: auth0.WebAuth;
    public isAuthenticated: boolean = false;


    constructor() {
        this.auth0Client = new auth0.WebAuth({
            domain: environment.auth0.domain,
            clientID: environment.auth0.clientId,
            audience: environment.auth0.audience,
            redirectUri: 'http://localhost:5173/callback',
            responseType: 'token id_token',
        });
    }

    public login(email: string, password: string): void {
        this.auth0Client.login({
            realm: environment.auth0.database,
            audience: environment.auth0.audience,
            email,
            password,
        }, (err, authResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(authResult);
        });

    }

    public async handleAuthentication(): Promise<void> {
        const hash = window.location.hash;
        const queryParams = new URLSearchParams(hash.substring(1));
        const idToken = queryParams.get('id_token');
        const accessToken = queryParams.get('access_token');
        const expiresIn = queryParams.get('expires_in');

        if (accessToken && idToken && expiresIn) {
            console.log('Authenticated');
            await this.setSession(idToken, accessToken, expiresIn);
        }
    }

    private setSession(idToken: string, accessToken: string, expiresIn: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const expiresAt = (Date.now() + parseInt(expiresIn) * 1000).toString();
            Cookies.set('idToken', idToken);
            Cookies.set('accessToken', accessToken);
            Cookies.set('expiresAt', expiresAt);

            this.isAuthenticated = true;
            resolve();
        });
    }
}

export default new AuthService();