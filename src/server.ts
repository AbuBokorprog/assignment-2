import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log('The App is running');
      console.log(`http://localhost:${config.port}/`);
    });
  } catch (err) {
    console.log(err as string);
  }
}

main();
