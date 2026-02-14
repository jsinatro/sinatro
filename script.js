const resume = {
    about: "Desenvolvedor Web e Engenheiro de Soluções. Especializado em criar aplicações web performáticas (HTML, CSS, JavaScript) e automações inteligentes com Python. Transformo dados dispersos em insights acionáveis através de cruzamento e integração de dados. Minha abordagem combina lógica sistêmica e resolução avançada de problemas (troubleshooting) para entregar código limpo, escalável e soluções robustas. Sou um entusiasta do código aberto, contribuindo ativamente para a comunidade, e mantenho-me em constante evolução através do aprendizado autodidata e proativo.",
    skills: {
        engineering: [
            "Projetos civis: detalhamento, quantitativos, compatibilização e documentação técnica.",
            "Projetos elétricos: dimensionamento, diagramas e detalhamento de pranchas."
        ],
        cadBim: [
            "AutoCAD: plantas, detalhes construtivos e padronização de desenhos 2D.",
            "Revit: modelagem BIM, compatibilização e organização para entrega."
        ],
        excel: [
            "Planilhas avançadas para orçamento, quantitativos e acompanhamento.",
            "Dashboards e automações para apoiar análise e tomada de decisão."
        ],
        programming: [
            "HTML, CSS e JavaScript para interfaces web objetivas e responsivas.",
            "Python para automação de tarefas, tratamento de dados e scripts utilitários."
        ]
    },
    education: [
        "Minha trajetória combina <strong>Engenharia Civil (FMU-SP, 2014-2020)</strong> e <strong>Administração de Empresas (FMU-SP, 2009-2012)</strong>.",
        "",
        "Esta dupla formação me proporciona uma visão única: a precisão técnica e metodológica do engenheiro aliada à perspectiva estratégica e de negócios do administrador.",
        "Aplico esse conjunto no desenvolvimento de soluções que são tanto tecnicamente sólidas quanto alinhadas com objetivos organizacionais."
    ],
    projects: {
        engineering: [
            "Projetos civis com detalhamento executivo, quantitativos e documentação técnica.",
            "Projetos elétricos com dimensionamento, diagramas e pranchas para execução.",
            "Compatibilização interdisciplinar para reduzir retrabalho em obra."
        ],
        programming: [
            {
                name: "<a href='http://www.endogamiabarbalhense.com.br' target='_blank' rel='noopener noreferrer'>Endogamia Barbalhense</a>",
                url: "http://www.endogamiabarbalhense.com.br",
                desc: "Aplicação web para organização e navegação de dados genealógicos."
            },
            {
                name: "<a href='http://www.biancamachado.com.br' target='_blank' rel='noopener noreferrer'>Studio Bianca Machado</a>",
                url: "http://www.biancamachado.com.br",
                desc: "Site de portfólio com foco em performance e experiência visual."
            },
            {
                name: "<a href='https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view' target='_blank' rel='noopener noreferrer'>Livro Genealógico (PDF)</a>",
                url: "https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view",
                desc: "Projeto autoral com pesquisa documental, escrita e diagramação."
            }
        ],
        programmingOnDemand: [
            "Landing pages e sites institucionais sob demanda.",
            "Automações em Python para tarefas operacionais.",
            "Dashboards e relatórios para apoiar decisões de negócio."
        ]
    },
    social: {
        github: "https://github.com/jsinatro",
        linkedin: "https://linkedin.com/in/jsinatro",
        email: "joaosinatro@endogamiabarbalhense.com.br",
        whatsapp: "5511996495465",
        familysearch_user: "@sinatro",
        familysearch: "https://www.familysearch.org/pt/",
        endogamia: "http://www.endogamiabarbalhense.com.br"
    }
};

const inputField = document.getElementById('command-input');
const outputDiv = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
const promptText = "visitante@sinatro: ~$";

let waitingForProjectSelection = false;
const commandHistory = [];
const MAX_HISTORY = 30;
let historyIndex = 0;

const commandAliases = {
    ajuda: 'help',
    sobre: 'about',
    habilidades: 'skills',
    projetos: 'projects',
    contato: 'contact',
    curriculo: 'curriculo',
    resume: 'curriculo',
    engenharia: 'engineering',
    autocad: 'cad',
    bim: 'revit',
    planilhas: 'excel',
    servicos: 'services'
};

function printLine(text, { className = '', isInput = false } = {}) {
    if (!outputDiv) return;

    const pre = document.createElement('pre');
    if (className) pre.className = className;

    if (isInput) {
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = promptText;
        pre.appendChild(promptSpan);
        pre.append(` ${text}`);
    } else {
        pre.textContent = text;
    }

    outputDiv.appendChild(pre);
    scrollToBottom();
}

