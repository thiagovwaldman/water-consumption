import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WaterConsumptionService } from './water-consumption.service';
import { WaterConsumption } from './water-consumption.entity';

@Controller('water-consumption')
export class WaterConsumptionController {
  constructor(private readonly consumptionService: WaterConsumptionService) {}

  // Endpoint para registrar o consumo de água
  @Post()
  async create(@Body() consumptionData: WaterConsumption) {
    return this.consumptionService.create(consumptionData);
  }

  // Endpoint para consultar o histórico de consumo
  @Get('history')
  async getHistory(
    @Query('userId') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.consumptionService.getHistory(userId, startDate, endDate);
  }

  // Endpoint para gerar alertas de consumo elevado
  @Get('alerts')
  async getAlerts(@Query('userId') userId: number) {
    return this.consumptionService.getAlerts(userId);
  }
}
