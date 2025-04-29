import { Module } from '@nestjs/common';
import { QueryToolkitService } from './query-toolkit.service';

@Module({
  providers: [QueryToolkitService],
  exports: [QueryToolkitService],
})
export class CommonModule {}