function printHTMLSafe(containerBuilderFn) {
    if (!outputDiv || typeof containerBuilderFn !== 'function') return;

    const pre = document.createElement('pre');
    containerBuilderFn(pre);
    outputDiv.appendChild(pre);
    scrollToBottom();
}

function printTrustedHTML(html) {
    printHTMLSafe((container) => {
        container.innerHTML = html;
    });
}

function focusInput() {
    if (!inputField || inputField.disabled) return;
    inputField.focus();
}

function scrollToBottom() {
    if (!terminalBody) return;
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function pushHistory(command) {
    if (!command) {
        historyIndex = commandHistory.length;
        return;
    }

    commandHistory.push(command);
    if (commandHistory.length > MAX_HISTORY) {
        commandHistory.shift();
    }
    historyIndex = commandHistory.length;
}

function copyOutputToClipboard() {
    if (!outputDiv) return;

    const outputText = outputDiv.innerText;
    if (!navigator.clipboard) {
        printLine('Clipboard indisponível neste navegador.', { className: 'error' });
        return;
    }

    navigator.clipboard.writeText(outputText)
        .then(() => {
            printLine('✓ Texto copiado para a área de transferência!', { className: 'success' });
        })
        .catch(() => {
            printLine('✗ Erro ao copiar texto.', { className: 'error' });
        });
}

window.onload = async function() {
    if (!inputField || !outputDiv || !terminalBody) return;

    outputDiv.textContent = '';
    inputField.disabled = true;

    await typeText('Inicializando kernel...', 50);
    await typeText('Carregando módulos de interface...', 30);
    await typeText('Montando sistema de arquivos...', 30);
    await delay(500);
    outputDiv.textContent = '';

    printLine('João Sinatro v2.1.4 - Conectado como visitante');
    printHTMLSafe((line) => {
        line.append('Dica: clique nos atalhos ou digite ');
        const helpTag = document.createElement('span');
        helpTag.className = 'cmd';
        helpTag.textContent = 'help';
        line.appendChild(helpTag);
        line.append('.');
    });
    printLine('');

    inputField.disabled = false;
    focusInput();
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed) {
    if (!outputDiv) return;

    const pre = document.createElement('pre');
    outputDiv.appendChild(pre);

    for (let i = 0; i < text.length; i++) {
        pre.textContent += text.charAt(i);
        scrollToBottom();
        await delay(speed);
    }
}

function showHelp() {
    const commands = [
        { cmd: 'help', desc: 'Lista de comandos disponíveis' },
        { cmd: 'about', desc: 'Resumo profissional' },
        { cmd: 'skills', desc: 'Habilidades por área' },
        { cmd: 'projects', desc: 'Projetos de engenharia e programação' },
        { cmd: 'engineering / engenharia', desc: 'Serviços de engenharia (civil/elétrica)' },
        { cmd: 'cad / autocad', desc: 'Serviços CAD 2D' },
        { cmd: 'revit / bim', desc: 'Serviços Revit/BIM' },
        { cmd: 'excel / planilhas', desc: 'Planilhas, dashboards e automações' },
        { cmd: 'cv', desc: 'Abrir currículo em PDF' },
        { cmd: 'curriculo / resume', desc: 'Abrir versão web do currículo' },
        { cmd: 'contact', desc: 'Canais de contato' }
    ];

    printTrustedHTML("<span class='header'>== COMANDOS ==</span>");
    commands.forEach(c => {
        printTrustedHTML(`<span class='cmd'>${c.cmd.padEnd(24)}</span> <span class='desc'>- ${c.desc}</span>`);
    });
    printLine('Dica: use os atalhos acima do campo de comando.');
}

function showAbout() {
    printTrustedHTML("<span class='header'>--- SOBRE MIM ---</span>");
    printTrustedHTML(resume.about);
}

function showSkills() {
    printTrustedHTML("<span class='header'>== SKILLS ==</span>");

    printTrustedHTML("<span class='header'>== Engenharia (Civil/Elétrica) ==</span>");
    resume.skills.engineering.forEach(item => printTrustedHTML(`- ${item}`));
    printLine('');

    printTrustedHTML("<span class='header'>== CAD / BIM ==</span>");
    resume.skills.cadBim.forEach(item => printTrustedHTML(`- ${item}`));
    printLine('');

    printTrustedHTML("<span class='header'>== Excel ==</span>");
    resume.skills.excel.forEach(item => printTrustedHTML(`- ${item}`));
    printLine('');

    printTrustedHTML("<span class='header'>== Programação ==</span>");
    resume.skills.programming.forEach(item => printTrustedHTML(`- ${item}`));
}

function showEducation() {
    printTrustedHTML("<span class='header'>--- FORMAÇÃO ---</span>");
    resume.education.forEach(edu => printTrustedHTML(`- ${edu}`));
}

function showProjects() {
    printTrustedHTML("<span class='header'>== PROJETOS ==</span>");

    printTrustedHTML("<span class='header'>== Projetos de Engenharia ==</span>");
    resume.projects.engineering.forEach(item => printTrustedHTML(`- ${item}`));
    printLine('');

    printTrustedHTML("<span class='header'>== Projetos de Programação ==</span>");
    resume.projects.programming.forEach((proj, index) => {
        printTrustedHTML(`[<span class='project-number'>${index + 1}</span>] ${proj.name}`);
        printTrustedHTML(`    <span class='desc'>- ${proj.desc}</span>`);
    });
    printLine('');
    printTrustedHTML("<span class='header'>== Cases sob demanda ==</span>");
    resume.projects.programmingOnDemand.forEach(item => printTrustedHTML(`- ${item}`));
    printLine("Digite o número do projeto para abrir ou 'sair' para cancelar.");
    printLine("Para projetos personalizados, digite 'contact'.");
    waitingForProjectSelection = true;
}

function showEngineering() {
    printTrustedHTML("<span class='header'>== ENGENHARIA ==</span>");
    printLine('Serviços em engenharia civil e elétrica com foco em documentação clara e execução segura.');
    printLine('');
    printTrustedHTML("<span class='header'>== Entregas ==</span>");
    printLine('- Projetos civis com detalhamento e quantitativos.');
    printLine('- Projetos elétricos com dimensionamento e diagramas.');
    printLine('- Pranchas e documentação técnica para obra/execução.');
    printLine('');
    printTrustedHTML("<span class='header'>== Ferramentas ==</span>");
    printLine('- CAD: AutoCAD para desenhos 2D e padronização.');
    printLine('- BIM: Revit para modelagem e compatibilização.');
    printLine('- Excel: planilhas, indicadores e acompanhamento técnico.');
    printLine('Digite `contact` para falar comigo.');
}

function showCad() {
    printTrustedHTML("<span class='header'>== CAD ==</span>");
    printLine('- Desenvolvimento de plantas técnicas e detalhes construtivos.');
    printLine('- Montagem de pranchas com padronização de layers e escalas.');
    printLine('- Compatibilização 2D entre disciplinas para reduzir conflitos.');
    printLine('- Revisões e ajustes para emissão final de documentação.');
}

function showRevit() {
    printTrustedHTML("<span class='header'>== REVIT / BIM ==</span>");
    printLine('- Modelagem BIM para representação técnica do projeto.');
    printLine('- Compatibilização entre arquitetura, estrutura e instalações.');
    printLine('- Extração de vistas e pranchas organizadas para entrega.');
    printLine('- Organização de famílias e padrões para consistência do modelo.');
}

function showExcel() {
    printTrustedHTML("<span class='header'>== EXCEL ==</span>");
    printLine('- Planilhas para orçamento e controle de custos.');
    printLine('- Quantitativos, cronogramas e acompanhamento de etapas.');
    printLine('- Dashboards para leitura rápida de indicadores.');
    printLine('- Automações para reduzir retrabalho operacional.');
}

function showServices() {
    printTrustedHTML("<span class='header'>== SERVICES ==</span>");
    printLine('- Engenharia civil e elétrica com foco em entregáveis objetivos.');
    printLine('- CAD/Revit para documentação, compatibilização e emissão de pranchas.');
    printLine('- Excel para controle técnico, quantitativos e dashboards.');
    printLine('- Desenvolvimento web com HTML, CSS e JavaScript.');
    printLine('- Python para automações e tratamento de dados.');
    printLine('- Projetos sob demanda: digite `contact` para alinharmos escopo e prazo.');
}

function showContact() {
    printTrustedHTML("<span class='header'>--- CONTATO (contact) ---</span>");

    printLine('Redes Profissionais:');
    printTrustedHTML(`  > GitHub: <a href="${resume.social.github}" target="_blank" rel="noopener noreferrer">${resume.social.github}</a>`);
    printTrustedHTML(`  > LinkedIn: <a href="${resume.social.linkedin}" target="_blank" rel="noopener noreferrer">${resume.social.linkedin}</a>`);

    printTrustedHTML('<br>Contato Direto:');
    printTrustedHTML(`  > E-mail: <a href="mailto:${resume.social.email}">${resume.social.email}</a>`);
    printTrustedHTML(`  > WhatsApp: <a href="https://wa.me/${resume.social.whatsapp}" target="_blank" rel="noopener noreferrer">+5511996495465</a>`);

    printTrustedHTML('<br>Projetos de Interesse:');
    printTrustedHTML(`  > FamilySearch: <a href="${resume.social.familysearch}" target="_blank" rel="noopener noreferrer">Acessar FamilySearch</a> (Usuário: <span class='cmd'>${resume.social.familysearch_user}</span>)`);
    printTrustedHTML(`  > Endogamia Barbalhense: <a href="${resume.social.endogamia}" target="_blank" rel="noopener noreferrer">${resume.social.endogamia}</a>`);

    printTrustedHTML('<br>Entre em contato para um café virtual!');
}


async function openPathWithFallback(path, successMessage, fallbackMessage) {
    try {
        const response = await fetch(path, { method: 'HEAD' });
        if (!response.ok) {
            printLine(fallbackMessage, { className: 'error' });
            return;
        }
        printLine(successMessage);
        window.open(path, '_blank', 'noopener');
    } catch (error) {
        printLine(fallbackMessage, { className: 'error' });
    }
}

function showAll() {
    showAbout();
    printLine('');
    showSkills();
    printLine('');
    showEducation();
    printLine('');
    showContact();
}

async function executeCommand(command) {
    const cmdRaw = typeof command === 'string' ? command : '';
    const cmd = cmdRaw.trim();
    const cmdLower = cmd.toLowerCase();

    if (!cmd && !waitingForProjectSelection) {
        focusInput();
        return;
    }

    if (cmd) {
        printLine(cmd, { isInput: true });
    }

    if (waitingForProjectSelection) {
        if (cmdLower === 'sair' || cmdLower === 'cancel' || cmdLower === 'exit') {
            waitingForProjectSelection = false;
            printLine('Seleção cancelada.');
            focusInput();
            return;
        }

        const index = parseInt(cmdLower, 10) - 1;
        if (index >= 0 && index < resume.projects.programming.length) {
            const proj = resume.projects.programming[index];
            printLine(`Abrindo ${proj.name.replace(/<[^>]*>/g, '')}...`);
            window.open(proj.url, '_blank');
            waitingForProjectSelection = false;
        } else {
            printLine("Número inválido. Tente novamente ou digite 'sair'.", { className: 'error' });
        }

        focusInput();
        return;
    }

    const [cmdBase, ...args] = cmdLower.split(/\s+/);
    const normalizedCommand = commandAliases[cmdBase] || cmdBase;

    switch (normalizedCommand) {
        case 'copy':
            copyOutputToClipboard();
            break;

        case 'help':
        case '?':
        case 'ls':
            showHelp();
            break;

        case 'clear':
            if (outputDiv) outputDiv.textContent = '';
            break;

        case 'tudo':
        case 'all':
            showAll();
            break;

        case 'about':
            showAbout();
            break;

        case 'skills':
            showSkills();
            break;

        case 'educacao':
        case 'education':
            showEducation();
            break;

        case 'projects':
            showProjects();
            break;

        case 'contact':
            showContact();
            break;

        case 'github':
            window.open(resume.social.github, '_blank');
            break;

        case 'engineering':
            showEngineering();
            break;

        case 'cad':
            showCad();
            break;

        case 'revit':
            showRevit();
            break;

        case 'excel':
            showExcel();
            break;

        case 'services':
            showServices();
            break;

        case 'open':
            if (!args.length) {
                printLine('Uso: open <destino>', { className: 'error' });
                break;
            }
            window.open(args.join(' '), '_blank');
            break;

        case 'cv':
            await openPathWithFallback(
                'joao_sinatro_cv.pdf',
                'Abrindo currículo em PDF...',
                "Não encontrei o PDF do currículo agora. Use 'curriculo' para abrir a versão web."
            );
            break;

        case 'curriculo':
            await openPathWithFallback(
                'curriculo.html',
                'Abrindo currículo web...',
                'Não encontrei curriculo.html no momento. Tente novamente em instantes.'
            );
            break;

        case '':
            break;

        default:
            printLine(`Comando '${cmd}' inválido. Digite 'help' ou clique nos atalhos.`, { className: 'error' });
    }

    focusInput();
}

window.executeCommand = executeCommand;

if (inputField) {
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = inputField.value;
            inputField.value = '';
            pushHistory(cmd.trim());
            executeCommand(cmd);
            return;
        }

        if (e.key === 'ArrowUp') {
            if (!commandHistory.length) return;
            e.preventDefault();
            historyIndex = Math.max(0, historyIndex - 1);
            inputField.value = commandHistory[historyIndex] || '';
            return;
        }

        if (e.key === 'ArrowDown') {
            if (!commandHistory.length) return;
            e.preventDefault();
            historyIndex = Math.min(commandHistory.length, historyIndex + 1);
            inputField.value = commandHistory[historyIndex] || '';
            return;
        }

        if (e.ctrlKey && e.key === 'c') {
            return;
        }
    });
}

document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
        const cmd = chip.dataset.command;
        executeCommand(cmd);
        focusInput();
    });
});

if (terminalBody) {
    terminalBody.addEventListener('click', (e) => {
        const isInteractive = e.target.closest('a, button, input');
        if (!isInteractive) {
            focusInput();
        }
    });
}
