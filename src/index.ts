// import * as Redis from 'redis';
import * as os from 'os';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import config, { ApplicationConfig } from './config';

/**
 * @Singleton
 */
export class Application {

    // private redis: Redis.RedisClient;
    private server: Koa;
    private router: KoaRouter;
    private static instance: Application;
    private started: boolean;

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
        if (this.started) {
            return;
        }

        const { 
            service: { host = '0.0.0.0', port = 80 },
            // redis: { host: redisHost, port: redisPort }
        } = config;

        // this.redis = Redis.createClient({
        //     host: redisHost,
        //     port: redisPort
        // });

        this.router.get('/', async (ctx: Koa.Context, next: Function) => {
            let visits: number = -1;

            // const KEY_NAME = 'visits';

            // try {
            //     const value: number = await (new Promise<number>((resolve: Function, reject: Function) => {
            //         this.redis.get(KEY_NAME, (err, result) => {
            //             err ? reject(err) : resolve(parseInt(result || '', 10));
            //         });
            //     })) || 0;
                
            //     visits = value + 1;

            //     this.redis.set(KEY_NAME, String(visits));
            // } catch (e) {
            //     visits = -1;
            //     console.error(e);
            // }
            
            ctx.body = `Koa router is running! Host name: ${os.hostname()}. Redis visits: ${visits}`;

            next();
        });

        this.server.use(this.router.routes());

        this.server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`)
        });

        this.started = true;
    }
}

if (require.main === module) {
    Application.getInstance().setup(config as ApplicationConfig);
}
