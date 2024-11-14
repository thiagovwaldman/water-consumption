import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WaterConsumption } from './water-consumption.entity';

@Injectable()
export class WaterConsumptionService {
  constructor(
    @InjectRepository(WaterConsumption)
    private readonly consumptionRepository: Repository<WaterConsumption>,
  ) {}

  // Método para criar um novo registro de consumo
  async create(consumptionData: WaterConsumption): Promise<WaterConsumption> {
    const newConsumption = this.consumptionRepository.create(consumptionData); // Cria uma nova instância
    return this.consumptionRepository.save(newConsumption); // Salva no banco de dados
  }

  // Método para consultar o histórico de consumo entre duas datas
  async getHistory(userId: number, startDate: string, endDate: string): Promise<WaterConsumption[]> {
    return this.consumptionRepository.find({
      where: {
        userId: userId,
        date: Between(new Date(startDate), new Date(endDate)),
      },
    });
  }

  // Método para gerar alertas de consumo elevado
  async getAlerts(userId: number): Promise<{ alert: string }> {
    const consumptions = await this.consumptionRepository.find({
      where: { userId: userId },
      order: { date: 'DESC' },
      take: 2, // Pega os 2 últimos registros
    });

    if (consumptions.length < 2) {
      return { alert: 'É necessário pelo menos 2 meses de dados para comparar o consumo.' };
    }

    const [currentMonth, previousMonth] = consumptions;

    if (currentMonth.amount > previousMonth.amount) {
      return {
        alert: `Consumo elevado no mês atual em relação ao mês anterior. Consumo atual: ${currentMonth.amount} m³, Consumo anterior: ${previousMonth.amount} m³.`,
      };
    }

    return { alert: 'Consumo dentro dos limites normais.' };
  }
}
