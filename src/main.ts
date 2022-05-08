import Server from './server';

async function main() {
	const app = await Server({
		logger: true,
		disableRequestLogging: true,
		ignoreTrailingSlash: true,
	});

	if (!!(require.main && module.children)) {
		await app.listen(+app.config.PORT, '0.0.0.0');
	}
}

main();
