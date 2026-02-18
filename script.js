 const propiedadesData = {
            "familias": [
                {
                    "id": "mecanicas",
                    "nombre": "Propiedades Mecánicas",
                    "color": "#3B82F6",
                    "icono": "⚙️",
                    "propiedades": [
                        {"id": "resistencia", "nombre": "Resistencia", "definicion": "Capacidad de soportar carga sin romperse", "aplicacion": "Puentes, edificios, vigas estructurales"},
                        {"id": "rigidez", "nombre": "Rigidez", "definicion": "Oposición a la deformación elástica", "aplicacion": "Estructuras que no deben deformarse"},
                        {"id": "ductilidad", "nombre": "Ductilidad", "definicion": "Capacidad de deformarse plásticamente antes de fractura", "aplicacion": "Cables, alambres de cobre"},
                        {"id": "dureza", "nombre": "Dureza", "definicion": "Resistencia al rayado y penetración", "aplicacion": "Herramientas de corte, brocas"},
                        {"id": "tenacidad", "nombre": "Tenacidad", "definicion": "Energía absorbida antes de la fractura", "aplicacion": "Herramientas de impacto"}
                    ]
                },
                {
                    "id": "electricas",
                    "nombre": "Propiedades Eléctricas",
                    "color": "#FBBF24",
                    "icono": "⚡",
                    "propiedades": [
                        {"id": "conductividad", "nombre": "Conductividad Eléctrica", "definicion": "Facilidad para transportar corriente eléctrica", "aplicacion": "Cables eléctricos, conexiones"},
                        {"id": "resistividad", "nombre": "Resistividad", "definicion": "Oposición al flujo de corriente eléctrica", "aplicacion": "Resistencias en circuitos"},
                        {"id": "semiconductividad", "nombre": "Semiconductividad", "definicion": "Conducción controlada de electricidad", "aplicacion": "Microchips, transistores, diodos"},
                        {"id": "permitividad", "nombre": "Permitividad", "definicion": "Respuesta a campos eléctricos externos", "aplicacion": "Capacitores, aislantes"}
                    ]
                },
                {
                    "id": "termicas",
                    "nombre": "Propiedades Térmicas",
                    "color": "#EF4444",
                    "icono": "🔥",
                    "propiedades": [
                        {"id": "conductividad-termica", "nombre": "Conductividad Térmica", "definicion": "Facilidad para transportar calor", "aplicacion": "Disipadores de calor, radiadores"},
                        {"id": "capacidad-calorifica", "nombre": "Capacidad Calorífica", "definicion": "Energía para aumentar temperatura", "aplicacion": "Sistemas de almacenamiento de calor"},
                        {"id": "expansion-termica", "nombre": "Expansión Térmica", "definicion": "Cambio en dimensiones con temperatura", "aplicacion": "Juntas de expansión en puentes"},
                        {"id": "difusividad-termica", "nombre": "Difusividad Térmica", "definicion": "Velocidad de propagación del calor", "aplicacion": "Materiales refractarios en hornos"}
                    ]
                },
                {
                    "id": "magneticas",
                    "nombre": "Propiedades Magnéticas",
                    "color": "#A855F7",
                    "icono": "🧲",
                    "propiedades": [
                        {"id": "ferromagnetismo", "nombre": "Ferromagnetismo", "definicion": "Atracción fuerte a campos magnéticos", "aplicacion": "Motores eléctricos, electroimanes"},
                        {"id": "paramagnetismo", "nombre": "Paramagnetismo", "definicion": "Atracción débil a campos magnéticos", "aplicacion": "Algunos metales no ferrosos"},
                        {"id": "diamagnetismo", "nombre": "Diamagnetismo", "definicion": "Repulsión a campos magnéticos", "aplicacion": "Blindaje magnético"},
                        {"id": "permeabilidad-magnetica", "nombre": "Permeabilidad Magnética", "definicion": "Facilidad para ser magnetizado", "aplicacion": "Núcleos de transformadores"}
                    ]
                },
                {
                    "id": "opticas",
                    "nombre": "Propiedades Ópticas",
                    "color": "#22C55E",
                    "icono": "💡",
                    "propiedades": [
                        {"id": "transparencia", "nombre": "Transparencia", "definicion": "Permite paso de luz sin dispersión", "aplicacion": "Lentes, ventanas, vidrios ópticos"},
                        {"id": "translucidez", "nombre": "Translucidez", "definicion": "Permite paso de luz pero dispersa", "aplicacion": "Vidrios esmerilados, plásticos opacos"},
                        {"id": "opacidad", "nombre": "Opacidad", "definicion": "Bloquea el paso de luz", "aplicacion": "Materiales de construcción"},
                        {"id": "indice-refraccion", "nombre": "Índice de Refracción", "definicion": "Medida de curvatura de luz", "aplicacion": "Fibras ópticas, lentes especiales"}
                    ]
                },
                {
                    "id": "quimicas",
                    "nombre": "Propiedades Químicas",
                    "color": "#92400E",
                    "icono": "⚗️",
                    "propiedades": [
                        {"id": "resistencia-corrosion", "nombre": "Resistencia a la Corrosión", "definicion": "Capacidad de soportar ataque ambiental", "aplicacion": "Tuberías marinas, estructuras costeras"},
                        {"id": "oxidacion", "nombre": "Oxidación", "definicion": "Reacción con oxígeno con pérdida de electrones", "aplicacion": "Formación de óxidos en metales"},
                        {"id": "degradacion-uv", "nombre": "Degradación UV", "definicion": "Deterioro por luz ultravioleta", "aplicacion": "Polímeros resistentes a UV"},
                        {"id": "estabilidad-quimica", "nombre": "Estabilidad Química", "definicion": "Resistencia a reacciones químicas", "aplicacion": "Recipientes para reactivos químicos"}
                    ]
                }
            ]
        };

        // VARIABLES GLOBALES
        let memoramaScore = 0;
        let quizScore = 0;
        let quizTotal = 0;
        let currentQuestion = 0;
        let timerInterval = null;
        let timerSeconds = 300; // 5 minutos
        let modoMemorama = 'competencia';
        let todasLasPropiedades = [];
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

        // INICIALIZAR
        function init() {
            todasLasPropiedades = propiedadesData.familias.flatMap(f => 
                f.propiedades.map(p => ({...p, familia: f.nombre, color: f.color}))
            );
            initMemorama();
            initQuiz();
            updateLeaderboard();
        }

        // TABS
        function switchTab(tab) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
            event.target.classList.add('active');
        }

        // MEMORAMA
        function initMemorama() {
            const container = document.getElementById('memorama-container');
            container.innerHTML = '';
            memoramaScore = 0;
            updateMemoramaScore();

            const propiedades = [...todasLasPropiedades].sort(() => Math.random() - 0.5).slice(0, 6);
            const pares = [];

            propiedades.forEach(prop => {
                pares.push({type: 'nombre', value: prop.nombre, id: prop.id});
                pares.push({type: 'definicion', value: prop.definicion, id: prop.id});
            });

            pares.sort(() => Math.random() - 0.5);

            pares.forEach((par, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = '?';
                card.dataset.index = index;
                card.dataset.type = par.type;
                card.dataset.id = par.id;
                card.dataset.value = par.value;
                card.onclick = () => flipCard(card);
                container.appendChild(card);
            });

            if (modoMemorama === 'competencia') {
                startTimer();
            }
        }

        function flipCard(card) {
            if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

            card.classList.add('flipped');
            card.innerHTML = `<div style="font-size:0.8em;">${card.dataset.value}</div>`;

            const flipped = document.querySelectorAll('.card.flipped:not(.matched)');
            if (flipped.length === 2) {
                setTimeout(() => checkMatch(flipped), 500);
            }
        }

        function checkMatch(cards) {
            if (cards[0].dataset.id === cards[1].dataset.id) {
                cards.forEach(card => card.classList.add('matched'));
                memoramaScore += 10;
                updateMemoramaScore();

                if (document.querySelectorAll('.card.matched').length === document.querySelectorAll('.card').length) {
                    alert(`¡Ganaste! Puntuación: ${memoramaScore}`);
                    if (modoMemorama === 'competencia') clearInterval(timerInterval);
                }
            } else {
                cards.forEach(card => {
                    card.classList.remove('flipped');
                    card.innerHTML = '?';
                });
            }
        }

        function startTimer() {
            timerSeconds = 300; // 5 minutos
            document.getElementById('timer').style.display = 'block';
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                timerSeconds--;
                document.getElementById('timer-display').innerHTML = timerSeconds + 's';
                if (timerSeconds <= 0) {
                    clearInterval(timerInterval);
                    alert('¡Tiempo terminado!');
                    resetMemorama();
                }
            }, 1000);
        }

        function setModoMemorama(modo) {
            modoMemorama = modo;
            document.querySelectorAll('.modo-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            if (modo === 'competencia') {
                document.getElementById('timer').style.display = 'block';
            } else {
                document.getElementById('timer').style.display = 'none';
                clearInterval(timerInterval);
            }
            resetMemorama();
        }

        function updateMemoramaScore() {
            document.getElementById('memorama-score').innerHTML = memoramaScore + ' puntos';
        }

        function resetMemorama() {
            clearInterval(timerInterval);
            initMemorama();
        }

        function nextMemorama() {
            resetMemorama();
        }

        // QUIZ
        function initQuiz() {
            quizScore = 0;
            currentQuestion = 0;
            quizTotal = 10;
            generateQuizQuestions();
            showQuestion();
        }

        let quizQuestions = [];

        function generateQuizQuestions() {
            quizQuestions = [];
            const bancoPreguntas = [
                // PREGUNTAS SOBRE DEFINICIONES
                ...todasLasPropiedades.map(prop => ({
                    tipo: 'definicion',
                    pregunta: `¿Cuál es la definición de ${prop.nombre}?`,
                    respuestaCorrecta: prop.definicion,
                    propiedad: prop.nombre,
                    familia: prop.familia
                })),
                // PREGUNTAS SOBRE APLICACIONES
                ...todasLasPropiedades.map(prop => ({
                    tipo: 'aplicacion',
                    pregunta: `¿Cuál es una aplicación de ${prop.nombre}?`,
                    respuestaCorrecta: prop.aplicacion,
                    propiedad: prop.nombre,
                    familia: prop.familia
                })),
                // PREGUNTAS SOBRE FAMILIA
                ...todasLasPropiedades.map(prop => ({
                    tipo: 'familia',
                    pregunta: `¿A qué familia pertenece la propiedad '${prop.nombre}'?`,
                    respuestaCorrecta: prop.familia,
                    propiedad: prop.nombre,
                    familia: prop.familia
                })),
                // PREGUNTAS DE COMPARACIÓN
                {
                    tipo: 'comparacion',
                    pregunta: 'La ductilidad es la capacidad de deformarse plásticamente. ¿Cuál es lo opuesto?',
                    respuestaCorrecta: 'Fragilidad',
                    propiedad: 'Ductilidad',
                    familia: 'Propiedades Mecánicas'
                },
                {
                    tipo: 'comparacion',
                    pregunta: 'La conductividad eléctrica es alta en el cobre. ¿Cuál material tiene baja conductividad?',
                    respuestaCorrecta: 'Vidrio',
                    propiedad: 'Conductividad',
                    familia: 'Propiedades Eléctricas'
                },
                {
                    tipo: 'comparacion',
                    pregunta: 'El ferromagnetismo es atracción fuerte a campos magnéticos. ¿Qué es el diamagnetismo?',
                    respuestaCorrecta: 'Repulsión a campos magnéticos',
                    propiedad: 'Magnetismo',
                    familia: 'Propiedades Magnéticas'
                },
                // PREGUNTAS DE IDENTIFICACIÓN
                {
                    tipo: 'identificacion',
                    pregunta: 'Un material que permite el paso de luz sin dispersión es:',
                    respuestaCorrecta: 'Transparente',
                    propiedad: 'Transparencia',
                    familia: 'Propiedades Ópticas'
                },
                {
                    tipo: 'identificacion',
                    pregunta: 'La formación de óxido en hierro es un ejemplo de:',
                    respuestaCorrecta: 'Oxidación',
                    propiedad: 'Oxidación',
                    familia: 'Propiedades Químicas'
                },
                {
                    tipo: 'identificacion',
                    pregunta: 'La resistencia de un material a rayarse es su:',
                    respuestaCorrecta: 'Dureza',
                    propiedad: 'Dureza',
                    familia: 'Propiedades Mecánicas'
                },
                // PREGUNTAS DE APLICACIÓN PRÁCTICA
                {
                    tipo: 'practica',
                    pregunta: 'Para construir un puente que soporte mucho peso, ¿qué propiedad es más importante?',
                    respuestaCorrecta: 'Resistencia',
                    propiedad: 'Resistencia',
                    familia: 'Propiedades Mecánicas'
                },
                {
                    tipo: 'practica',
                    pregunta: '¿Cuál es la propiedad más importante en los cables eléctricos?',
                    respuestaCorrecta: 'Conductividad Eléctrica',
                    propiedad: 'Conductividad',
                    familia: 'Propiedades Eléctricas'
                },
                {
                    tipo: 'practica',
                    pregunta: 'En un disipador de calor de computadora, ¿qué propiedad es crítica?',
                    respuestaCorrecta: 'Conductividad Térmica',
                    propiedad: 'Conductividad Térmica',
                    familia: 'Propiedades Térmicas'
                },
                {
                    tipo: 'practica',
                    pregunta: 'Para tuberías en ambientes marinos, ¿qué propiedad es esencial?',
                    respuestaCorrecta: 'Resistencia a la Corrosión',
                    propiedad: 'Resistencia a la Corrosión',
                    familia: 'Propiedades Químicas'
                },
                {
                    tipo: 'practica',
                    pregunta: '¿Qué propiedad permite que las fibras ópticas transmitan información?',
                    respuestaCorrecta: 'Índice de Refracción',
                    propiedad: 'Índice de Refracción',
                    familia: 'Propiedades Ópticas'
                }
            ];

            // Seleccionar 20 preguntas aleatorias del banco
            const preguntasAleatorias = bancoPreguntas.sort(() => Math.random() - 0.5).slice(0, 20);
            quizTotal = preguntasAleatorias.length;

            preguntasAleatorias.forEach(q => {
                const opciones = [q.respuestaCorrecta];
                
                // Generar opciones incorrectas
                const propiedadesAleatorias = todasLasPropiedades.sort(() => Math.random() - 0.5).slice(0, 10);
                
                while (opciones.length < 4) {
                    let opcionIncorrecta;
                    
                    if (q.tipo === 'definicion') {
                        opcionIncorrecta = propiedadesAleatorias[opciones.length - 1]?.definicion;
                    } else if (q.tipo === 'aplicacion') {
                        opcionIncorrecta = propiedadesAleatorias[opciones.length - 1]?.aplicacion;
                    } else if (q.tipo === 'familia') {
                        const familias = [...new Set(todasLasPropiedades.map(p => p.familia))];
                        opcionIncorrecta = familias[Math.floor(Math.random() * familias.length)];
                    } else {
                        opcionIncorrecta = ['Fragilidad', 'Conductividad', 'Vidrio', 'Transparente', 'Oxidación', 'Dureza', 'Resistencia'][Math.floor(Math.random() * 7)];
                    }
                    
                    if (opcionIncorrecta && !opciones.includes(opcionIncorrecta)) {
                        opciones.push(opcionIncorrecta);
                    }
                }

                quizQuestions.push({
                    pregunta: q.pregunta,
                    opciones: opciones.sort(() => Math.random() - 0.5),
                    respuestaCorrecta: q.respuestaCorrecta,
                    propiedad: q.propiedad,
                    familia: q.familia
                });
            });
        }

        function showQuestion() {
            if (currentQuestion >= quizTotal) {
                showQuizResults();
                return;
            }

            const q = quizQuestions[currentQuestion];
            const container = document.getElementById('quiz-container');
            container.innerHTML = `
                <div class="question">
                    <h3>${q.pregunta}</h3>
                    <p style="color:#999; font-size:0.9em;">Familia: ${q.familia}</p>
                    <div class="options">
                        ${q.opciones.map((opt, i) => `
                            <div class="option" onclick="selectOption(this, '${opt}', '${q.respuestaCorrecta}')">${opt}</div>
                        `).join('')}
                    </div>
                </div>
            `;

            document.getElementById('quiz-progress').innerHTML = `Pregunta ${currentQuestion + 1} de ${quizTotal} | Familia: ${q.familia}`;
            document.getElementById('next-btn').style.display = 'none';
        }

        function selectOption(element, selected, correct) {
            document.querySelectorAll('.option').forEach(opt => opt.onclick = null);

            if (selected === correct) {
                element.classList.add('correct');
                quizScore++;
            } else {
                element.classList.add('incorrect');
                document.querySelectorAll('.option').forEach(opt => {
                    if (opt.innerHTML === correct) opt.classList.add('correct');
                });
            }

            document.getElementById('quiz-score').innerHTML = `${quizScore} / ${quizTotal}`;
            document.getElementById('next-btn').style.display = 'block';
        }

        function nextQuestion() {
            currentQuestion++;
            showQuestion();
        }

        function showQuizResults() {
            const container = document.getElementById('quiz-container');
            const porcentaje = Math.round((quizScore / quizTotal) * 100);
            container.innerHTML = `
                <div style="text-align:center;">
                    <h2 style="color:#667eea; font-size:2em; margin-bottom:10px;">¡Quiz Completado!</h2>
                    <p style="font-size:1.5em; color:#333; margin-bottom:20px;">Puntuación: ${quizScore}/${quizTotal} (${porcentaje}%)</p>
                    <p style="font-size:1.1em; color:#666;">
                        ${porcentaje >= 80 ? '¡Excelente trabajo!' : porcentaje >= 60 ? 'Buen intento, sigue practicando' : 'Necesitas estudiar más'}
                    </p>
                </div>
            `;
            document.getElementById('next-btn').style.display = 'none';
        }

        function resetQuiz() {
            initQuiz();
        }

        // LEADERBOARD
        function updateLeaderboard() {
            const tbody = document.getElementById('leaderboard-body');
            const top3 = leaderboard.sort((a, b) => b.puntuacion - a.puntuacion).slice(0, 3);

            if (top3.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#999;">No hay puntuaciones aún</td></tr>';
                return;
            }

            tbody.innerHTML = top3.map((entry, i) => `
                <tr>
                    <td><span class="medal rank-${i+1}">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span></td>
                    <td>${entry.nombre}</td>
                    <td style="font-weight:bold; color:#667eea;">${entry.puntuacion}</td>
                    <td>${entry.modo}</td>
                </tr>
            `).join('');
        }

        function guardarPuntuacion() {
            const nombre = prompt('¿Cuál es tu nombre?');
            if (!nombre) return;

            const puntuacion = Math.max(memoramaScore, quizScore);
            const modo = 'Competencia';

            leaderboard.push({nombre, puntuacion, modo});
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

            updateLeaderboard();
            alert('¡Puntuación guardada!');
        }

        // INICIAR
        init();