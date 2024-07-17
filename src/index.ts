import { app } from './app';
import './controllers/auth.controller';
import './controllers/live.chat.controller';

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});