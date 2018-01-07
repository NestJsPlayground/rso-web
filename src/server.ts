import { appBootstrap } from './app';
import * as os from "os";
import { AnyExceptionFilter } from './modules/any-exception.filter';
import { environment } from './environment';

const networkInterfaces = os.networkInterfaces();
console.log('Network Interfaces', networkInterfaces);

async function run() {
	const app = await appBootstrap;
  app.useGlobalFilters(new AnyExceptionFilter());
	await app.listen(environment.port);
}
run().catch(console.error);
