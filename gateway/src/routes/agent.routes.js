/**
 * StockMind Gateway — Rutas del Agente IA (experimental)
 * =======================================================
 * Proxy seguro hacia Groq API para el asistente conversacional.
 * La API key nunca se expone al cliente — vive en el .env del gateway.
 *
 * Rutas:
 *   GET  /api/agent/status  → Verifica disponibilidad del agente
 *   POST /api/agent/query   → Envía mensaje y retorna respuesta del agente
 */

const express = require('express');
const router  = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const config = require('../config/config');


// ─── Contexto por módulo ─────────────────────────────────────────────────────
const PAGE_CONTEXT = {
  '/dashboard':   'Dashboard — resumen general de ventas, métricas del día y alertas de stock',
  '/products':    'Productos — catálogo, SKUs, precios, categorías y estado de stock',
  '/inventory':   'Inventario — movimientos de entrada/salida, ajustes y trazabilidad de stock',
  '/sales':       'Ventas — registro de ventas, historial y detalle por transacción',
  '/reports':     'Reportes — ventas por período, top productos y análisis de rendimiento',
  '/predictions': 'Predicciones — demanda futura estimada y recomendaciones de reabastecimiento',
  '/users':       'Usuarios — gestión de cuentas, roles y permisos',
};

function buildSystemPrompt(currentPage) {
  const pageCtx = PAGE_CONTEXT[currentPage] || 'Módulo general de StockMind';
  return `Eres el asistente de inteligencia artificial de StockMind, una plataforma de gestión de inventario y ventas para pequeñas y medianas empresas.

Tu rol: ayudar al usuario a entender sus datos de negocio, responder preguntas sobre inventario, ventas, predicciones de demanda y reportes. Sé conciso, directo y útil.

Contexto actual: el usuario está en el módulo de ${pageCtx}.

Reglas:
- Responde siempre en español
- Mantén respuestas cortas (máx 3-4 oraciones salvo que se pida más detalle)
- Si el usuario pregunta algo que requiere datos en tiempo real del sistema, indícalo claramente y orienta sobre dónde encontrar esa información en la plataforma
- Usa un tono profesional pero cercano
- No inventes datos numéricos específicos del negocio del usuario
- No solicites ni proceses información personal, financiera o confidencial
- Si te hacen preguntas críticas de negocio, recuerda que eres experimental`;
}

// ─── GET /api/agent/status ───────────────────────────────────────────────────
router.get('/status', authenticate, (req, res) => {
  const configured = !!config.groqApiKey && config.groqApiKey.length > 10;
  res.json({
    available: configured,
    model:     'llama-3.3-70b-versatile',
    provider:  'Groq',
  });
});

// ─── POST /api/agent/query ───────────────────────────────────────────────────
router.post('/query', authenticate, async (req, res, next) => {
  try {
    const { messages, currentPage } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'El campo messages es requerido y debe ser un array no vacío.' });
    }

    const groqMessages = [
      { role: 'system', content: buildSystemPrompt(currentPage || '/dashboard') },
      ...messages.slice(-10).map(m => ({
        role:    m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
    ];

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${config.groqApiKey}`,
      },
      body: JSON.stringify({
        model:       'llama-3.3-70b-versatile',
        messages:    groqMessages,
        temperature: 0.7,
        max_tokens:  400,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      if (groqRes.status === 429) return res.status(429).json({ error: 'Cuota de la API agotada. Intenta más tarde.', code: 'QUOTA_EXCEEDED' });
      if (groqRes.status === 401) return res.status(503).json({ error: 'Error de configuración del agente.', code: 'INVALID_KEY' });
      return res.status(502).json({ error: err?.error?.message || `Groq HTTP ${groqRes.status}`, code: 'GROQ_ERROR' });
    }

    const data  = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || 'Sin respuesta del agente.';
    res.json({ reply });

  } catch (e) { next(e); }
});

module.exports = router;
