import { Module } from '@nestjs/common';
import { CliCommand } from './cli.service';
import { FileService } from './file.service';

@Module({
  imports: [],
  providers: [CliCommand,FileService],
})
export class AppModule {}
