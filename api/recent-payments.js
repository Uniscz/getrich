// API para buscar pagamentos recentes (últimos 5 minutos)
// Usado para detectar automaticamente pagamentos quando o usuário volta do Asaas

import { createClient } from 'redis';

// Configuração do Redis
const redis = createClient({
  url: process.env.REDIS_URL
});

// Conectar ao Redis
async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}

export default async function handler(req, res) {
  // Permitir apenas GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Buscando pagamentos recentes...');

    // Conectar ao Redis
    const redisClient = await connectRedis();

    // Buscar todas as chaves de pagamento
    const keys = await redisClient.keys('payment:*');
    
    if (keys.length === 0) {
      return res.status(200).json({ 
        recentPayment: null,
        message: 'Nenhum pagamento encontrado' 
      });
    }

    // Buscar dados de todos os pagamentos
    const payments = [];
    for (const key of keys) {
      try {
        const paymentDataStr = await redisClient.get(key);
        if (paymentDataStr) {
          const paymentData = JSON.parse(paymentDataStr);
          payments.push({
            ...paymentData,
            key: key
          });
        }
      } catch (error) {
        console.error('Erro ao parsear pagamento:', key, error);
      }
    }

    // Filtrar pagamentos dos últimos 5 minutos
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentPayments = payments.filter(payment => {
      const confirmedAt = new Date(payment.confirmedAt);
      return confirmedAt > fiveMinutesAgo && payment.status === 'confirmed';
    });

    // Ordenar por data mais recente
    recentPayments.sort((a, b) => new Date(b.confirmedAt) - new Date(a.confirmedAt));

    const mostRecent = recentPayments[0] || null;

    console.log('Pagamentos recentes encontrados:', recentPayments.length);
    console.log('Mais recente:', mostRecent?.paymentId);

    return res.status(200).json({
      recentPayment: mostRecent ? {
        id: mostRecent.paymentId,
        confirmedAt: mostRecent.confirmedAt,
        value: mostRecent.value
      } : null,
      totalFound: recentPayments.length,
      message: mostRecent ? 'Pagamento recente encontrado' : 'Nenhum pagamento recente'
    });

  } catch (error) {
    console.error('Erro ao buscar pagamentos recentes:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// Configuração para o Vercel
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
