const propiedadesData = {
    "familias": [
        {"id": "mecanicas", "nombre": "Propiedades Mecánicas", "color": "#3B82F6", "icono": "⚙️", "propiedades": [{"id": "resistencia", "nombre": "Resistencia", "definicion": "Capacidad de soportar carga sin romperse", "aplicacion": "Puentes, edificios, vigas estructurales"}, {"id": "rigidez", "nombre": "Rigidez", "definicion": "Oposición a la deformación elástica", "aplicacion": "Estructuras que no deben deformarse"}, {"id": "ductilidad", "nombre": "Ductilidad", "definicion": "Capacidad de deformarse plásticamente antes de fractura", "aplicacion": "Cables, alambres de cobre"}, {"id": "dureza", "nombre": "Dureza", "definicion": "Resistencia al rayado y penetración", "aplicacion": "Herramientas de corte, brocas"}, {"id": "tenacidad", "nombre": "Tenacidad", "definicion": "Energía absorbida antes de la fractura", "aplicacion": "Herramientas de impacto"}]},
        {"id": "electricas", "nombre": "Propiedades Eléctricas", "color": "#FBBF24", "icono": "⚡", "propiedades": [{"id": "conductividad", "nombre": "Conductividad Eléctrica", "definicion": "Facilidad para transportar corriente eléctrica", "aplicacion": "Cables eléctricos, conexiones"}, {"id": "resistividad", "nombre": "Resistividad", "definicion": "Oposición al flujo de corriente eléctrica", "aplicacion": "Resistencias en circuitos"}, {"id": "semiconductividad", "nombre": "Semiconductividad", "definicion": "Conducción controlada de electricidad", "aplicacion": "Microchips, transistores, diodos"}, {"id": "permitividad", "nombre": "Permitividad", "definicion": "Respuesta a campos eléctricos externos", "aplicacion": "Capacitores, aislantes"}]},
        {"id": "termicas", "nombre": "Propiedades Térmicas", "color": "#EF4444", "icono": "🔥", "propiedades": [{"id": "conductividad-termica", "nombre": "Conductividad Térmica", "definicion": "Facilidad para transportar calor", "aplicacion": "Disipadores de calor, radiadores"}, {"id": "capacidad-calorifica", "nombre": "Capacidad Calorífica", "definicion": "Energía para aumentar temperatura", "aplicacion": "Sistemas de almacenamiento de calor"}, {"id": "expansion-termica", "nombre": "Expansión Térmica", "definicion": "Cambio en dimensiones con temperatura", "aplicacion": "Juntas de expansión en puentes"}, {"id": "difusividad-termica", "nombre": "Difusividad Térmica", "definicion": "Velocidad de propagación del calor", "aplicacion": "Materiales refractarios en hornos"}]},
        {"id": "magneticas", "nombre": "Propiedades Magnéticas", "color": "#A855F7", "icono": "🧲", "propiedades": [{"id": "ferromagnetismo", "nombre": "Ferromagnetismo", "definicion": "Atracción fuerte a campos magnéticos", "aplicacion": "Motores eléctricos, electroimanes"}, {"id": "paramagnetismo", "nombre": "Paramagnetismo", "definicion": "Atracción débil a campos magnéticos", "aplicacion": "Algunos metales no ferrosos"}, {"id": "diamagnetismo", "nombre": "Diamagnetismo", "definicion": "Repulsión a campos magnéticos", "aplicacion": "Blindaje magnético"}, {"id": "permeabilidad-magnetica", "nombre": "Permeabilidad Magnética", "definicion": "Facilidad para ser magnetizado", "aplicacion": "Núcleos de transformadores"}]},
        {"id": "opticas", "nombre": "Propiedades Ópticas", "color": "#22C55E", "icono": "💡", "propiedades": [{"id": "transparencia", "nombre": "Transparencia", "definicion": "Permite paso de luz sin dispersión", "aplicacion": "Lentes, ventanas, vidrios ópticos"}, {"id": "translucidez", "nombre": "Translucidez", "definicion": "Permite paso de luz pero dispersa", "aplicacion": "Vidrios esmerilados, plásticos opacos"}, {"id": "opacidad", "nombre": "Opacidad", "definicion": "Bloquea el paso de luz", "aplicacion": "Materiales de construcción"}, {"id": "indice-refraccion", "nombre": "Índice de Refracción", "definicion": "Medida de curvatura de luz", "aplicacion": "Fibras ópticas, lentes especiales"}]},
        {"id": "quimicas", "nombre": "Propiedades Químicas", "color": "#92400E", "icono": "⚗️", "propiedades": [{"id": "resistencia-corrosion", "nombre": "Resistencia a la Corrosión", "definicion": "Capacidad de soportar ataque ambiental", "aplicacion": "Tuberías marinas, estructuras costeras"}, {"id": "oxidacion", "nombre": "Oxidación", "definicion": "Reacción con oxígeno con pérdida de electrones", "aplicacion": "Formación de óxidos en metales"}, {"id": "degradacion-uv", "nombre": "Degradación UV", "definicion": "Deterioro por luz ultravioleta", "aplicacion": "Polímeros resistentes a UV"}, {"id": "estabilidad-quimica", "nombre": "Estabilidad Química", "definicion": "Resistencia a reacciones químicas", "aplicacion": "Recipientes para reactivos químicos"}]}
    ]
};

