const resume = {
    about: "Desenvolvedor Web e Engenheiro de Soluções. Especializado em criar aplicações web performáticas (HTML, CSS, JavaScript) e automações inteligentes com Python. Transformo dados dispersos em insights acionáveis através de cruzamento e integração de dados. Minha abordagem combina lógica sistêmica e resolução avançada de problemas (troubleshooting) para entregar código limpo, escalável e soluções robustas. Sou um entusiasta do código aberto, contribuindo ativamente para a comunidade, e mantenho-me em constante evolução através do aprendizado autodidata e proativo.",
    skills: [
        "<span class='header'>💻 DESENVOLVIMENTO WEB & FRONT-END</span>",
        "<strong>Tecnologias Core:</strong> HTML5, CSS3 (Responsividade, Flexbox/Grid), JavaScript (ES6+), DOM.",
        "<strong>CMS & Construtores de Sites:</strong> <span class='highlight'>WordPress</span>, Elementor, Divi.",
        "<strong>Filosofia & Controle:</strong> Git, GitHub, VS Code, <span class='cmd'>Linux (Ambiente Open Source)</span>.",

        "<span class='header'>⚙️ BACK-END, SCRIPTING & AUTOMAÇÃO</span>",
        "<strong>Linguagens:</strong> <span class='highlight'>Python</span> (Automação, Scripting, Tratamento de Dados), VBA (Macros Excel).",

        "<span class='header'>🎨 DESIGN GRÁFICO & MULTIMÍDIA</span>",
        "Edição e vetorização no ecossistema aberto: <span class='cmd'>GIMP</span> e <span class='cmd'>Inkscape</span> são minha escolha principal.",
        "Para projetos específicos, também navego com fluência em Adobe Photoshop e CorelDRAW.",

        "<span class='header'>📐 ENGENHARIA, MODELAGEM 3D & CAD</span>",
        "Modelo e projeto com ferramentas livres: <span class='cmd'>Blender</span> para 3D e <span class='cmd'>LibreCAD</span> para projetos 2D.",
        "Tenho experiência complementar no ambiente corporativo com AutoCAD, Revit e SketchUp.",

        "<span class='header'>🛠️ PRODUTIVIDADE & FERRAMENTAS DE ESCRITÓRIO</span>",
        "Minha suite de produtividade padrão é o <span class='cmd'>LibreOffice</span>.",
        "Opero com igual competência no Pacote Microsoft Office para integração em fluxos empresariais."
    ],
    education: [
        "Minha trajetória combina <strong>Engenharia Civil (FMU-SP, 2014-2020)</strong> e <strong>Administração de Empresas (FMU-SP, 2009-2012)</strong>.",
        "",
        "Esta dupla formação me proporciona uma visão única: a precisão técnica e metodológica do engenheiro aliada à perspectiva estratégica e de negócios do administrador.",
        "Aplico esse conjunto no desenvolvimento de soluções que são tanto tecnicamente sólidas quanto alinhadas com objetivos organizacionais."
    ],
    projects: [
        {
            name: "<a href='http://www.endogamiabarbalhense.com.br' target='_blank' rel='noopener noreferrer'>Endogamia Barbalhense (Projeto pessoal de genealogia)</a>",
            url: "http://www.endogamiabarbalhense.com.br",
            desc: "Projeto Full-Code (HTML/CSS/JS) para mapeamento de dados genealógicos complexos, aplicando lógica sistêmica."
        },
        {
            name: "<a href='http://www.biancamachado.com.br' target='_blank' rel='noopener noreferrer'>Studio Bianca Machado (Site de Fotografia)</a>",
            url: "http://www.biancamachado.com.br",
            desc: "Criação do portal, focado em otimização de imagens, performance e apresentação visual de portfólio."
        },
        {
            name: "<a href='https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view' target='_blank' rel='noopener noreferrer'>Livro Genealógico (Maria Avelina de Sousa)</a>",
            url: "https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view",
            desc: "Projeto autoral de genealogia para presentear a minha avó no seu aniversário de 90 anos. Envolvendo tratamento de documentos, escrita, diagramação e publicação."
        },
        {
            name: "<a href='https://jsinatro.github.io/sinatro/#' target='_blank' rel='noopener noreferrer'>Clientes (Sites Desenvolvidos)</a>",
            url: "LISTA_CLIENTES",
            desc: "Lista de projetos desenvolvidos sob demanda para clientes e empresas (HTML/CSS/JS)."
        }
    ],
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

const clientProjects = [
    { name: "Website Institucional", client: "Escritório de Contabilidade Alpha", url: "https://exemplo-alpha.com.br" },
    { name: "Landing Page de Produto", client: "Consultoria de Marketing Digital (ME)", url: "https://exemplo-consultoria.com" },
    { name: "Página de Eventos", client: "Casa de Eventos The Venue", url: "https://exemplo-venue.com" },
    { name: "Blog Pessoal", client: "Advogado Dr. Pedro Alvares", url: "https://exemplo-advogado.com.br" },
];

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
    curriculo: 'cv'
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
        { cmd: 'help ou ls', desc: 'Exibe esta lista de comandos' },
        { cmd: 'sobre', desc: 'Resumo profissional' },
        { cmd: 'skills', desc: 'Habilidades técnicas' },
        { cmd: 'educacao', desc: 'Formação acadêmica' },
        { cmd: 'projetos', desc: 'Lista de projetos e códigos' },
        { cmd: 'contato', desc: 'Links e redes sociais' },
        { cmd: 'cv', desc: 'Baixar currículo em PDF' },
        { cmd: 'clear', desc: 'Limpa a tela do terminal' },
    ];

    printTrustedHTML("<span class='header'>--- COMANDOS DISPONÍVEIS ---</span>");
    commands.forEach(c => {
        printTrustedHTML(`<span class='cmd'>${c.cmd.padEnd(20)}</span> <span class='desc'>- ${c.desc}</span>`);
    });
}

