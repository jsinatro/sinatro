const resume = {
    about: "Desenvolvedor Web e Engenheiro de Soluções. Especializado em criar aplicações web performáticas (HTML, CSS, JavaScript) e automações inteligentes com Python. Transformo dados dispersos em insights acionáveis através de cruzamento e integração de dados. Minha abordagem combina lógica sistêmica e resolução avançada de problemas (troubleshooting) para entregar código limpo, escalável e soluções robustas. Sou um entusiasta do código aberto, contribuindo ativamente para a comunidade, e mantenho-me em constante evolução através do aprendizado autodidata e proativo.",
    skills: {
        engineering: [
            "Projetos civis: detalhamento executivo, quantitativos, compatibilização e documentação técnica.",
            "Projetos elétricos: dimensionamento, diagramas, memorial e detalhamento de pranchas."
        ],
        cadBim: [
            "AutoCAD: plantas, detalhes construtivos, revisão e padronização de desenhos 2D.",
            "Revit/BIM: modelagem, compatibilização interdisciplinar e organização para entrega."
        ],
        excel: [
            "Planilhas avançadas para orçamento, quantitativos e acompanhamento técnico.",
            "Dashboards e automações para reduzir retrabalho e melhorar leitura de indicadores."
        ],
        programming: [
            "HTML, CSS e JavaScript para interfaces web objetivas e responsivas.",
            "Python para automações, tratamento de dados e scripts utilitários."
        ]
    },
    education: [
        "Minha trajetória combina <strong>Engenharia Civil (FMU-SP, 2014-2020)</strong> e <strong>Administração de Empresas (FMU-SP, 2009-2012)</strong>.",
        "",
        "Esta dupla formação me proporciona uma visão única: a precisão técnica e metodológica do engenheiro aliada à perspectiva estratégica e de negócios do administrador.",
        "Aplico esse conjunto no desenvolvimento de soluções que são tanto tecnicamente sólidas quanto alinhadas com objetivos organizacionais."
    ],
    projects: {
        engineering: [],
        programming: [],
        programmingOnDemand: []
    },
    social: {
        github: "https://github.com/jsinatro",
        linkedin: "https://linkedin.com/in/jsinatro",
        email: "sinatro@msn.com",
        whatsapp: "5511996495465",
        familysearch_user: "@sinatro",
        familysearch: "https://www.familysearch.org/pt/",
        endogamia: "http://www.endogamiabarbalhense.com.br"
    }
};


const CONTACT = {
    email: 'sinatro@msn.com',
    emailHref: 'mailto:sinatro@msn.com?subject=Contato%20-%20Portf%C3%B3lio&body=Ol%C3%A1%20Sinatro!%20',
    whatsappDigits: '5511996495465',
    whatsappDisplay: '+55 11 99649-5465',
    whatsappHref: 'https://wa.me/5511996495465?text=Ol%C3%A1%20Sinatro!%20Vim%20pelo%20seu%20portf%C3%B3lio.',
    github: 'https://github.com/jsinatro',
    linkedin: 'https://linkedin.com/in/jsinatro'
};

const inputField = document.getElementById('command-input');
const outputDiv = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
const promptText = "visitante@sinatro: ~$";

const copyEmailBtn = document.getElementById('copy-email');
const copyWhatsappBtn = document.getElementById('copy-whatsapp');
const contactFeedback = document.getElementById('contact-feedback');

const commandHistory = [];
const MAX_HISTORY = 30;
let historyIndex = 0;

let projectsCache = null;
let projectsLoadPromise = null;

const MAX_OUTPUT_LINES = 200;
const outputQueue = [];
let flushScheduled = false;

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
    servicos: 'services',
    resumo: 'pitch'
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

    queueOutputNode(pre);
}

function printHTMLSafe(containerBuilderFn) {
    if (!outputDiv || typeof containerBuilderFn !== 'function') return;

    const pre = document.createElement('pre');
    containerBuilderFn(pre);
    queueOutputNode(pre);
}

function printTrustedHTML(html) {
    printHTMLSafe((container) => {
        container.innerHTML = html;
    });
}

function queueOutputNode(node) {
    if (!outputDiv || !node) return;

    outputQueue.push(node);
    if (flushScheduled) return;

    flushScheduled = true;
    requestAnimationFrame(() => {
        flushOutputQueue();
    });
}

