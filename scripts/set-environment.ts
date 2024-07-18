/**
 * Script para generar el archivo de environment utilizado por Angular.
 * Este script debe ejecutarse como paso previo a la compilación de la aplicación
 * (build step).
 *
 * Para mejorar los tiempos de carga del paint inicial de la aplicación, la con-
 * figuración de contenido se obtiene desde las variables de entorno y se deposita
 * en el archivo de environment.ts, el cual es compilado junto con la aplicación.
 *
 * Autor: @rolivencia
 */

// Tipo que describe los diferentes tipos de ambientes disponibles en Vercel, más el local de development
export type TEnvironmentType = 'development' | 'preview' | 'staging' | 'production';

// NodeJS & env
import { writeFile, existsSync, mkdirSync } from 'fs';
import ErrnoException = NodeJS.ErrnoException;

const dirPath = `src/app/environments`;
const targetPath = `${dirPath}/environment.ts`;

// Constantes para generar el archivo de environment
const environment: TEnvironmentType = (process.env['VERCEL_ENV'] as TEnvironmentType) ?? 'development';

const environmentFileContent = `
    export const environment = {
       environment: "${environment}",
       redirectUri: "${process.env['AUTH0_REDIRECT_URI']}",
       domain: "${process.env['AUTH0_DOMAIN']}",
       clientId: "${process.env['AUTH0_CLIENT_ID']}",
    };
`;

// En caso de que no exista el directorio environments, se lo crea
if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
}

// Escribe el contenido en el archivo correspondiente environment.ts
writeFile(targetPath, environmentFileContent, { flag: 'w' }, function (err: ErrnoException | null) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Variables de entorno escritas en ${targetPath}`);
    console.log('Auth0: ');
    console.log('-------- | Domain      : ', process.env['AUTH0_DOMAIN']);
    console.log('-------- | Redirect URI: ', process.env['AUTH0_REDIRECT_URI']);
    console.log('-------- | Client ID   : ', process.env['AUTH0_CLIENT_ID']);
});
