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
    // Log da requisição para debug
    console.log('Webhook recebido:', JSON.stringify(req.body, null, 2));

    const { event, payment } = req.body;

    // Verificar se é um evento de pagamento confirmado
    if (event !== 'PAYMENT_CONFIRMED' && event !== 'PAYMENT_RECEIVED') {
      console.log('Evento ignorado:', event);
      return res.status(200).json({ message: 'Evento ignorado' });
    }

    // Verificar se o pagamento foi aprovado
    if (payment.status !== 'CONFIRMED' && payment.status !== 'RECEIVED') {
      console.log('Pagamento não confirmado:', payment.status);
      return res.status(200).json({ message: 'Pagamento não confirmado' });
    }

    // Extrair email do cliente
    const customerEmail = payment.customer?.email;
    if (!customerEmail) {
      console.error('Email do cliente não encontrado');
      return res.status(400).json({ error: 'Email do cliente não encontrado' });
    }

    console.log('Processando pagamento para:', customerEmail);

    // Buscar usuário no Supabase pelo email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Erro ao buscar usuários:', userError);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

    const user = users.users.find(u => u.email === customerEmail);
    
    if (!user) {
      console.error('Usuário não encontrado:', customerEmail);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user.id);

    // Verificar se já existe uma matrícula para este usuário
    const { data: existingEnrollment, error: checkError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar matrícula:', checkError);
      return res.status(500).json({ error: 'Erro ao verificar matrícula' });
    }

    if (existingEnrollment) {
      // Atualizar matrícula existente
      const { error: updateError } = await supabase
        .from('enrollments')
        .update({ 
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Erro ao atualizar matrícula:', updateError);
        return res.status(500).json({ error: 'Erro ao atualizar matrícula' });
      }

      console.log('Matrícula atualizada para ativa');
    } else {
      // Criar nova matrícula
      const { error: insertError } = await supabase
        .from('enrollments')
        .insert([{
          user_id: user.id,
          status: 'active',
          created_at: new Date().toISOString()
        }]);

      if (insertError) {
        console.error('Erro ao criar matrícula:', insertError);
        return res.status(500).json({ error: 'Erro ao criar matrícula' });
      }

      console.log('Nova matrícula criada');
    }

    // Log de sucesso
    console.log(`Acesso liberado para ${customerEmail} (${user.id})`);

    return res.status(200).json({ 
      message: 'Acesso liberado com sucesso',
      user_id: user.id,
      email: customerEmail
    });

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

