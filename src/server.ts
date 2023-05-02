import { app } from './app';

app.listen(process.env.PORT ?? 3003, () => {
    console.log('Server is running');
});
