import { appBootstrap } from './app';
import * as os from "os";
import { AnyExceptionFilter } from './modules/any-exception.filter';

const networkInterfaces = os.networkInterfaces();
console.log('Network Interfaces', networkInterfaces);

async function run() {
	const app = await appBootstrap;
  app.useGlobalFilters(new AnyExceptionFilter());
	await app.listen(3000);
}
run().catch(console.error);
