# Instruções para Configurar o Webhook do Asaas

## 1. Configurar Variáveis de Ambiente no Vercel

Além das variáveis que você já configurou, adicione também:

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnR3d3puc21ybW1uZXdyemlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDc4MzU5NywiZXhwIjoyMDcwMzU5NTk3fQ.M_Rv_VtOkfT7OiAzSsJ0ZmwqARWVXB_L5_smNCWWcAo
```

## 2. Deploy do Projeto

1. Faça upload dos arquivos para o GitHub
2. O Vercel fará o deploy automaticamente
3. Anote a URL do seu site (ex: `https://seusite.vercel.app`)

## 3. Configurar Webhook no Painel do Asaas

1. **Acesse o painel do Asaas**: https://www.asaas.com/
2. **Vá para Configurações > Webhooks**
3. **Clique em "Adicionar Webhook"**
4. **Configure os seguintes campos:**

   - **URL do Webhook**: `https://seusite.vercel.app/api/webhook-asaas`
   - **Eventos**: Marque as opções:
     - ✅ `PAYMENT_CONFIRMED` (Pagamento confirmado)
     - ✅ `PAYMENT_RECEIVED` (Pagamento recebido)
   - **Versão da API**: Deixe a mais recente
   - **Status**: Ativo

5. **Clique em "Salvar"**

## 4. Testar o Webhook

### Teste Manual:
1. Faça um pagamento de teste no seu checkout
2. Verifique os logs no painel do Vercel (aba "Functions")
3. Confirme se o status na tabela `enrollments` foi atualizado para "active"

### Teste via Asaas:
1. No painel do Asaas, vá para o webhook criado
2. Clique em "Testar Webhook"
3. Verifique se a resposta é `200 OK`

## 5. Fluxo Completo Funcionando

Após a configuração, o fluxo será:

1. **Cliente acessa o site** → Landing Page
2. **Clica em "Começar agora"** → Tela de boas-vindas
3. **Clica em "Garantir Minha Vaga"** → Checkout do Asaas
4. **Realiza o pagamento** → Asaas processa
5. **Asaas confirma pagamento** → Chama o webhook
6. **Webhook atualiza banco** → Status vira "active"
7. **Cliente é redirecionado** → Área do aluno com acesso liberado

## 6. Monitoramento

- **Logs do Webhook**: Vercel > Seu Projeto > Functions > webhook-asaas
- **Status dos Pagamentos**: Painel do Asaas > Vendas
- **Matrículas Ativas**: Supabase > Tabela `enrollments`

## 7. Troubleshooting

### Webhook não está sendo chamado:
- Verifique se a URL está correta
- Confirme se os eventos estão marcados
- Teste a URL manualmente

### Erro 500 no webhook:
- Verifique os logs no Vercel
- Confirme se as variáveis de ambiente estão corretas
- Teste a conexão com o Supabase

### Usuário não encontrado:
- Certifique-se de que o email usado no pagamento é o mesmo do cadastro
- Verifique se o usuário existe na tabela `auth.users` do Supabase

## 8. URLs Importantes

- **Site**: `https://seusite.vercel.app`
- **Área do Aluno**: `https://seusite.vercel.app/#/aluno`
- **Painel Admin**: `https://seusite.vercel.app/#/admin`
- **Webhook**: `https://seusite.vercel.app/api/webhook-asaas`

