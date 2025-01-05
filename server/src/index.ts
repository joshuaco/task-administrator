import server from './server';
import colors from 'colors';
import { PORT } from './config/constants';

server.listen(PORT, () => {
  console.log(colors.green(`Server is running on http://localhost:${PORT}`));
});
