# Independência Criativa — Próxima Obra

Landing page minimalista (estilo Apple) para financiamento independente de produção criativa.

## 🎯 Objetivo

Apresentar uma página clean e profissional para arrecadação via PIX, com foco em "financiar a próxima obra" e não em "pedir ajuda".

## ✨ Características

- **Design Minimalista**: Estilo Apple com tipografia limpa e espaçamento generoso
- **Hero Section**: Vídeo de fundo com overlay escuro (45-55%) para contraste
- **Responsivo**: Perfeito em mobile, tablet e desktop
- **Performance**: Otimizado para 4G e conexões lentas
- **Acessibilidade**: Suporte a teclado e leitores de tela
- **Funcionalidades PIX**:
  - QR Code clicável que copia a chave
  - Botão "Copiar chave" com feedback elegante
  - Toast notification discreto
  - Fallback para navegadores antigos

## 📱 Seções

### Hero
- Headline: "Enquanto cancelam histórias, eu continuo criando."
- Subheadline: "Independência criativa. Sem estúdio. Sem permissão."
- CTA: "Financiar a Próxima Obra"

### Manifesto
- Título: "Sem emissora. Sem investidores. Sem roteiro imposto."
- Descrição do projeto independente

### PIX
- QR Code (clicável)
- Chave PIX aleatória: `8e027698-75aa-4f73-9809-f9b576bf0e44`
- Botão copiar com feedback
- Link de contato

## 🚀 Como Usar

1. Substitua `hero-video.mp4` por seu vídeo (recomendado: MP4 otimizado, ~5-10MB)
2. Atualize `poster.jpg` com uma imagem de fallback
3. Modifique o email em "Parcerias e contato" conforme necessário
4. Deploy em qualquer servidor estático (Vercel, Netlify, GitHub Pages, etc.)

## 📁 Estrutura

```
getrich/
├── index.html       # Estrutura HTML
├── style.css        # Estilos (mobile-first)
├── script.js        # Funcionalidades JavaScript
├── qrcode.png       # QR Code PIX
├── hero-video.mp4   # Vídeo de fundo (adicionar)
├── poster.jpg       # Imagem fallback (adicionar)
└── README.md        # Este arquivo
```

## 🎨 Customização

### Cores
- Primária: `#0071e3` (Azul Apple)
- Texto: `#1d1d1f` (Preto Apple)
- Fundo: `#ffffff` / `#f5f5f7` (Branco Apple)

### Tipografia
- Font Stack: Sistema Apple (-apple-system, BlinkMacSystemFont, etc.)
- Fallback: Helvetica, Segoe UI

### Breakpoints
- Desktop: 1200px+
- Tablet: 769px - 1199px
- Mobile: até 768px
- Small Mobile: até 480px

## ⚡ Performance

- Imagens otimizadas (PNG/WebP)
- Vídeo comprimido (H.264, ~5-10MB)
- CSS minificado
- JavaScript vanilla (sem dependências)
- Lazy loading de vídeo
- Suporte a prefers-reduced-motion

## ♿ Acessibilidade

- Contraste WCAG AA
- Suporte a navegação por teclado
- ARIA labels apropriadas
- Fallback para Clipboard API
- Texto legível em todos os tamanhos

## 📊 Checklist de Entrega

- [x] Página responsiva perfeita
- [x] Vídeo hero com fallback
- [x] Botão copiar chave funcionando
- [x] Clique no QR copia a chave
- [x] Feedback elegante ("Chave copiada!")
- [x] Performance otimizada para mobile 4G
- [x] Design clean (sem emojis, sem cara de "vaquinha")
- [x] Linguagem de "financiar a próxima obra"

## 🔗 Links Úteis

- [Nubank PIX](https://www.nubank.com.br/pix/)
- [Apple Design Guidelines](https://developer.apple.com/design/)
- [Web Vitals](https://web.dev/vitals/)

---

**Criado com ❤️ para independência criativa**
