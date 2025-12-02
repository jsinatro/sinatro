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
   // NOVOS PROJETOS COM LISTA DE CLIENTES
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
            url: "https://jsinatro.github.io/sinatro/", // Este é um ID especial, veja a nota abaixo
            desc: "Lista de projetos desenvolvidos sob demanda para clientes e empresas (HTML/CSS/JS)."
        }
    ],
    // CONTATO (Atualizado com todos os links)
    social: {
        github: "https://github.com/jsinatro",
        linkedin: "https://linkedin.com/in/jsinatro", 
        email: "joaosinatro@endogamiabarbalhense.com.br", 
        whatsapp: "5511996495465", 
        // NOVO: Adicione seu nome de usuário
        familysearch_user: "@sinatro", 
        // Link principal do site, que será usado para o clique
        familysearch: "https://www.familysearch.org/pt/", 
        endogamia: "http://www.endogamiabarbalhense.com.br"
    }
};
const clientProjects = [
    { name: "Website Institucional", client: "Escritório de Contabilidade Alpha", url: "https://exemplo-alpha.com.br" },
    { name: "Landing Page de Produto", client: "Consultoria de Marketing Digital (ME)", url: "https://exemplo-consultoria.com" },
    { name: "Página de Eventos", client: "Casa de Eventos The Venue", url: "https://exemplo-venue.com" },
    { name: "Blog Pessoal", client: "Advogado Dr. Pedro Alvares", url: "https://exemplo-advogado.com.br" },
    // Adicione mais clientes aqui!
];

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
        // Comando principal com atalho 'ls'
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
        // padEnd(20) ajustado para garantir bom espaçamento, já que o comando 'help ou ls' é mais longo
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
    addOutputLine("<span class='header'>--- CONTATO (contact) ---</span>");
    
    // Links para Redes Profissionais
    addOutputLine("Redes Profissionais:");
    addOutputLine(`  > GitHub: <a href="${resume.social.github}" target="_blank">${resume.social.github}</a>`);
    addOutputLine(`  > LinkedIn: <a href="${resume.social.linkedin}" target="_blank">${resume.social.linkedin}</a>`);
    
    // Contato Direto
    addOutputLine("<br>Contato Direto:");
    addOutputLine(`  > E-mail: <a href="mailto:${resume.social.email}">${resume.social.email}</a>`);
    addOutputLine(`  > WhatsApp: <a href="https://wa.me/${resume.social.whatsapp}" target="_blank">(11) 99649-5465</a>`);
    
    // Projetos/Interesses (Genealogia)
    addOutputLine("<br>Projetos de Interesse:");
    // NOVO: Exibe o nome de usuário ao lado do link
    addOutputLine(`  > FamilySearch: <a href="${resume.social.familysearch}" target="_blank">git www.familysearch.org</a> (Usuário: <span class='cmd'>${resume.social.familysearch_user}</span>)`);
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
        // Comandos de Ajuda e Limpeza
        case 'help': 
        case '?':
        case 'ls': // <-- AGORA 'LS' CHAMA A FUNÇÃO DE AJUDA
            showHelp(); 
            break;
            
        case 'clear': 
            outputDiv.innerHTML = ''; 
            break;
            
        // Comando CV Completo (Tudo)
        case 'tudo': 
        case 'all': 
            showAll(); 
            break;
            
        // Seções do Currículo
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
            
        // Projetos (Note que 'ls' foi removido daqui)
        case 'projetos': 
            showProjects(); 
            break;
            
        // Contato e Redes Sociais
        case 'contato': 
        case 'contact': 
            showContact(); 
            break;
            
        case 'github': 
            window.open(resume.social.github, '_blank'); 
            break;

        // Comando para Baixar CV em PDF
        case 'cv':
            addOutputLine("Baixando: João Sinatro - CV.pdf...");
            window.open("./joao_sinatro_cv.pdf", '_blank');
            break;
            
        // Comando Vazio (Enter)
        case '':
            break;
            
        // Comando Não Encontrado
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