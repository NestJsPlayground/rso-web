import { appBootstrap } from './app';
import * as os from "os";
import { AnyExceptionFilter } from './modules/any-exception.filter';
import { environment } from './environment';

const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces).map(k => {
  const x = networkInterfaces[k];
  console.log(`Network Interface "${ k }" > address ${ x.map(y => y.address).join(', ') }`);
});

async function run() {
	const app = await appBootstrap;
  app.useGlobalFilters(new AnyExceptionFilter());
	await app.listen(environment.port);
}
run().catch(console.error);
