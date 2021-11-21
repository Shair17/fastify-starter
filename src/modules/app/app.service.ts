import { Service } from 'fastify-decorators';

@Service()
export class AppService {
	constructor() {}

	getApp(): string {
		return 'Hello world'
	}
}
