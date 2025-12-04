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
            name: "Endogamia Barbalhense (Projeto pessoal de genealogia)", 
            url: "http://www.endogamiabarbalhense.com.br",
            desc: "Projeto Full-Code (HTML/CSS/JS) para mapeamento de dados genealógicos complexos, aplicando lógica sistêmica."
        },
        { 
            name: "Studio Bianca Machado (Site de Fotografia)", 
            url: "http://www.biancamachado.com.br",
            desc: "Criação do portal, focado em otimização de imagens, performance e apresentação visual de portfólio."
        },
        { 
            name: "Livro Genealógico (Maria Avelina de Sousa)", 
            url: "https://drive.google.com/file/d/1lERTx1tG9JVMaA-3JOBBPxTURfqQ34mg/view",
            desc: "Projeto autoral de genealogia para presentear a minha avó no seu aniversário de 90 anos. Envolvendo tratamento de documentos, escrita, diagramação e publicação."
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

function copyOutputToClipboard() {
    const outputText = document.getElementById('output').innerText;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            addOutputLine("✓ Texto copiado para a área de transferência!");
        })
        .catch(err => {
            addOutputLine("✗ Erro ao copiar texto.");
        });
}

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
    addOutputLine("João Sinatro v2.1.4 - Conectado como visitante", false);
    addOutputLine("Digite <span class='cmd'>help</span> ou <span class='cmd'>ls</span> para ver a lista de comandos.", false);
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
        case 'copy':
        copyOutputToClipboard();
        break;
        
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
    
    // Permitir Ctrl+C mesmo quando o input está vazio
    if (e.ctrlKey && e.key === 'c') {
        // Não faz nada - permite que o Ctrl+C padrão funcione
        return;
    }
});

document.querySelector('.input-line').addEventListener('click', () => {
    inputField.focus();
});

document.getElementById('output').addEventListener('click', (e) => {
    e.stopPropagation();
});