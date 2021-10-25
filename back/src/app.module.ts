import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot({
            playground: {
                settings: {
                    'request.credentials': 'include',
                },
            },
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }) => ({ req, res }),
            cors: {
                origin: process.env.ORIGIN,
                credentials: true,
            },
        }),
        TestModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