// ESTADO GLOBAL (Minimizado)
const state = {
    memoramaScore: 0,
    quizScore: 0,
    currentQuestion: 0,
    timerInterval: null,
    timerSeconds: 300,
    modoMemorama: 'competencia',
    todasLasPropiedades: [],
    leaderboard: [],
    quizPreguntas: [],
    flippedCards: new Set(),
    matchedCards: new Set()
};

// DELEGACIÓN DE EVENTOS (Event Delegation)
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Tabs
    if (target.classList.contains('tab-btn')) switchTab(target.dataset.tab);
    
    // Memorama
    if (target.classList.contains('card')) flipCard(target);
    if (target.classList.contains('modo-btn')) setModoMemorama(target.dataset.modo);
    if (target.dataset.action === 'reset-memorama') resetMemorama();
    
    // Quiz
    if (target.dataset.action === 'start-quiz') startQuiz();
    if (target.dataset.action === 'reset-quiz') resetQuiz();
    if (target.classList.contains('option')) seleccionarRespuesta(target);
    
    // Leaderboard
    if (target.dataset.action === 'clear-leaderboard') clearLeaderboard();
});

// ============================================
// INICIALIZACIÓN
// ============================================
function initApp() {
    // Cargar datos
    state.todasLasPropiedades = propiedadesData.familias.flatMap(f => 
        f.propiedades.map(p => ({...p, familia: f.nombre, color: f.color}))
    );
    
    // Cargar leaderboard
    state.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // Inicializar componentes
    initMemorama();
    updateLeaderboard();
}

// ============================================
// TABS
// ============================================
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    const tab = document.getElementById(tabName);
    if (tab) {
        tab.classList.add('active');
        event.target.classList.add('active');
    }
}

// ============================================
// MEMORAMA (Optimizado)
// ============================================
function initMemorama() {
    const container = document.getElementById('memorama-container');
    if (!container) return;
    
    container.innerHTML = '';
    state.memoramaScore = 0;
    state.flippedCards.clear();
    state.matchedCards.clear();
    updateMemoramaScore();

    // Seleccionar 6 propiedades aleatorias
    const propiedades = [...state.todasLasPropiedades]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
    
    // Crear pares
    const pares = propiedades.flatMap(prop => [
        {type: 'nombre', value: prop.nombre, id: prop.id},
        {type: 'definicion', value: prop.definicion, id: prop.id}
    ]).sort(() => Math.random() - 0.5);

    // Renderizar tarjetas
    pares.forEach((par, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '?';
        card.dataset.index = index;
        card.dataset.type = par.type;
        card.dataset.id = par.id;
        card.dataset.value = par.value;
        container.appendChild(card);
    });

    if (state.modoMemorama === 'competencia') {
        startTimer();
    }
}

