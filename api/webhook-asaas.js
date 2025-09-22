// Webhook do Asaas para liberação automática de acesso
// Este arquivo deve ser deployado como uma função serverless no Vercel

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
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validar token do Asaas
    const token = req.headers['asaas-access-token'] || req.query.token;
    if (token !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Log da requisição para debug
    console.log('Webhook recebido:', JSON.stringify(req.body, null, 2));

    const { event, payment } = req.body;
    const paymentId = payment.id;

    if (!paymentId) {
      console.error('Payment ID não encontrado');
      return res.status(400).json({ error: 'Payment ID não encontrado' });
    }

    console.log('Processando evento:', event, 'para payment ID:', paymentId);

    // Conectar ao Redis
    const redisClient = await connectRedis();

    // Processar eventos de pagamento confirmado
    if (event === 'PAYMENT_CONFIRMED' || event === 'PAYMENT_RECEIVED') {
      // Salvar no Redis que o pagamento foi confirmado
      const paymentData = {
        status: 'confirmed',
        paymentId: paymentId,
        confirmedAt: new Date().toISOString(),
        customerEmail: payment.customer?.email || payment.customerEmail,
        customerCpfCnpj: payment.customer?.cpfCnpj || payment.customerCpfCnpj,
        value: payment.value,
        description: payment.description
      };

      await redisClient.set(`payment:${paymentId}`, JSON.stringify(paymentData), {
        EX: 60 * 60 * 48 // Expira em 48 horas
      });

      console.log(`Pagamento confirmado para ID: ${paymentId}`);
      return res.status(200).json({ 
        message: 'Pagamento confirmado e salvo no Redis',
        payment_id: paymentId
      });
    }

    // Processar eventos de cancelamento/estorno
    if (event === 'PAYMENT_REFUNDED' || event === 'PAYMENT_CANCELLED') {
      // Atualizar status no Redis
      const paymentData = {
        status: event === 'PAYMENT_REFUNDED' ? 'refunded' : 'cancelled',
        paymentId: paymentId,
        updatedAt: new Date().toISOString(),
        customerEmail: payment.customer?.email || payment.customerEmail,
        customerCpfCnpj: payment.customer?.cpfCnpj || payment.customerCpfCnpj,
        value: payment.value,
        description: payment.description
      };

      await redisClient.set(`payment:${paymentId}`, JSON.stringify(paymentData), {
        EX: 60 * 60 * 48 // Expira em 48 horas
      });

      console.log(`Pagamento ${event === 'PAYMENT_REFUNDED' ? 'estornado' : 'cancelado'} para ID: ${paymentId}`);
      return res.status(200).json({ 
        message: `Pagamento ${event === 'PAYMENT_REFUNDED' ? 'estornado' : 'cancelado'}`,
        payment_id: paymentId
      });
    }

    // Outros eventos são ignorados
    console.log('Evento ignorado:', event);
    return res.status(200).json({ message: 'Evento ignorado' });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
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
