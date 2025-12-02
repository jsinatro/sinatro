const resume = {
    about: "Desenvolvedor Web e Engenheiro de Soluções. Meu foco é na criação de aplicações web funcionais (HTML, CSS, JavaScript) e na automação de processos com Python. Aplico a lógica sistêmica e a capacidade de solucionar problemas complexos (troubleshooting) para entregar código limpo e soluções robustas. Sou proativo e autodidata, sempre focado em aprender e evoluir a stack tecnológica.",
    skills: [
        "<span class='header'>CORE DEV:</span> HTML5, CSS3 (Responsividade, Flexbox), JavaScript (ES6+), Manipulação de DOM.",
        "<span class='header'>SCRIPTING:</span> Python (Automação, Tratamento de Dados), VBA/Macros.",
        "<span class='header'>FILOSOFIA TECH:</span> Git/GitHub, VS Code, <span class='highlight'>Linux (Ambiente Open Source)</span>.",
        "<span class='header'>DESIGN GRÁFICO:</span> Photoshop e Corel Draw (Proprietário) | <span class='cmd'>GIMP</span> e <span class='cmd'>Inkscape</span> (Open Source).",
        "<span class='header'>ENGENHARIA/3D:</span> Autocad, Revit, Sketchup (Proprietário) | <span class='cmd'>LibreCAD</span> e <span class='cmd'>Blender</span> (Open Source).",
        "<span class='header'>PRODUTIVIDADE:</span> Pacote Office Completo (MS Office) | <span class='cmd'>LibreOffice</span> (Open Source)."
    ],
    education: [
        "Bacharelado em Administração de Empresas - FMU-SP (2009-2012)",
        "Bacharelado em Engenharia Civil - FMU-SP (2014-2020)"
    ],
    projects: [
        { 
            name: "Endogamia Barbalhense (Genealogia Digital)", 
            url: "http://www.endogamiabarbalhense.com.br",
            desc: "Projeto Full-Code (HTML/CSS/JS) para mapeamento de dados genealógicos complexos, aplicando lógica sistêmica."
        },
        { 
            name: "Studio Bianca Machado (Site de Fotografia)", 
            url: "http://www.biancamachado.com.br",
            desc: "Criação do portal, focado em otimização de imagens, performance e apresentação visual de portfólio."
        },
        { 
            name: "Livro Genealógico (Escrita e Design)", 
            url: "https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view",
            desc: "Projeto autoral de preservação histórica, envolvendo tratamento de documentos, escrita e diagramação."
        },
        { 
            name: "Clientes (Sites Desenvolvidos)", 
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
const promptText = "user@sinatro:~$";

let waitingForProjectSelection = false;

window.onload = async () => {
    inputField.disabled = true;
    await typeText("Inicializando kernel...", 50);
    await typeText("Carregando módulos de interface...", 30);
    await typeText("Montando sistema de arquivos...", 30);
    await delay(500);
    outputDiv.innerHTML = '';
    addOutputLine("Bem-vindo ao João Sinatro v2.0 (Portfolio)", false);
    addOutputLine("Digite <span class='cmd'>help</span> para ver a lista de comandos.", false);
    addOutputLine("", false);
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

    addOutputLine("<span class='header'>--- COMANDOS DISPONÍVEIS ---</span>");
    commands.forEach(c => {
        addOutputLine(`<span class='cmd'>${c.cmd.padEnd(20)}</span> - ${c.desc}`); 
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

function showEducation() {
    addOutputLine("<span class='header'>--- FORMAÇÃO ---</span>");
    resume.education.forEach(edu => addOutputLine(`- ${edu}`));
}

function showProjects() {
    addOutputLine("<span class='header'>--- PROJETOS ---</span>");
    resume.projects.forEach((proj, index) => {
        addOutputLine(`[${index + 1}] <span class='highlight'>${proj.name}</span>`);
        addOutputLine(`    - ${proj.desc}`);
        addOutputLine(``);
    });
    addOutputLine("Digite o número do projeto para abrir ou 'sair' para cancelar.");
    waitingForProjectSelection = true;
}

function showClientList() {
    addOutputLine("<span class='header'>--- SITES DE CLIENTES ---</span>");
    addOutputLine(`Total de ${clientProjects.length} sites em destaque no portfólio de clientes:`);
    addOutputLine(``);
    
    clientProjects.forEach(item => {
        addOutputLine(`  > <span class='highlight'>${item.name}</span>`);
        addOutputLine(`    Criado para: ${item.client}`);
        addOutputLine(`    Link: <a href="${item.url}" target="_blank">${item.url}</a>`);
        addOutputLine(``);
    });
    
    addOutputLine("A lista acima não é interativa, apenas de consulta. Use os comandos principais para continuar.");
}

function showContact() {
    addOutputLine("<span class='header'>--- CONTATO (contact) ---</span>");
    
    addOutputLine("Redes Profissionais:");
    addOutputLine(`  > GitHub: <a href="${resume.social.github}" target="_blank">${resume.social.github}</a>`);
    addOutputLine(`  > LinkedIn: <a href="${resume.social.linkedin}" target="_blank">${resume.social.linkedin}</a>`);
    
    addOutputLine("<br>Contato Direto:");
    addOutputLine(`  > E-mail: <a href="mailto:${resume.social.email}">${resume.social.email}</a>`);
    addOutputLine(`  > WhatsApp: <a href="https://wa.me/${resume.social.whatsapp}" target="_blank">(11) 99649-5465</a>`);
    
    addOutputLine("<br>Projetos de Interesse:");
    addOutputLine(`  > FamilySearch: <a href="${resume.social.familysearch}" target="_blank">Acessar FamilySearch</a> (Usuário: <span class='cmd'>${resume.social.familysearch_user}</span>)`);
    addOutputLine(`  > Endogamia Barbalhense: <a href="${resume.social.endogamia}" target="_blank">${resume.social.endogamia}</a>`);
    
    addOutputLine("<br>Entre em contato para um café virtual!");
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
            
            // LÓGICA PARA TRATAR O ID ESPECIAL LISTA_CLIENTES
            if (proj.url === "LISTA_CLIENTES") { 
                showClientList();
            } else {
                addOutputLine(`Abrindo ${proj.name}...`);
                window.open(proj.url, '_blank');
            }
            waitingForProjectSelection = false;
        } else {
            addOutputLine("Número inválido. Tente novamente ou digite 'sair'.");
        }
        return;
    }

    // Comandos Normais
    switch (cmd) {
        case 'help': 
        case '?':
        case 'ls':
            showHelp(); 
            break;
            
        case 'clear': 
            outputDiv.innerHTML = ''; 
            break;
            
        case 'tudo': 
        case 'all': 
            showAll(); 
            break;
            
        case 'sobre': 
        case 'about': 
            showAbout(); 
            break;
            
        case 'skills': 
        case 'habilidades': 
            showSkills(); 
            break;
            
        case 'educacao': 
        case 'education': 
            showEducation(); 
            break;
            
        case 'projetos': 
            showProjects(); 
            break;
            
        case 'contato': 
        case 'contact': 
            showContact(); 
            break;
            
        case 'github': 
            window.open(resume.social.github, '_blank'); 
            break;

        case 'cv':
            addOutputLine("Baixando: João Sinatro - CV.pdf...");
            window.open("./joao_sinatro_cv.pdf", '_blank');
            break;
            
        case '':
            break;
            
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