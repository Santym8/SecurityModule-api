import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { IController } from '../../utils/IController';
@Service()
export class ExampleController implements IController {
    private router: Router;

    constructor(
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes(): void {
        this.router.get(
            '/',
            (req: Request, res: Response, next: any) => {
                res.send('login');
            }
        );

    }


    public getRouter(): Router {
        return this.router;
    }


}