// API para verificar status de pagamento e retornar link de download
// Este arquivo deve ser deployado como uma função serverless no Vercel

import crypto from 'crypto';
import { createClient } from 'redis';

// Configurações
const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET || 'your-secret-key';

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

// Função para gerar token assinado
function generateSignedToken(paymentId) {
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 horas
  const payload = {
    paymentId,
    expiresAt: expiresAt.toISOString(),
  };
  
  const signature = crypto
    .createHmac('sha256', DOWNLOAD_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return {
    token: Buffer.from(JSON.stringify({ ...payload, signature })).toString('base64'),
    expiresAt: expiresAt.toISOString(),
  };
}

export default async function handler(req, res) {
  // Permitir apenas GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pid } = req.query;
    
    if (!pid) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    console.log('Verificando status do pagamento:', pid);

    // Conectar ao Redis
    const redisClient = await connectRedis();

    // Buscar dados do pagamento no Redis
    const paymentDataStr = await redisClient.get(`payment:${pid}`);
    
    if (!paymentDataStr) {
      // Pagamento não encontrado - pode estar pendente
      return res.status(200).json({
        status: 'pending',
        message: 'Pagamento ainda não confirmado'
      });
    }

    const paymentData = JSON.parse(paymentDataStr);
    
    if (paymentData.status === 'confirmed') {
      // Gerar link de download com token assinado
      const { token, expiresAt } = generateSignedToken(pid);
      const downloadUrl = `${req.headers.host}/api/download?token=${encodeURIComponent(token)}`;
      
      return res.status(200).json({
        status: 'confirmed',
        downloadUrl: `https://${downloadUrl}`,
        expiresAt,
        message: 'Pagamento confirmado - download disponível'
      });
    }

    // Outros status (cancelled, refunded, etc.)
    return res.status(200).json({
      status: paymentData.status || 'unknown',
      message: 'Status do pagamento atualizado'
    });

  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
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
