// --- DADOS DO CURRÍCULO (EDITAR AQUI) ---
const resume = {
    about: "Desenvolvedor Web e Engenheiro de Soluções. Meu foco é na criação de aplicações web funcionais (HTML, CSS, JavaScript) e na automação de processos com Python. Aplico a lógica sistêmica e a capacidade de solucionar problemas complexos (troubleshooting) para entregar código limpo e soluções robustas. Sou proativo e autodidata, sempre focado em aprender e evoluir a stack tecnológica.",
    // SKILLS E STACK ATUALIZADOS
    skills: [
        // 1. Core Development
        "<span class='header'>CORE DEV:</span> HTML5, CSS3 (Responsividade, Flexbox), JavaScript (ES6+), Manipulação de DOM.",
        
        // 2. Scripting e Automação
        "<span class='header'>SCRIPTING:</span> Python (Automação, Tratamento de Dados), VBA/Macros.",
        
        // 3. Ferramentas Essenciais (Open Source e Filosofia)
        "<span class='header'>FILOSOFIA TECH:</span> Git/GitHub, VS Code, <span class='highlight'>Linux (Ambiente Open Source)</span>.",
        
        // 4. Design Gráfico/Visual (Proprietário vs. Open Source)
        "<span class='header'>DESIGN GRÁFICO:</span> Photoshop e Corel Draw (Proprietário) | <span class='cmd'>GIMP</span> e <span class='cmd'>Inkscape</span> (Open Source).",
        
        // 5. Engenharia e Modelagem (Proprietário vs. Open Source)
        "<span class='header'>ENGENHARIA/3D:</span> Autocad, Revit, Sketchup (Proprietário) | <span class='cmd'>LibreCAD</span> e <span class='cmd'>Blender</span> (Open Source).",
        
        // 6. Produtividade
        "<span class='header'>PRODUTIVIDADE:</span> Pacote Office Completo (MS Office) | <span class='cmd'>LibreOffice</span> (Open Source)."
    ],
    education: [
        "Bacharelado em Administração de Empresas - FMU-SP (2009-2012)",
        "Bacharelado em Engenharia Civil - FMU-SP (2014-2020)"
    ],
    // NOVOS PROJETOS COM LINKS ATUALIZADOS
    projects: [
        { 
            name: "Endogamia Barbalhense (Genealogia Digital)", 
            url: "http://www.endogamiabarbalhense.com.br",
            desc: "Projeto Full-Code (HTML/CSS/JS) para mapeamento e digitalização de dados genealógicos complexos, aplicando lógica de banco de dados relacional."
        },
        { 
            name: "Studio Bianca Machado (Site de Fotografia)", 
            url: "http://www.biancamachado.com.br",
            desc: "Criação do portal e otimização de imagens, focando em performance e apresentação visual de portfólio."
        },
        { 
            name: "Livro Genealógico (Escrita e Design)", 
            url: "https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view",
            desc: "Projeto autoral de preservação histórica, envolvendo tratamento de documentos, escrita e design/diagramação (PDF)."
        },
        { 
            name: "Lista de Clientes/Portfólio (Diversos)", 
            url: "#", // Não tem URL específica, apenas mostra o comando
            desc: "Sites criados sob demanda para diversos clientes, utilizando stack Front-End (HTML/CSS/JS) e ferramentas de design."
        }
    ],
    social: {
        github: "https://github.com/jsinatro",
        linkedin: "https://linkedin.com/in/jsinatro",
        whatsapp: "wa.me/551199649465",
        email: "joaosinatro@endogamiabarbalhense.com.br"
    }
};

// --- LÓGICA DO TERMINAL ---
const inputField = document.getElementById('command-input');
const outputDiv = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
const promptText = "user@sinatro:~$";

let waitingForProjectSelection = false;

// Função para tocar som de tecla (opcional, remova se não quiser)
function playKeystrokeSound() {
    // Implementação futura
}

// Inicialização (Boot)
window.onload = async () => {
    inputField.disabled = true;
    await typeText("Inicializando kernel...", 50);
    await typeText("Carregando módulos de interface...", 30);
    await typeText("Montando sistema de arquivos...", 30);
    await delay(500);
    outputDiv.innerHTML = ''; // Limpa o boot
    addOutputLine("Bem-vindo ao João Sinatro v2.0 (Portfolio)", false);
    addOutputLine("Digite <span class='cmd'>help</span> para ver a lista de comandos.", false);
    addOutputLine("", false); // Linha vazia
    inputField.disabled = false;
    inputField.focus();
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed) {
    const pre = document.createElement('pre');
    outputDiv.appendChild(pre);
    
    for (let i = 0; i < text.length; i++) {
        pre.textContent += text.charAt(i);
        scrollToBottom();
        await delay(speed);
    }
}

