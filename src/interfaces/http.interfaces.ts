import type { FastifyRequest, FastifyReply } from 'fastify';

export interface Request<T = {}> extends FastifyRequest<T> {}
export interface Reply extends FastifyReply {}
