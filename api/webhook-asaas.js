// Webhook do Asaas para liberação automática de acesso
// Este arquivo deve ser deployado como uma função serverless no Vercel

import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase (variáveis server-only)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

// Cliente Supabase com permissões de admin
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Extrair email do cliente
    const customerEmail = payment.customer?.email || payment.customerEmail;
    if (!customerEmail) {
      console.error('Email do cliente não encontrado');
      return res.status(400).json({ error: 'Email do cliente não encontrado' });
    }

    console.log('Processando evento:', event, 'para:', customerEmail);

    // Buscar ou criar usuário no Supabase pelo email
    const { data: found, error: gErr } = await supabase.auth.admin.getUserByEmail(customerEmail);
    let userId = found?.user?.id;
    
    if (!userId) {
      const created = await supabase.auth.admin.createUser({ 
        email: customerEmail, 
        email_confirm: true 
      });
      if (created.error) throw created.error;
      userId = created.data.user.id;
      console.log('Usuário criado:', userId);
    } else {
      console.log('Usuário encontrado:', userId);
    }

    // Processar eventos de pagamento confirmado
    if (event === 'PAYMENT_CONFIRMED' || event === 'PAYMENT_RECEIVED') {
      // Ativar matrícula (upsert)
      const { error: upsertError } = await supabase
        .from('enrollments')
        .upsert({ 
          user_id: userId, 
          status: 'active',
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id' 
        });

      if (upsertError) {
        console.error('Erro ao ativar matrícula:', upsertError);
        return res.status(500).json({ error: 'Erro ao ativar matrícula' });
      }

      console.log(`Matrícula ativada para ${customerEmail} (${userId})`);
      return res.status(200).json({ 
        message: 'Matrícula ativada com sucesso',
        user_id: userId,
        email: customerEmail
      });
    }

    // Processar eventos de cancelamento/estorno
    if (event === 'PAYMENT_REFUNDED' || event === 'PAYMENT_CANCELLED') {
      // Cancelar matrícula
      const { error: cancelError } = await supabase
        .from('enrollments')
        .update({ 
          status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (cancelError) {
        console.error('Erro ao cancelar matrícula:', cancelError);
        return res.status(500).json({ error: 'Erro ao cancelar matrícula' });
      }

      console.log(`Matrícula cancelada para ${customerEmail} (${userId})`);
      return res.status(200).json({ 
        message: 'Matrícula cancelada com sucesso',
        user_id: userId,
        email: customerEmail
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

