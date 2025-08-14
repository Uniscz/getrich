# Checklist de QA - VideoCraft IA

## Configurações Necessárias

### Variáveis de Ambiente (Vercel)
- [ ] `VITE_SUPABASE_URL` (client)
- [ ] `VITE_SUPABASE_ANON_KEY` (client)
- [ ] `SUPABASE_URL` (server)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (server)
- [ ] `ASAAS_WEBHOOK_TOKEN` (server)

### Supabase
- [ ] Executar script `supabase-setup.sql` no SQL Editor
- [ ] Adicionar `https://videoscraft.online` nas URLs permitidas (Authentication → URL Configuration)

### Asaas
- [ ] Configurar webhook URL: `https://videoscraft.online/api/webhook-asaas`
- [ ] Configurar token de autenticação (mesmo valor de `ASAAS_WEBHOOK_TOKEN`)

## Testes de Aceite

### T1 - Webhook
- [ ] PAYMENT_CONFIRMED cria/ativa matrícula
- [ ] PAYMENT_RECEIVED cria/ativa matrícula
- [ ] Resposta 200 com dados do usuário
- [ ] Registro criado na tabela `enrollments` com `status='active'`

### T2 - Login OTP
- [ ] Envio de email funciona em #/login
- [ ] Link mágico recebido por email
- [ ] Após clicar no link, usuário é redirecionado para #/aluno
- [ ] Autenticação persistida no navegador

### T3 - Área do Aluno
- [ ] Usuário logado com matrícula ativa acessa #/aluno
- [ ] Lista de aulas carregada da tabela `lessons`
- [ ] Aulas ordenadas por `order_num`
- [ ] Interface responsiva (mobile/desktop)

### T4 - Cancelamento/Estorno
- [ ] PAYMENT_REFUNDED desativa matrícula (`status='inactive'`)
- [ ] PAYMENT_CANCELLED desativa matrícula (`status='inactive'`)
- [ ] Usuário com matrícula inativa é redirecionado para #/checkout

### T5 - Navbar/UX
- [ ] Botão "Login" visível em mobile e desktop
- [ ] Ícone do usuário com tamanho w-5 h-5
- [ ] Texto "Login" sempre visível (sem `hidden md:inline`)
- [ ] "Garantir minha vaga" leva para #/checkout
- [ ] "Login" leva para #/login
- [ ] "Área do Aluno" leva para #/aluno (quando logado)

## Deploy e Build

### Build Local
- [x] `npm run build` executa sem erros
- [x] Arquivos gerados em `dist/`
- [x] `npm run preview` funciona localmente

### Vercel
- [ ] Framework: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] `vercel.json` presente no repositório
- [ ] Deploy sem erros
- [ ] `/api/webhook-asaas` retorna 405 em GET, 200 em POST válido

## Segurança
- [ ] `SERVICE_ROLE_KEY` apenas em variáveis server
- [ ] Validação de token no webhook
- [ ] RLS habilitado nas tabelas
- [ ] Políticas de segurança configuradas

## Status dos Testes
- [ ] T1 - Webhook: ⏳ Pendente
- [ ] T2 - Login OTP: ⏳ Pendente  
- [ ] T3 - Área do Aluno: ⏳ Pendente
- [ ] T4 - Cancel/Refund: ⏳ Pendente
- [ ] T5 - Navbar/UX: ⏳ Pendente

