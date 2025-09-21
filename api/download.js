// API para download seguro do PDF com token assinado
// Este arquivo deve ser deployado como uma função serverless no Vercel

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET || 'your-secret-key';

// Função para verificar token assinado
function verifySignedToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const { paymentId, expiresAt, signature } = decoded;
    
    // Verificar se o token expirou
    if (new Date() > new Date(expiresAt)) {
      return { valid: false, error: 'Token expirado' };
    }
    
    // Verificar assinatura
    const payload = { paymentId, expiresAt };
    const expectedSignature = crypto
      .createHmac('sha256', DOWNLOAD_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return { valid: false, error: 'Token inválido' };
    }
    
    return { valid: true, paymentId };
  } catch (error) {
    return { valid: false, error: 'Token malformado' };
  }
}

export default async function handler(req, res) {
  // Permitir apenas GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verificar token
    const verification = verifySignedToken(token);
    
    if (!verification.valid) {
      return res.status(403).json({ error: verification.error });
    }

    console.log('Download autorizado para pagamento:', verification.paymentId);

    // Caminho para o PDF
    const pdfPath = path.join(process.cwd(), 'public', 'CursoIA.pdf');
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(pdfPath)) {
      console.error('PDF não encontrado:', pdfPath);
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }

    // Ler o arquivo
    const pdfBuffer = fs.readFileSync(pdfPath);
    
    // Configurar headers para download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Videos-Craft-IA-Curso.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Enviar o arquivo
    res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error('Erro no download:', error);
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
