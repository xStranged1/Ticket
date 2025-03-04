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

    public async login(email: string, password: string) {
        let res;
        try {
            res = await new Promise((resolve, reject) => {
                this.auth0Client.login({
                    realm: environment.auth0.database,
                    audience: environment.auth0.audience,
                    email,
                    password,
                }, (err, authResult) => {
                    if (err) {
                        console.error(err);
                        reject(err); // Rechazar la promesa si hay error
                    } else {
                        console.log('authResult', authResult);
                        resolve(authResult); // Resolver la promesa si todo fue bien
                    }
                });
            });
        } catch (err: any) {
            console.error('Login failed', err);
            return err
        }
        return res;
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

    public signup(email: string, password: string): void {
        this.auth0Client.signup({
            connection: environment.auth0.database,
            email,
            password,
        }, (err, result) => {
            if (err) {
                console.error("Error al registrar usuario:", err);
                alert("Error al registrar usuario: " + err.description);
                return;
            }
            console.log("Usuario registrado exitosamente:", result);
        });
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