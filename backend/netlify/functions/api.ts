import serverless from 'serverless-http';
import { handler as app} from '../../index'

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });
  

export const handler = serverless(app);


