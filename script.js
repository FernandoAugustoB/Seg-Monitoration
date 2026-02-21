// --- Estado da Aplicação ---
let operadores = JSON.parse(localStorage.getItem('nodu_operadores')) || ["FERNANDO"];
let modelosConfig = JSON.parse(localStorage.getItem('nodu_templates')) || [];
let camposTemporarios = []; // Usado durante a criação de um novo modelo
let modeloAtivo = null;

// --- Seletores ---
const el = {
    operador: document.getElementById('select-operador'),
    menu: document.getElementById('menu-modelos'),
    formContainer: document.getElementById('formulario-container'),
    formTitulo: document.getElementById('form-titulo'),
    camposDinamicos: document.getElementById('campos-dinamicos'),
    resultadoContainer: document.getElementById('resultado-container'),
    textoFinal: document.getElementById('texto-final'),
    blocoNotas: document.getElementById('bloco-notas'),
    labelNota: document.getElementById('label-operador-nota'),
    badgeAutosave: document.getElementById('badge-autosave'),
    // Modais e Config
    modalOps: document.getElementById('modal-ops'),
    modalModelos: document.getElementById('modal-modelos'),
    listaCamposConfig: document.getElementById('lista-campos-config'),
    inputNovoOp: document.getElementById('input-novo-op')
};

// --- Inicialização ---
function init() {
    renderizarMenu();
    atualizarSelectOperadores();

    // Switch Editor
    document.getElementById('switch-editor').onchange = (e) => {
        modoEditor = e.target.checked;
        document.getElementById('btn-abrir-config-modelos').classList.toggle('hidden', !modoEditor);
        renderizarMenu(); // Re-renderiza para mostrar/esconder botões de edição
    };

    // Listeners Gerais
    document.getElementById('btn-gerenciar-ops').onclick = () => el.modalOps.classList.remove('hidden');
    document.getElementById('btn-fechar-modal').onclick = () => el.modalOps.classList.add('hidden');
    document.getElementById('btn-add-op').onclick = adicionarOperador;

    document.getElementById('btn-abrir-config-modelos').onclick = () => {
        editandoId = null;
        camposTemporarios = [];
        document.getElementById('model-nome').value = '';
        document.getElementById('model-template').value = '';
        renderizarCamposConfig();
        el.modalModelos.classList.remove('hidden');
    };
    document.getElementById('btn-fechar-modal-modelos').onclick = () => {
        el.modalModelos.classList.add('hidden');
        camposTemporarios = [];
        renderizarCamposConfig();
    };

    document.getElementById('btn-add-campo').onclick = adicionarCampoAoModelo;
    document.getElementById('btn-salvar-procedimento').onclick = salvarProcedimento;
    document.getElementById('btn-gerar').onclick = gerarRelatorio;
    document.getElementById('btn-copiar').onclick = copiarTexto;

    el.operador.onchange = trocarOperador;
    el.blocoNotas.oninput = salvarNotaPessoal;

    trocarOperador();
}

// --- Gerenciamento de Modelos Dinâmicos ---
function adicionarCampoAoModelo() {
    const label = document.getElementById('campo-label').value.trim();
    const type = document.getElementById('campo-type').value;
    const id = label.toLowerCase().replace(/\s+/g, '_');

    if (label) {
        camposTemporarios.push({ id, label, type });
        document.getElementById('campo-label').value = '';
        renderizarCamposConfig();
    }
}

function renderizarCamposConfig() {
    el.listaCamposConfig.innerHTML = camposTemporarios.map((c, index) => `
        <div class="flex justify-between bg-black p-2 border border-neutral-800 text-[10px] font-mono">
            <span>${c.label} (${c.type})</span>
            <button onclick="removerCampoTemp(${index})" class="text-red-500">REMOVER</button>
        </div>
    `).join('');
}

window.removerCampoTemp = (index) => {
    camposTemporarios.splice(index, 1);
    renderizarCamposConfig();
};

