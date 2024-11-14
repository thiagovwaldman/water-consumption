import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterConsumptionModule } from './water-consumption/water-consumption.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',  // Ou o tipo de banco de dados que você está usando
      database: 'water_monitor.db',  // Nome do banco de dados
      autoLoadEntities: true,
      synchronize: true,  // Avisa o TypeORM para sincronizar as tabelas
    }),
    WaterConsumptionModule, // Aqui registramos o módulo de consumo de água
  ],
})
export class AppModule {}