function addOutputLine(text, isInput = false) {
    const pre = document.createElement('pre');
    if (isInput) {
        pre.innerHTML = `<span class="prompt">${promptText}</span> ${text}`;
    } else {
        pre.innerHTML = text;
    }
    outputDiv.appendChild(pre);
    scrollToBottom();
}

function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// --- FUNÇÕES DE EXIBIÇÃO ---

function showHelp() {
    const commands = [
        { cmd: 'sobre', desc: 'Resumo profissional' },
        { cmd: 'skills', desc: 'Minhas habilidades técnicas' },
        { cmd: 'educacao', desc: 'Formação acadêmica' },
        { cmd: 'projetos', desc: 'Lista de projetos (com links)' },
        { cmd: 'contato', desc: 'Email e redes sociais' },
        { cmd: 'tudo', desc: 'Exibe o currículo completo' },
        { cmd: 'clear', desc: 'Limpa a tela' }
    ];

    addOutputLine("<span class='header'>--- COMANDOS DISPONÍVEIS ---</span>");
    commands.forEach(c => {
        addOutputLine(`<span class='cmd'>${c.cmd.padEnd(10)}</span> - ${c.desc}`);
    });
}

function showAbout() {
    addOutputLine("<span class='header'>--- SOBRE MIM ---</span>");
    addOutputLine(resume.about);
}

function showSkills() {
    addOutputLine("<span class='header'>--- SKILLS ---</span>");
    resume.skills.forEach(skill => addOutputLine(`- ${skill}`));
}

function showExperience() {
    addOutputLine("<span class='header'>--- EXPERIÊNCIA ---</span>");
    resume.experience.forEach(job => {
        addOutputLine(`<span class='highlight'>${job.role}</span> @ ${job.company}`);
        addOutputLine(`<span class='date'>${job.date}</span>`);
        addOutputLine(`${job.desc}`);
        addOutputLine(""); // Linha vazia para separar
    });
}

function showEducation() {
    addOutputLine("<span class='header'>--- FORMAÇÃO ---</span>");
    resume.education.forEach(edu => addOutputLine(`- ${edu}`));
}

function showProjects() {
    addOutputLine("<span class='header'>--- PROJETOS ---</span>");
    resume.projects.forEach((proj, index) => {
        addOutputLine(`[${index + 1}] <span class='highlight'>${proj.name}</span>`);
    });
    addOutputLine("Digite o número do projeto para abrir ou 'sair' para cancelar.");
    waitingForProjectSelection = true;
}

function showContact() {
    addOutputLine("<span class='header'>--- CONTATO ---</span>");
    addOutputLine(`GitHub:   <a href="${resume.social.github}" target="_blank">${resume.social.github}</a>`);
    addOutputLine(`LinkedIn: <a href="${resume.social.linkedin}" target="_blank">${resume.social.linkedin}</a>`);
    addOutputLine(`Email:    ${resume.social.email}`);
}

function showAll() {
    showAbout();
    addOutputLine("");
    showSkills();
    addOutputLine("");
    showEducation();
    addOutputLine("");
    showContact();
}

// --- PROCESSAMENTO DE COMANDOS ---

function processCommand(command) {
    const rawCmd = command.trim();
    if (!rawCmd && !waitingForProjectSelection) return;
    
    addOutputLine(rawCmd, true);
    const cmd = rawCmd.toLowerCase();

    // Modo Seleção de Projeto
    if (waitingForProjectSelection) {
        if (cmd === 'sair' || cmd === 'cancel' || cmd === 'exit') {
            waitingForProjectSelection = false;
            addOutputLine("Seleção cancelada.");
            return;
        }

        const index = parseInt(cmd) - 1;
        if (index >= 0 && index < resume.projects.length) {
            const proj = resume.projects[index];
            addOutputLine(`Abrindo ${proj.name}...`);
            window.open(proj.url, '_blank');
            waitingForProjectSelection = false;
        } else {
            addOutputLine("Número inválido. Tente novamente ou digite 'sair'.");
        }
        return;
    }

    // Comandos Normais
    switch (cmd) {
        case 'help': case '?': showHelp(); break;
        case 'sobre': case 'about': showAbout(); break;
        case 'skills': case 'habilidades': showSkills(); break;
        case 'educacao': case 'education': showEducation(); break;
        case 'projetos': case 'ls': showProjects(); break;
        case 'contato': case 'contact': showContact(); break;
        case 'tudo': case 'all': showAll(); break;
        case 'clear': outputDiv.innerHTML = ''; break;
        case 'github': window.open(resume.social.github, '_blank'); break;
        default:
            addOutputLine(`Comando '${cmd}' não encontrado. Digite 'help'.`);
    }
}

// Event Listeners
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = inputField.value;
        inputField.value = '';
        processCommand(cmd);
    }
});

document.querySelector('.terminal-window').addEventListener('click', () => {
    inputField.focus();
});