function salvarProcedimento() {
    const nome = document.getElementById('model-nome').value.trim();
    const template = document.getElementById('model-template').value;
    const id = editandoId || nome.toLowerCase().replace(/\s+/g, '_');

    if (nome && template && camposTemporarios.length > 0) {
        const novoModelo = { id, nome, template, campos: [...camposTemporarios] };

        if (editandoId) {
            // Atualiza modelo existente
            const index = modelosConfig.findIndex(m => m.id === editandoId);
            modelosConfig[index] = novoModelo;
        } else {
            // Adiciona novo
            modelosConfig.push(novoModelo);
        }

        localStorage.setItem('nodu_templates', JSON.stringify(modelosConfig));

        // Reset e UI
        editandoId = null;
        camposTemporarios = [];
        el.modalModelos.classList.add('hidden');
        renderizarMenu();
    } else {
        alert("Campos incompletos.");
    }
}

// --- Renderização do Menu com botões de EDITAR ---
function renderizarMenu() {
    el.menu.innerHTML = modelosConfig.map(m => `
        <div class="flex gap-1 mb-1 group">
            <button onclick="carregarModelo('${m.id}')" id="btn-${m.id}" 
                class="flex-1 text-left p-3 bg-neutral-950 hover:bg-neutral-900 border-l-4 border-transparent text-[11px] font-black uppercase tracking-widest text-neutral-500 transition-all">
                ${m.nome}
            </button>
            ${modoEditor ? `
                <button onclick="prepararEdicao('${m.id}')" class="bg-neutral-900 px-2 text-[10px] text-yellow-400 hover:bg-yellow-400 hover:text-black">EDIT</button>
                <button onclick="excluirModelo('${m.id}')" class="bg-neutral-900 px-2 text-[10px] text-red-600 hover:bg-red-600 hover:text-white">✕</button>
            ` : ''}
        </div>
    `).join('');
}

window.excluirModelo = (id) => {
    if (confirm("Deseja apagar este procedimento permanentemente?")) {
        modelosConfig = modelosConfig.filter(m => m.id !== id);
        localStorage.setItem('nodu_templates', JSON.stringify(modelosConfig));
        renderizarMenu();
        el.formContainer.classList.add('hidden');
    }
};

// --- Lógica de Formulário ---
function carregarModelo(id) {
    modeloAtivo = modelosConfig.find(m => m.id === id);
    const op = el.operador.value;

    document.querySelectorAll('#menu-modelos button').forEach(b => b.classList.remove('border-yellow-400', 'text-yellow-400', 'bg-neutral-900'));
    document.getElementById(`btn-${id}`).classList.add('border-yellow-400', 'text-yellow-400', 'bg-neutral-900');

    el.formTitulo.innerText = modeloAtivo.nome;
    el.camposDinamicos.innerHTML = '';

    modeloAtivo.campos.forEach(campo => {
        const storageKey = `${op}_${id}_${campo.id}`;
        const valorSalvo = localStorage.getItem(storageKey) || '';

        const div = document.createElement('div');
        const label = `<label class="block text-[10px] font-black text-neutral-600 mb-1 uppercase tracking-tighter">${campo.label}</label>`;
        const input = campo.type === 'textarea'
            ? `<textarea id="in-${campo.id}" oninput="autosave('${campo.id}')" class="w-full bg-black border border-neutral-800 p-3 text-white h-28 focus:outline-none font-mono text-xs focus:border-yellow-400/50 transition-all"></textarea>`
            : `<input type="${campo.type}" id="in-${campo.id}" oninput="autosave('${campo.id}')" class="w-full bg-black border border-neutral-800 p-3 text-white focus:outline-none font-mono text-xs focus:border-yellow-400/50 transition-all">`;

        div.innerHTML = label + input;
        el.camposDinamicos.appendChild(div);
        document.getElementById(`in-${campo.id}`).value = valorSalvo;
    });

    el.formContainer.classList.remove('hidden');
    el.resultadoContainer.classList.add('hidden');
}