function flushOutputQueue() {
    if (!outputDiv || !outputQueue.length) {
        flushScheduled = false;
        return;
    }

    const fragment = document.createDocumentFragment();
    outputQueue.splice(0).forEach((node) => fragment.appendChild(node));
    outputDiv.appendChild(fragment);

    trimOutputLines();
    scrollToBottom();
    flushScheduled = false;
}

function trimOutputLines() {
    if (!outputDiv) return;

    while (outputDiv.childElementCount > MAX_OUTPUT_LINES) {
        outputDiv.firstElementChild?.remove();
    }
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


function clearTerminalOutput({ showMessage = false } = {}) {
    if (outputDiv) {
        outputDiv.textContent = '';
    }
    outputQueue.length = 0;

    if (showMessage) {
        printLine('(limpo)', { className: 'desc' });
    }
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
    printLine('Bem-vindo ao portfólio interativo.');
    printLine('');
    showPitch();
    printLine('');
    printLine('Atalhos acima do input. Digite `help`.');
    printLine('');

    inputField.disabled = false;
    initContactBlock();
    focusInput();
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed) {
    if (!outputDiv) return;

    const pre = document.createElement('pre');
    outputDiv.appendChild(pre);
    trimOutputLines();

    for (let i = 0; i < text.length; i++) {
        pre.textContent += text.charAt(i);
        scrollToBottom();
        await delay(speed);
    }
}


function showPitch() {
    printTrustedHTML("<span class='header pitch-headline'>João Sinatro — Engenheiro Civil e Programador</span>");
    printLine('- Projetos civis e elétricos • documentação e detalhamento');
    printLine('- CAD/Revit (BIM) • pranchas, compatibilização e quantitativos');
    printLine('- Automação com Excel e Python • planilhas, scripts e produtividade');
    printLine('CV: digite `cv` (PDF) ou `curriculo` (HTML)');
    printLine('Contato: digite `contact` ou role até a seção Contato');
}

function showHelp() {
    const commands = [
        { cmd: 'help', desc: 'Lista de comandos disponíveis' },
        { cmd: 'about', desc: 'Resumo profissional' },
        { cmd: 'pitch / resumo', desc: 'Apresentação rápida com CTAs' },
        { cmd: 'skills', desc: 'Habilidades por área' },
        { cmd: 'projects', desc: 'Lista de projetos (carregada de projects.json)' },
        { cmd: 'project <id>', desc: 'Detalhes de um projeto específico' },
        { cmd: 'engineering / engenharia', desc: 'Serviços de engenharia (civil/elétrica)' },
        { cmd: 'cad / autocad', desc: 'Serviços CAD 2D' },
        { cmd: 'revit / bim', desc: 'Serviços Revit/BIM' },
        { cmd: 'excel / planilhas', desc: 'Planilhas, dashboards e automações' },
        { cmd: 'cv', desc: 'Abrir currículo em PDF' },
        { cmd: 'curriculo / resume', desc: 'Abrir currículo web (curriculo.html)' },
        { cmd: 'open <id|url>', desc: 'Abrir link de projeto por id ou URL' },
        { cmd: 'contact', desc: 'Canais de contato' }
    ];

    printTrustedHTML("<span class='header'>== COMANDOS ==</span>");
    commands.forEach((commandItem) => {
        printHTMLSafe((line) => {
            const command = document.createElement('span');
            command.className = 'cmd';
            command.textContent = commandItem.cmd.padEnd(24);
            const description = document.createElement('span');
            description.className = 'desc';
            description.textContent = ` - ${commandItem.desc}`;

            line.appendChild(command);
            line.appendChild(description);
        });
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
    printLine('- AutoCAD: plantas, detalhes, pranchas e padronização 2D.');
    printLine('- Revit: modelagem, compatibilização e organização para entrega.');
    printLine('');

    printTrustedHTML("<span class='header'>== Excel ==</span>");
    resume.skills.excel.forEach(item => printTrustedHTML(`- ${item}`));
    printLine('');

    printTrustedHTML("<span class='header'>== Programação ==</span>");
    printLine('- HTML, CSS e JavaScript para interfaces web objetivas.');
    printLine('- Python para automações e tratamento de dados.');
}

function showEducation() {
    printTrustedHTML("<span class='header'>--- FORMAÇÃO ---</span>");
    resume.education.forEach(edu => printTrustedHTML(`- ${edu}`));
}

async function loadProjects() {
    if (Array.isArray(projectsCache)) {
        return projectsCache;
    }

    if (projectsLoadPromise) {
        return projectsLoadPromise;
    }

    projectsLoadPromise = fetch('./data/projects.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Falha ao carregar projects.json');
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data)) {
                throw new Error('Formato inválido de projects.json');
            }
            projectsCache = data;
            return projectsCache;
        })
        .catch(() => {
            printLine('Não foi possível carregar projects.json localmente. Verifique o caminho e o deploy.', { className: 'error' });
            projectsCache = [];
            return projectsCache;
        })
        .finally(() => {
            projectsLoadPromise = null;
        });

    return projectsLoadPromise;
}

