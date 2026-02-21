// --- Estado da Aplicação ---
let operadores = JSON.parse(localStorage.getItem('operadores')) || ["FERNANDO"];
let modelosConfig = JSON.parse(localStorage.getItem('templates')) || [];
let camposTemporarios = []; // Usado durante a criação de um novo modelo
let historicoGlobal = JSON.parse(localStorage.getItem('nodu_historico')) || {};
let modeloAtivo = null;
let modoEditor = false;
let editandoId = null; // Guarda o ID do modelo que está sendo editado

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
        renderizarMenu();
    };

    document.getElementById('model-has-template').onchange = (e) => {
        const templateInput = document.getElementById('template-campo');
        if (e.target.checked) {
            templateInput.classList.remove('hidden');
        } else {
            templateInput.classList.add('hidden');
        }
    }

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
    document.getElementById('btn-backup').onclick = exportarTudo;
    document.getElementById('btn-import').onclick = importarTudo;

    el.operador.onchange = trocarOperador;
    el.blocoNotas.oninput = salvarNotaPessoal;

    trocarOperador();
}

// --- Gerenciamento de Modelos Dinâmicos ---
function adicionarCampoAoModelo() {
    const label = document.getElementById('campo-label').value.trim();
    const type = document.getElementById('campo-type').value;
    const autocomplete = document.getElementById('campo-autocomplete').checked; // Novo
    const id = label.toLowerCase().replace(/\s+/g, '_');

    if (label) {
        camposTemporarios.push({ id, label, type, autocomplete });
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
    const hasTemplate = document.getElementById('model-has-template').checked; // Esconde o botão de adicionar operador durante a configuração

    document.getElementById('btn-add-op').classList.add('hidden');

    if (nome && template && camposTemporarios.length > 0) {
        const novoModelo = {
            id,
            nome,
            template: hasTemplate ? template : null, // Se desativado, salva null
            campos: [...camposTemporarios]
        };

        if (editandoId) {
            // Atualiza modelo existente
            const index = modelosConfig.findIndex(m => m.id === editandoId);
            modelosConfig[index] = novoModelo;
        } else {
            // Adiciona novo
            modelosConfig.push(novoModelo);
        }

        localStorage.setItem('templates', JSON.stringify(modelosConfig));

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
        localStorage.setItem('templates', JSON.stringify(modelosConfig));
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
        if (campo.autocomplete) {
            inputElement.setAttribute('list', `list-${campo.id}`);
            atualizarDatalists(campo.id);
        }
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
        localStorage.setItem('operadores', JSON.stringify(operadores));
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
    
    alimentarHistorico();

    if(!modeloAtivo.template) {
        alert("Este formulário não possui template. Dados salvos apenas no histórico.");
        return;
    }

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
function exportarTudo() {
    try {
        const backup = {};
        // Itera por todas as chaves do localStorage (Dados, Operadores e Templates)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            backup[key] = localStorage.getItem(key);
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `NEWSEG_FULL_BACKUP_${new Date().getTime()}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    } catch (e) {
        alert("Erro ao gerar backup: " + e);
    }
}

function importarTudo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = event => {
            try {
                const backup = JSON.parse(event.target.result);

                if (confirm("Isso irá substituir TODOS os dados e modelos atuais. Deseja continuar?")) {
                    localStorage.clear(); // Limpa o lixo atual

                    Object.keys(backup).forEach(key => {
                        localStorage.setItem(key, backup[key]);
                    });

                    alert("Sincronização concluída com sucesso! O sistema irá reiniciar.");
                    location.reload();
                }
            } catch (err) {
                alert("Erro: Arquivo JSON inválido ou corrompido.");
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// --- Função para Gerar/Atualizar os Datalists (Auto-complete) ---
function atualizarDatalists(campoId) {
    let datalist = document.getElementById(`list-${campoId}`);
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = `list-${campoId}`;
        document.body.appendChild(datalist);
    }

    const sugestoes = historicoGlobal[campoId] || [];
    datalist.innerHTML = sugestoes.map(s => `<option value="${s}">`).join('');
}

// --- Otimização: Salvar no Histórico apenas no CLICK de Gerar/Copiar ---
function alimentarHistorico() {
    modeloAtivo.campos.forEach(campo => {
        if (campo.autocomplete) {
            const val = document.getElementById(`in-${campo.id}`).value.trim();
            if (val && val.length > 2) { // Evita palavras muito curtas
                if (!historicoGlobal[campo.id]) historicoGlobal[campo.id] = [];

                // Adiciona se não existir e mantém apenas as últimas 50 entradas para performance
                if (!historicoGlobal[campo.id].includes(val)) {
                    historicoGlobal[campo.id].unshift(val);
                    historicoGlobal[campo.id] = historicoGlobal[campo.id].slice(0, 50);
                }
            }
        }
    });
    localStorage.setItem('nodu_historico', JSON.stringify(historicoGlobal));
}

// --- No gerarRelatorio ---
function gerarRelatorio() {
    alimentarHistorico(); // Salva os dados no histórico global

    if (!modeloAtivo.template) {
        alert("Este formulário não possui template. Dados salvos apenas no histórico.");
        return;
    }

    // ... lógica normal de gerar o texto ...
}

// Iniciar Sistema
init();