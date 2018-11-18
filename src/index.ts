import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import config, { ApplicationConfig } from './config';

/**
 * @Singleton
 */
export class Application {

    private server: Koa;
    private router: KoaRouter;
    private static instance: Application;

    /**
     * Static method generator creates new instance of the class.
     */
    static getInstance(): Application {
        if (Application.instance) {
            return Application.instance;
        }

        Application.instance = new Application();

        return Application.instance;
    }

    private constructor() {
        this.server = new Koa();
        this.router = new KoaRouter();
    }

    setup(config: ApplicationConfig) {
        const { service: { host, port } } = config;

        this.server.use((ctx: Koa.Context, next: Function) => {
            console.log(ctx);
            next();
        });

        this.router.get('/', (ctx, next) => {
            ctx.body = 'Koa router is running!';
            next();
        });

        this.server.use(this.router.routes());

        this.server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`)
        });
    }
}

if (require.main === module) {
    Application.getInstance().setup(config as ApplicationConfig);
}