function formatProjectSummary(project) {
    const tools = Array.isArray(project.ferramentas) && project.ferramentas.length
        ? project.ferramentas.join(', ')
        : 'sem ferramentas definidas';
    const exampleTag = project.status === 'exemplo' ? ' (exemplo — substitua por projeto real)' : '';
    return `[${project.id}] ${project.titulo} — ${tools}${exampleTag}`;
}

async function showProjects() {
    const projects = await loadProjects();
    if (!projects.length) return;

    const engineering = projects.filter((project) => project.tipo === 'engenharia');
    const programming = projects.filter((project) => project.tipo === 'programacao');

    printTrustedHTML("<span class='header'>== PROJETOS ==</span>");
    printTrustedHTML("<span class='header'>== Engenharia ==</span>");
    if (!engineering.length) {
        printLine('- Nenhum projeto cadastrado nesta categoria.');
    } else {
        engineering.forEach((project) => printLine(formatProjectSummary(project)));
    }

    printLine('');
    printTrustedHTML("<span class='header'>== Programação ==</span>");
    if (!programming.length) {
        printLine('- Nenhum projeto cadastrado nesta categoria.');
    } else {
        programming.forEach((project) => printLine(formatProjectSummary(project)));
    }

    printLine('');
    printLine('Para detalhes: digite project <id>');
}

async function showProjectDetails(projectId) {
    const id = (projectId || '').trim().toLowerCase();
    if (!id) {
        printLine('Uso: project <id>', { className: 'error' });
        return;
    }

    const projects = await loadProjects();
    if (!projects.length) return;

    const project = projects.find((item) => String(item.id || '').toLowerCase() === id);
    if (!project) {
        printLine(`Projeto '${projectId}' não encontrado. Digite 'projects' para listar.`, { className: 'error' });
        return;
    }

    printTrustedHTML("<span class='header'>== DETALHES DO PROJETO ==</span>");
    printLine(`Título: ${project.titulo || 'não informado'}`);
    printLine(`Tipo: ${project.tipo || 'não informado'}`);
    printLine(`Descrição: ${project.descricao || 'não informada'}`);
    printLine(`Ferramentas: ${(project.ferramentas || []).join(', ') || 'não informadas'}`);
    printLine(`Entregáveis: ${(project.entregaveis || []).join(', ') || 'não informados'}`);

    if (project.link) {
        printLine(`Link: ${project.link}`);
        printLine(`Digite open ${project.id} para abrir.`);
    }
}

async function openProjectLink(projectOrUrl) {
    const raw = (projectOrUrl || '').trim();
    if (!raw) {
        printLine('Uso: open <id|url>', { className: 'error' });
        return;
    }

    const projects = await loadProjects();
    const byId = projects.find((item) => String(item.id || '').toLowerCase() === raw.toLowerCase());

    if (byId) {
        if (!byId.link) {
            printLine(`O projeto '${byId.id}' não possui link cadastrado.`, { className: 'error' });
            return;
        }
        window.open(byId.link, '_blank', 'noopener,noreferrer');
        return;
    }

    window.open(raw, '_blank', 'noopener,noreferrer');
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

    printLine('Canais principais:');
    printTrustedHTML(`  > E-mail: <a href="${CONTACT.emailHref}">${CONTACT.email}</a>`);
    printTrustedHTML(`  > WhatsApp: <a href="${CONTACT.whatsappHref}" target="_blank" rel="noopener noreferrer">${CONTACT.whatsappDisplay}</a>`);
    printTrustedHTML(`  > GitHub: <a href="${CONTACT.github}" target="_blank" rel="noopener noreferrer">${CONTACT.github}</a>`);
    printTrustedHTML(`  > LinkedIn: <a href="${CONTACT.linkedin}" target="_blank" rel="noopener noreferrer">${CONTACT.linkedin}</a>`);
    printLine('Dica: role até #contato para botões de copiar.');
}