function flipCard(card) {
    if (card.classList.contains('matched') || state.flippedCards.has(card.dataset.index)) return;

    card.classList.add('flipped');
    card.innerHTML = `<div style="font-size:0.8em;">${card.dataset.value}</div>`;
    state.flippedCards.add(card.dataset.index);

    if (state.flippedCards.size === 2) {
        const flipped = Array.from(document.querySelectorAll('.card.flipped:not(.matched)'));
        setTimeout(() => checkMatch(flipped), 500);
    }
}

function checkMatch(cards) {
    if (cards[0].dataset.id === cards[1].dataset.id) {
        cards.forEach(card => {
            card.classList.add('matched');
            state.matchedCards.add(card.dataset.index);
        });
        state.memoramaScore += 10;
        updateMemoramaScore();

        if (state.matchedCards.size === document.querySelectorAll('.card').length) {
            clearInterval(state.timerInterval);
            setTimeout(() => {
                guardarPuntuacion('Memorama', state.memoramaScore, state.modoMemorama);
                alert(`¡Ganaste! Puntuación: ${state.memoramaScore} puntos`);
            }, 300);
        }
    } else {
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.innerHTML = '?';
            state.flippedCards.delete(card.dataset.index);
        });
    }
}

function updateMemoramaScore() {
    const el = document.getElementById('memorama-score');
    if (el) el.textContent = `${state.memoramaScore} puntos`;
}

function setModoMemorama(modo) {
    state.modoMemorama = modo;
    document.querySelectorAll('.modo-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    resetMemorama();
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    if (!timerDisplay) return;
    
    timerDisplay.style.display = 'block';
    state.timerSeconds = 300;

    state.timerInterval = setInterval(() => {
        state.timerSeconds--;
        const mins = Math.floor(state.timerSeconds / 60);
        const secs = state.timerSeconds % 60;
        const display = document.getElementById('timer-display');
        if (display) display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        if (state.timerSeconds <= 0) {
            clearInterval(state.timerInterval);
            document.querySelectorAll('.card').forEach(card => card.style.pointerEvents = 'none');
            guardarPuntuacion('Memorama', state.memoramaScore, 'competencia');
            alert(`¡Tiempo terminado! Puntuación: ${state.memoramaScore} puntos`);
        }
    }, 1000);
}

function resetMemorama() {
    clearInterval(state.timerInterval);
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) timerDisplay.style.display = 'none';
    initMemorama();
}

// ============================================
// QUIZ (Optimizado)
// ============================================
function startQuiz() {
    state.quizPreguntas = generarPreguntas();
    state.quizScore = 0;
    state.currentQuestion = 0;
    mostrarPregunta();
}

function generarPreguntas() {
    const preguntas = [];
    const props = [...state.todasLasPropiedades];

    for (let i = 0; i < 10; i++) { // Reducido de 20 a 10 para mayor velocidad
        const prop = props[Math.floor(Math.random() * props.length)];
        const tipo = Math.random() > 0.5 ? 'definicion' : 'aplicacion';

        preguntas.push({
            tipo: tipo,
            pregunta: tipo === 'definicion' 
                ? `¿Cuál es la definición de "${prop.nombre}"?`
                : `¿Cuál es una aplicación de "${prop.nombre}"?`,
            respuestaCorrecta: tipo === 'definicion' ? prop.definicion : prop.aplicacion,
            familia: prop.familia,
            opciones: generarOpciones(tipo === 'definicion' ? prop.definicion : prop.aplicacion, props)
        });
    }

    return preguntas;
}

function generarOpciones(respuestaCorrecta, props) {
    const opciones = [respuestaCorrecta];

    while (opciones.length < 4) {
        const prop = props[Math.floor(Math.random() * props.length)];
        const opcion = Math.random() > 0.5 ? prop.definicion : prop.aplicacion;
        if (!opciones.includes(opcion)) {
            opciones.push(opcion);
        }
    }

    return opciones.sort(() => Math.random() - 0.5);
}

