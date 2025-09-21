# Configuração do Sistema de Pagamento Asaas

## ✅ Alterações Implementadas

### 1. **Landing Page Atualizada**
- Botão "Comprar agora" agora redireciona para: `https://www.asaas.com/c/sf24e6hym93upjk6`
- Removido sistema de login/cadastro da landing
- Mantido design otimizado para conversão

### 2. **Nova Página de Obrigado**
- Rota: `/#/obrigado?pid={payment.id}`
- Lê automaticamente o `payment.id` da URL
- Verifica status do pagamento em tempo real
- Libera botão "Baixar PDF" quando pagamento confirma
- Interface com feedback visual (loading, sucesso, erro)

### 3. **Sistema de Download Seguro**
- PDF incluído em `/public/CursoIA.pdf`
- Links temporários assinados com **expiração de 48 horas**
- Tokens HMAC SHA-256 para máxima segurança
- Sem token válido = sem download

### 4. **APIs Criadas**
- `/api/webhook-asaas` - Recebe confirmações do Asaas
- `/api/payment-status/[pid]` - Verifica status do pagamento
- `/api/download` - Download seguro com validação de token

### 5. **Webhook Atualizado**
- Agora usa **Vercel KV** (Redis) em vez do Supabase
- Funciona apenas com `payment.id` (sem email)
- Processa eventos: `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`, `PAYMENT_REFUNDED`, `PAYMENT_CANCELLED`

## 🔧 Configuração Necessária

### 1. **Variáveis de Ambiente no Vercel**

Adicione estas variáveis no painel do Vercel:

```bash
# Token do webhook do Asaas
ASAAS_WEBHOOK_TOKEN=seu-token-webhook-asaas

# Credenciais do Vercel KV
KV_REST_API_URL=https://sua-kv-url.kv.vercel-storage.com
KV_REST_API_TOKEN=seu-token-kv

# Chave secreta para assinatura de downloads
DOWNLOAD_SECRET=sua-chave-secreta-super-segura
```

### 2. **Configuração no Asaas**

1. **Link de Checkout**: Já configurado como `https://www.asaas.com/c/sf24e6hym93upjk6`

2. **URL de Redirecionamento**: Configure para:
   ```
   https://seu-site.vercel.app/#/obrigado?pid={payment.id}
   ```

3. **Webhook URL**: Configure para:
   ```
   https://seu-site.vercel.app/api/webhook-asaas
   ```

4. **Eventos do Webhook**: Ative estes eventos:
   - `PAYMENT_CONFIRMED`
   - `PAYMENT_RECEIVED`
   - `PAYMENT_REFUNDED`
   - `PAYMENT_CANCELLED`

### 3. **Vercel KV Storage**

1. No painel do Vercel, vá em "Storage"
2. Crie um novo "KV Database"
3. Copie as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`
4. Adicione nas variáveis de ambiente

## 🚀 Fluxo Completo

1. **Usuário na Landing** → Clica "Comprar agora"
2. **Redirecionamento** → Para checkout do Asaas
3. **Pagamento** → Usuário paga no Asaas
4. **Webhook** → Asaas confirma pagamento e salva no KV
5. **Redirecionamento** → Para `/#/obrigado?pid={payment.id}`
6. **Verificação** → Página verifica status no KV via API
7. **Download** → Link temporário é liberado por 48h

## 🛠️ Deploy

1. **Commit e Push**: As alterações já estão prontas
2. **Vercel Deploy**: O Vercel vai detectar as mudanças automaticamente
3. **Configure KV**: Crie o banco KV no painel do Vercel
4. **Configure Variáveis**: Adicione as variáveis de ambiente
5. **Configure Asaas**: Atualize URLs de webhook e redirecionamento
6. **Teste**: Faça um pagamento teste para validar o fluxo

## 🔍 Testando

### Teste de Webhook (via curl):
```bash
curl -X POST https://seu-site.vercel.app/api/webhook-asaas \
  -H "Content-Type: application/json" \
  -H "asaas-access-token: seu-token" \
  -d '{
    "event": "PAYMENT_CONFIRMED",
    "payment": {
      "id": "pay_test_123",
      "value": 119.90,
      "status": "CONFIRMED"
    }
  }'
```

### Teste de Status:
```
https://seu-site.vercel.app/api/payment-status/pay_test_123
```

## 🚨 Importante

- **Não esqueça** de configurar as variáveis de ambiente no Vercel
- **Teste sempre** o fluxo completo antes de colocar em produção
- **Mantenha seguro** o `DOWNLOAD_SECRET` - use uma chave forte
- **Configure corretamente** as URLs no Asaas para evitar problemas

## 📞 Troubleshooting

- **Site em branco**: Verifique se as variáveis de ambiente estão configuradas
- **Download não funciona**: Verifique se o PDF existe em `/public/CursoIA.pdf`
- **Webhook falha**: Verifique token e URL no Asaas
- **KV não funciona**: Verifique credenciais do Vercel KV
