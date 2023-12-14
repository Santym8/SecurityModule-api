import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { IController } from '../../../utils/IController';
import { UserService } from '../Service/UserService';

@Service()
export class UserController implements IController {
    private router: Router;

    constructor(
        private readonly userService: UserService
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes(): void {
        this.router.get('/',
            (req: Request, res: Response, next: any) => {
                res.send('user');
            }
        );

        this.router.post('',
            async (req: Request, res: Response, next: any) => {
                const createUserRequest = req.body;
                console.log(req.body);
                this.userService.createUser(createUserRequest)
                    .then((user) => {
                        res.send(user);
                    }
                    ).catch((err) => {
                        res.send(err);
                    });
            }
        );

    }


    public getRouter(): Router {
        return this.router;
    }


}