function autosave(campoId) {
    const op = el.operador.value;
    const val = document.getElementById(`in-${campoId}`).value;
    localStorage.setItem(`${op}_${modeloAtivo.id}_${campoId}`, val);
    el.badgeAutosave.style.opacity = '1';
    setTimeout(() => el.badgeAutosave.style.opacity = '0', 800);
}

// --- Funções Auxiliares de Operador e Backup (Manter as que já tínhamos) ---
function adicionarOperador() {
    const nome = el.inputNovoOp.value.trim().toUpperCase();
    if (nome && !operadores.includes(nome)) {
        operadores.push(nome);
        localStorage.setItem('nodu_operadores', JSON.stringify(operadores));
        el.inputNovoOp.value = '';
        atualizarSelectOperadores();
        renderizarListaGerenciamento();
    }
}

function atualizarSelectOperadores() {
    el.operador.innerHTML = operadores.map(op => `<option value="${op}">${op}</option>`).join('');
}

function trocarOperador() {
    const op = el.operador.value;
    el.labelNota.innerText = `[${op}]`;
    el.blocoNotas.value = localStorage.getItem(`${op}_buffer`) || "";
    if (modeloAtivo) carregarModelo(modeloAtivo.id);
}

function salvarNotaPessoal() {
    localStorage.setItem(`${el.operador.value}_buffer`, el.blocoNotas.value);
}

function gerarRelatorio() {
    let output = modeloAtivo.template;
    const op = el.operador.value;
    output = output.replace(/{{operador}}/g, op.toUpperCase());

    modeloAtivo.campos.forEach(campo => {
        const val = document.getElementById(`in-${campo.id}`).value;
        const regex = new RegExp(`{{${campo.id}}}`, 'g');
        output = output.replace(regex, val);
    });

    el.textoFinal.innerText = output;
    el.resultadoContainer.classList.remove('hidden');
    copiarTexto(true);
}

function copiarTexto(silencioso = false) {
    const btn = document.getElementById('btn-copiar');
    navigator.clipboard.writeText(el.textoFinal.innerText).then(() => {
        if (!silencioso) {
            btn.innerText = "✓ COPIADO PARA O WHATSAPP";
            setTimeout(() => btn.innerText = "Relatório Copiado", 2000);
        }
    });
}

// --- Novas Variáveis de Estado ---
let modoEditor = false;
let editandoId = null; // Guarda o ID do modelo que está sendo editado


// --- Lógica de Edição ---
function prepararEdicao(id) {
    const modelo = modelosConfig.find(m => m.id === id);
    if (!modelo) return;

    editandoId = id;
    document.getElementById('model-nome').value = modelo.nome;
    document.getElementById('model-template').value = modelo.template;
    camposTemporarios = [...modelo.campos];

    renderizarCamposConfig();
    el.modalModelos.classList.remove('hidden');
}


// --- Exportação Unificada (Backup) ---
function exportarBackup() {
    // Fernando, aqui exportamos TUDO: Operadores, Dados Salvos e Templates
    const backupCompleto = {
        operadores: operadores,
        templates: modelosConfig,
        dados: {}
    };

    // Pega todos os dados de preenchimento (autosave) do localStorage
    Object.keys(localStorage).forEach(key => {
        if (key !== 'nodu_operadores' && key !== 'nodu_templates') {
            backupCompleto.dados[key] = localStorage.getItem(key);
        }
    });

    const blob = new Blob([JSON.stringify(backupCompleto)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `NEWSEG_CONFIG_TOTAL_${new Date().toLocaleDateString('pt-BR')}.json`;
    a.click();
}

function importarBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);

                if (data.operadores) localStorage.setItem('nodu_operadores', JSON.stringify(data.operadores));
                if (data.templates) localStorage.setItem('nodu_templates', JSON.stringify(data.templates));
                if (data.dados) {
                    Object.keys(data.dados).forEach(k => localStorage.setItem(k, data.dados[k]));
                }

                alert('Sincronização Total Concluída!');
                location.reload();
            } catch (err) {
                alert("Erro ao ler arquivo de backup.");
            }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}

// Iniciar Sistema
init();