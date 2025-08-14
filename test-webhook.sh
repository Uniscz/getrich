#!/bin/bash

# Script para testar o webhook do Asaas
# Substitua SEU_TOKEN pelo token real do Asaas

echo "Testando webhook do Asaas..."

# T1 - Teste de webhook com PAYMENT_CONFIRMED
echo "T1 - Testando PAYMENT_CONFIRMED..."
curl -X POST "https://videoscraft.online/api/webhook-asaas?token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"event":"PAYMENT_CONFIRMED","payment":{"customerEmail":"teste@exemplo.com"}}'

echo -e "\n\nT1b - Testando PAYMENT_RECEIVED..."
curl -X POST "https://videoscraft.online/api/webhook-asaas?token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"event":"PAYMENT_RECEIVED","payment":{"customerEmail":"teste2@exemplo.com"}}'

echo -e "\n\nT4 - Testando PAYMENT_REFUNDED..."
curl -X POST "https://videoscraft.online/api/webhook-asaas?token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"event":"PAYMENT_REFUNDED","payment":{"customerEmail":"teste@exemplo.com"}}'

echo -e "\n\nT4b - Testando PAYMENT_CANCELLED..."
curl -X POST "https://videoscraft.online/api/webhook-asaas?token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"event":"PAYMENT_CANCELLED","payment":{"customerEmail":"teste2@exemplo.com"}}'

echo -e "\n\nTestes de webhook concluídos!"