function mostrarPregunta() {
    if (state.currentQuestion >= state.quizPreguntas.length) {
        mostrarResultados();
        return;
    }

    const pregunta = state.quizPreguntas[state.currentQuestion];
    const container = document.getElementById('quiz-questions');
    if (!container) return;

    container.innerHTML = `
        <div class="question">
            <h3>${pregunta.pregunta}</h3>
            <p style="color:#999; font-size:0.9em;">Familia: ${pregunta.familia}</p>
            <div class="options">
                ${pregunta.opciones.map((opcion, idx) => `
                    <div class="option" data-opcion="${opcion}" data-correcta="${pregunta.respuestaCorrecta}">
                        ${opcion}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    actualizarProgreso();
}

function seleccionarRespuesta(target) {
    if (!target.classList.contains('option')) return;

    const respuesta = target.dataset.opcion;
    const correcta = target.dataset.correcta;
    const opciones = document.querySelectorAll('.option');
    
    opciones.forEach(op => op.style.pointerEvents = 'none');

    if (respuesta === correcta) {
        target.classList.add('correct');
        state.quizScore++;
    } else {
        target.classList.add('incorrect');
        opciones.forEach(op => {
            if (op.dataset.opcion === correcta) {
                op.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        state.currentQuestion++;
        mostrarPregunta();
    }, 1500);
}

function actualizarProgreso() {
    const total = state.quizPreguntas.length;
    const progress = document.getElementById('quiz-progress');
    const correct = document.getElementById('quiz-correct');
    const incorrect = document.getElementById('quiz-incorrect');
    
    if (progress) progress.textContent = `${state.currentQuestion + 1}/${total}`;
    if (correct) correct.textContent = state.quizScore;
    if (incorrect) incorrect.textContent = state.currentQuestion - state.quizScore;
}

function mostrarResultados() {
    const porcentaje = Math.round((state.quizScore / state.quizPreguntas.length) * 100);
    const container = document.getElementById('quiz-questions');
    if (!container) return;

    container.innerHTML = `
        <div style="text-align:center; padding:30px;">
            <h2 style="color:#667eea; font-size:2em;">¡Quiz Completado!</h2>
            <p style="font-size:1.5em; margin:20px 0;">Puntuación: ${state.quizScore}/${state.quizPreguntas.length}</p>
            <p style="font-size:1.2em; color:#666;">Porcentaje: ${porcentaje}%</p>
            <button class="btn" data-action="start-quiz" style="margin-top:20px;">🔄 Intentar de Nuevo</button>
        </div>
    `;

    guardarPuntuacion('Quiz', state.quizScore * 10, 'quiz');
}

function resetQuiz() {
    const container = document.getElementById('quiz-questions');
    if (container) container.innerHTML = '<p style="text-align:center; color:#999;">Haz clic en "Comenzar Quiz" para empezar</p>';
}

// ============================================
// LEADERBOARD
// ============================================
function updateLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    
    if (state.leaderboard.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#999;">No hay datos aún</td></tr>';
        return;
    }

    const top3 = [...state.leaderboard]
        .sort((a, b) => b.puntuacion - a.puntuacion)
        .slice(0, 3);
    const medallas = ['🥇', '🥈', '🥉'];

    tbody.innerHTML = top3.map((entry, idx) => `
        <tr>
            <td><span class="medal">${medallas[idx]}</span></td>
            <td>${entry.nombre || 'Anónimo'}</td>
            <td>${entry.puntuacion}</td>
            <td>${entry.modo}</td>
        </tr>
    `).join('');
}

function guardarPuntuacion(modo, puntuacion, tipoModo) {
    const nombre = prompt('Ingresa tu nombre para guardar tu puntuación:');
    if (!nombre) return;

    state.leaderboard.push({
        nombre: nombre,
        puntuacion: puntuacion,
        modo: modo,
        fecha: new Date().toLocaleDateString()
    });

    localStorage.setItem('leaderboard', JSON.stringify(state.leaderboard));
    updateLeaderboard();
}

function clearLeaderboard() {
    if (confirm('¿Estás seguro de que deseas limpiar la clasificación?')) {
        state.leaderboard = [];
        localStorage.removeItem('leaderboard');
        updateLeaderboard();
    }
}