function showAbout() {
    printTrustedHTML("<span class='header'>--- SOBRE MIM ---</span>");
    printTrustedHTML(resume.about);
}

function showSkills() {
    printTrustedHTML("<span class='header'>--- SKILLS ---</span>");
    resume.skills.forEach(skill => printTrustedHTML(`- ${skill}`));
}

function showEducation() {
    printTrustedHTML("<span class='header'>--- FORMAÇÃO ---</span>");
    resume.education.forEach(edu => printTrustedHTML(`- ${edu}`));
}

function showProjects() {
    printTrustedHTML("<span class='header'>--- PROJETOS ---</span>");
    resume.projects.forEach((proj, index) => {
        const isLink = proj.name.includes('<a ');

        if (isLink) {
            printTrustedHTML(`[<span class='project-number'>${index + 1}</span>] ${proj.name}`);
        } else {
            printTrustedHTML(`[<span class='project-number'>${index + 1}</span>] <span class='highlight'>${proj.name}</span>`);
        }
        printTrustedHTML(`    <span class='desc'>- ${proj.desc}</span>`);
        printLine('');
    });
    printLine("Digite o número do projeto para abrir ou 'sair' para cancelar.");
    waitingForProjectSelection = true;
}

function showClientList() {
    printTrustedHTML("<span class='header'>--- SITES DE CLIENTES ---</span>");
    printLine(`Total de ${clientProjects.length} sites em destaque no portfólio de clientes:`);
    printLine('');

    clientProjects.forEach(item => {
        printTrustedHTML(`  > <span class='highlight'>${item.name}</span>`);
        printLine(`    Criado para: ${item.client}`);
        printTrustedHTML(`    Link: <a href="${item.url}" target="_blank">${item.url}</a>`);
        printLine('');
    });

    printLine('A lista acima não é interativa, apenas de consulta. Use os comandos principais para continuar.');
}

function showContact() {
    printTrustedHTML("<span class='header'>--- CONTATO (contact) ---</span>");

    printLine('Redes Profissionais:');
    printTrustedHTML(`  > GitHub: <a href="${resume.social.github}" target="_blank">${resume.social.github}</a>`);
    printTrustedHTML(`  > LinkedIn: <a href="${resume.social.linkedin}" target="_blank">${resume.social.linkedin}</a>`);

    printTrustedHTML('<br>Contato Direto:');
    printTrustedHTML(`  > E-mail: <a href="mailto:${resume.social.email}">${resume.social.email}</a>`);
    printTrustedHTML(`  > WhatsApp: <a href="https://wa.me/${resume.social.whatsapp}" target="_blank">+5511996495465</a>`);

    printTrustedHTML('<br>Projetos de Interesse:');
    printTrustedHTML(`  > FamilySearch: <a href="${resume.social.familysearch}" target="_blank">Acessar FamilySearch</a> (Usuário: <span class='cmd'>${resume.social.familysearch_user}</span>)`);
    printTrustedHTML(`  > Endogamia Barbalhense: <a href="${resume.social.endogamia}" target="_blank">${resume.social.endogamia}</a>`);

    printTrustedHTML('<br>Entre em contato para um café virtual!');
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

function executeCommand(command) {
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
        if (index >= 0 && index < resume.projects.length) {
            const proj = resume.projects[index];

            if (proj.url === 'LISTA_CLIENTES') {
                showClientList();
            } else {
                printLine(`Abrindo ${proj.name.replace(/<[^>]*>/g, '')}...`);
                window.open(proj.url, '_blank');
            }
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
        case 'cad':
        case 'excel':
            printLine('Comando em construção. Use: skills, projects, cv ou contact.');
            break;

        case 'open':
            if (!args.length) {
                printLine('Uso: open <destino>', { className: 'error' });
                break;
            }
            window.open(args.join(' '), '_blank');
            break;

        case 'cv':
            printLine('Baixando: João Sinatro - CV.pdf...');
            window.open('./joao_sinatro_cv.pdf', '_blank');
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
