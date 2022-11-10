import 'reflect-metadata';

import Fastify, {
	FastifyServerOptions,
	FastifyInstance,
	FastifyLoggerInstance,
} from 'fastify';
import fastifyEnv from '@fastify/env';
import { Server as IServer, IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { StatusCodes } from 'http-status-codes';
import { bootstrap } from 'fastify-decorators';
import { schema } from './config/config.schema';
import { AppController } from './controllers/v1';

// See for fastify decorators info: https://github.com/L2jLiga/fastify-decorators/

declare module 'fastify' {
	interface FastifyInstance {
		config: {
			PORT: string;
		};
	}
}

export default async function Server(
	opts?: FastifyServerOptions
): Promise<
	FastifyInstance<
		IServer,
		IncomingMessage,
		ServerResponse,
		FastifyLoggerInstance
	>
> {
	const server: FastifyInstance = Fastify(opts);

	server.register(fastifyEnv, {
		dotenv: {
			path: resolve(__dirname, '../.env'),
		},
		confKey: 'config',
		schema,
	});

	server.register(require('fastify-no-icon'));

	server.register(require('@fastify/rate-limit'), {
		max: 100,
		timeWindow: '1 minute',
	});

	server.setErrorHandler((error, _, reply) => {
		if (reply.statusCode === StatusCodes.TOO_MANY_REQUESTS) {
			error.message = `¡Llegaste al límite de velocidad! ¡Más despacio, por favor!`;
		}
		reply.send(error);
	});

	server.register(import('@fastify/compress'));

	server.register(bootstrap, {
		controllers: [AppController],
	});

	return server;
}