function showContactFeedback(message, isError = false) {
    if (!contactFeedback) return;
    contactFeedback.textContent = message;
    contactFeedback.className = isError ? 'error' : 'success';
}

async function copyText(text) {
    if (!text) return false;

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // fallback below
        }
    }

    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    tempArea.setAttribute('readonly', '');
    tempArea.style.position = 'fixed';
    tempArea.style.left = '-9999px';
    document.body.appendChild(tempArea);
    tempArea.select();

    let copied = false;
    try {
        copied = document.execCommand('copy');
    } finally {
        document.body.removeChild(tempArea);
    }

    return copied;
}

async function handleCopyAction(valueToCopy, successMessage) {
    const copied = await copyText(valueToCopy);

    if (copied) {
        showContactFeedback(successMessage);
        printLine(`Copiado: ${valueToCopy}`, { className: 'success' });
    } else {
        const failMessage = 'Não foi possível copiar automaticamente.';
        showContactFeedback(failMessage, true);
        printLine(failMessage, { className: 'error' });
    }

    focusInput();
}

function initContactBlock() {
    const emailLink = document.getElementById('contact-email-link');
    const whatsappLink = document.getElementById('contact-whatsapp-link');
    const githubLink = document.getElementById('contact-github-link');
    const linkedinLink = document.getElementById('contact-linkedin-link');

    if (emailLink) emailLink.href = CONTACT.emailHref;
    if (whatsappLink) whatsappLink.href = CONTACT.whatsappHref;
    if (githubLink) githubLink.href = CONTACT.github;
    if (linkedinLink) linkedinLink.href = CONTACT.linkedin;

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            handleCopyAction(CONTACT.email, `Copiado: ${CONTACT.email}`);
        });
    }

    if (copyWhatsappBtn) {
        copyWhatsappBtn.addEventListener('click', () => {
            handleCopyAction(CONTACT.whatsappDisplay, `Copiado: ${CONTACT.whatsappDisplay}`);
        });
    }
}

function openCvPdf() {
    const cvPath = './joao_sinatro_cv.pdf';

    fetch(cvPath, { method: 'HEAD' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('CV indisponível');
            }
            window.open(cvPath, '_blank', 'noopener');
        })
        .catch(() => {
            printLine("PDF indisponível no momento. Use 'curriculo' para abrir a versão web.", { className: 'error' });
        });
}

function openCurriculoPage() {
    window.open('./curriculo.html', '_blank', 'noopener');
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

    if (!cmd) {
        focusInput();
        return;
    }

    printLine(cmd, { isInput: true });

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
            clearTerminalOutput();
            break;

        case 'tudo':
        case 'all':
            showAll();
            break;

        case 'about':
            showAbout();
            break;

        case 'pitch':
            showPitch();
            break;

        case 'skills':
            showSkills();
            break;

        case 'educacao':
        case 'education':
            showEducation();
            break;

        case 'projects':
            await showProjects();
            break;

        case 'project':
            await showProjectDetails(args.join(' '));
            break;

        case 'contact':
            showContact();
            break;

        case 'github':
            window.open(CONTACT.github, '_blank', 'noopener,noreferrer');
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
            await openProjectLink(args.join(' '));
            break;

        case 'cv':
            printLine('Abrindo: João Sinatro - CV.pdf...');
            openCvPdf();
            break;

        case 'curriculo':
            printLine('Abrindo currículo web...');
            openCurriculoPage();
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
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            clearTerminalOutput({ showMessage: true });
            focusInput();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            inputField.value = '';
            focusInput();
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            focusInput();
            return;
        }

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
        if (!(e.target instanceof Element)) {
            focusInput();
            return;
        }

        const isInteractive = e.target.closest('a, button, input');
        if (!isInteractive) {
            focusInput();
        }
    });
}


document.addEventListener('keydown', (event) => {
    if (event.target === inputField) return;

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        clearTerminalOutput({ showMessage: true });
        focusInput();
        return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        if (!inputField) return;
        event.preventDefault();
        inputField.value = '';
        focusInput();
        return;
    }

    if (event.key === 'Escape') {
        focusInput();
    }
});
