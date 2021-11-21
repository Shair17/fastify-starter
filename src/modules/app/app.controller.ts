import { Controller, GET as Get } from 'fastify-decorators';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/')
	async getApp() {
		return this.appService.getApp();
	}
}
