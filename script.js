const projects = [
    { name: "Endogamia Barbalhense", url: "https://endogamiabarbalhense.com.br/" },
    { name: "Meu perfil no github", url: "https://github.com/jsinatro" },
    { name: "Landing Page Evento", url: "https://youtube.com" }
];

const inputField = document.getElementById('command-input');
const outputDiv = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
const promptText = "➜  ~";

let waitingForProjectSelection = false;

function addOutputLine(text, isInput = false) {
    const pre = document.createElement('pre');
    
    if (isInput) {
        pre.innerHTML = `<span class="prompt">${promptText}</span> ${text}`;
    } else {
        pre.innerHTML = text; // Usando innerHTML para permitir cores/negrito
    }
    
    outputDiv.appendChild(pre);
    scrollToBottom();
}

function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function showProjects() {
    addOutputLine("<span class='highlight'>--- PROJETOS DISPONÍVEIS ---</span>");
    projects.forEach((project, index) => {
        addOutputLine(`[${index + 1}] ${project.name}`);
    });
    addOutputLine("Digite o número do projeto para abrir.");
    waitingForProjectSelection = true;
}

function showHelp() {
    addOutputLine("Comandos disponíveis:");
    addOutputLine("  <span class='highlight'>ls</span>       - Lista os projetos.");
    addOutputLine("  <span class='highlight'>clear</span>    - Limpa o terminal.");
    addOutputLine("  <span class='highlight'>github</span>   - Abre meu perfil do GitHub.");
    waitingForProjectSelection = false;
}

function processCommand(command) {
    const trimmedCommand = command.trim();
    
    // Não exibe linha vazia se der enter sem digitar nada
    if (!trimmedCommand && !waitingForProjectSelection) return; 

    addOutputLine(trimmedCommand, true);

    const cmdLower = trimmedCommand.toLowerCase();

    if (waitingForProjectSelection) {
        const projectIndex = parseInt(cmdLower) - 1;
        if (projectIndex >= 0 && projectIndex < projects.length) {
            const project = projects[projectIndex];
            addOutputLine(`Abrindo: ${project.name}...`);
            setTimeout(() => {
                window.open(project.url, '_blank');
            }, 1000);
        } else if (cmdLower === 'cancel' || cmdLower === 'ls') {
             // Permite sair do modo seleção
             if(cmdLower === 'ls') showProjects();
             else addOutputLine("Seleção cancelada.");
        } else {
            addOutputLine("Número inválido. Digite o número ou 'cancel'.");
        }
        waitingForProjectSelection = false;
        return;
    }

    switch (cmdLower) {
        case 'ls':
            showProjects();
            break;
        case 'help':
            showHelp();
            break;
        case 'clear':
            outputDiv.innerHTML = '';
            break;
        case 'github':
            addOutputLine("Abrindo GitHub...");
            window.open("https://github.com/jsinatro", '_blank');
            break;
        case '':
            break;
        default:
            addOutputLine(`Comando não encontrado: ${trimmedCommand}. Tente 'help'.`);
    }
}

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = inputField.value;
        inputField.value = '';
        processCommand(command);
    }
});

// Foca no input ao clicar em qualquer lugar da janela do terminal
document.querySelector('.terminal-window').addEventListener('click', () => {
    inputField.focus();
});