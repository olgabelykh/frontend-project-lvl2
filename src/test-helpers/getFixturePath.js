import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (...paths) => path.resolve(__dirname, '../../__fixtures__', path.join(...paths));
