// ===== COPY TO CLIPBOARD FUNCTIONALITY =====

const pixKey = '8e027698-75aa-4f73-9809-f9b576bf0e44';
const copyButton = document.getElementById('copy-button');
const qrCodeWrapper = document.getElementById('qr-code');
const toast = document.getElementById('toast');
const pixKeyInput = document.getElementById('pix-key');

/**
 * Copia a chave PIX para a área de transferência
 * com fallback para seleção manual em navegadores antigos
 */
async function copyToClipboard() {
    try {
        // Tenta usar a Clipboard API (mais moderna)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(pixKey);
            showToast();
        } else {
            // Fallback para navegadores antigos
            copyWithFallback();
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        copyWithFallback();
    }
}

/**
 * Fallback para copiar usando seleção de texto
 * (compatível com iOS/Android antigos)
 */
function copyWithFallback() {
    try {
        // Seleciona o texto do input
        pixKeyInput.select();
        pixKeyInput.setSelectionRange(0, 99999);

        // Tenta usar o comando copy
        if (document.execCommand('copy')) {
            showToast();
        } else {
            // Se falhar, mostra instrução ao usuário
            showToastMessage('Segure para copiar');
        }
    } catch (err) {
        console.error('Erro no fallback:', err);
        showToastMessage('Erro ao copiar');
    }
}

/**
 * Mostra o toast de feedback
 */
function showToast(message = 'Chave copiada!') {
    toast.textContent = message;
    toast.classList.add('show');

    // Remove a classe após 2 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function showToastMessage(message) {
    showToast(message);
}

// ===== EVENT LISTENERS =====

// Botão "Copiar chave"
if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
}

// QR Code clicável
if (qrCodeWrapper) {
    qrCodeWrapper.addEventListener('click', copyToClipboard);
    
    // Adiciona feedback visual ao clicar
    qrCodeWrapper.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });

    qrCodeWrapper.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });

    qrCodeWrapper.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ===== MOBILE OPTIMIZATION =====

// Detecta se está em dispositivo mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Se for mobile, adiciona classe para otimizações
if (isMobile) {
    document.body.classList.add('is-mobile');
}

// ===== PERFORMANCE: Lazy Loading de Vídeo =====

const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    // Inicia o carregamento do vídeo apenas quando visível
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(err => {
                    console.log('Autoplay bloqueado:', err);
                });
            }
        });
    });

    videoObserver.observe(heroVideo);
}

// ===== ACCESSIBILITY =====

// Adiciona suporte a teclado para o QR Code
if (qrCodeWrapper) {
    qrCodeWrapper.setAttribute('role', 'button');
    qrCodeWrapper.setAttribute('tabindex', '0');

    qrCodeWrapper.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copyToClipboard();
        }
    });
}

// ===== DEBUG (remover em produção) =====
console.log('Script carregado com sucesso');
console.log('Chave PIX:', pixKey);
