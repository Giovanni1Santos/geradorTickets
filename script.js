// Aguarda o evento "DOMContentLoaded" que é disparado quando o HTML está completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Obtém referências aos elementos do DOM
    const form = document.getElementById("ticketForm"); // Formulário de ingresso
    const ticketSection = document.getElementById("ticket"); // Seção do ticket
    const ticketName = document.getElementById("ticketName"); // Nome no ticket
    const ticketEmail = document.getElementById("ticketEmail"); // Email no ticket
    const ticketGithub = document.getElementById("ticketGithub"); // GitHub no ticket
    const ticketAvatar = document.getElementById("ticketAvatar"); // Avatar no ticket
    const avatarInput = document.getElementById("avatar"); // Input de arquivo para avatar
    const uploadContainer = document.querySelector(".upload-container"); // Container de upload
    const infoText = document.querySelector(".info-text"); // Texto informativo
    const h1Element = document.querySelector("h1"); // Seleciona o título h1 da página

    // Criar elemento de mensagem de sucesso
    const successMessage = document.createElement("p");
    successMessage.textContent = "🎉 Parabéns, seu ticket está pronto!"; // Texto da mensagem
    successMessage.style.fontSize = "20px"; // Estilo do tamanho da fonte
    successMessage.style.color = "#fff"; // Estilo da cor do texto
    successMessage.style.marginTop = "20px"; // Estilo da margem superior
    successMessage.style.display = "none"; // Oculto inicialmente
    successMessage.style.fontWeight = "bold"; // Estilo do peso da fonte
    document.body.insertBefore(successMessage, ticketSection); // Adiciona a mensagem antes da seção do ticket

    // Esconder o ticket inicialmente
    ticketSection.style.display = "none";

    // Função para lidar com o upload de arquivo (avatar)
    function handleFile(file) {
        if (file) {
            const reader = new FileReader(); // Cria um leitor de arquivos
            uploadContainer.classList.add("loading"); // Adiciona classe de carregamento
            infoText.textContent = "Carregando..."; // Atualiza texto informativo

            // Quando o arquivo for carregado
            reader.onload = function (e) {
                ticketAvatar.src = e.target.result; // Define a imagem do avatar
                uploadContainer.classList.remove("loading"); // Remove classe de carregamento
                infoText.textContent = "Imagem carregada com sucesso!"; // Atualiza mensagem
            };

            reader.readAsDataURL(file); // Lê o arquivo como URL de dados
        }
    }

    // Event listener para mudança no input de arquivo
    avatarInput.addEventListener("change", function () {
        handleFile(this.files[0]); // Chama handleFile com o primeiro arquivo selecionado
    });

    // Event listeners para drag and drop
    uploadContainer.addEventListener("dragover", function (e) {
        e.preventDefault(); // Previne comportamento padrão
        uploadContainer.classList.add("drag-over"); // Adiciona classe de destaque
    });

    uploadContainer.addEventListener("dragleave", function () {
        uploadContainer.classList.remove("drag-over"); // Remove classe de destaque
    });

    uploadContainer.addEventListener("drop", function (e) {
        e.preventDefault(); // Previne comportamento padrão
        uploadContainer.classList.remove("drag-over"); // Remove classe de destaque

        const file = e.dataTransfer.files[0]; // Obtém o arquivo solto
        if (file) {
            avatarInput.files = e.dataTransfer.files; // Atualiza input de arquivo
            handleFile(file); // Processa o arquivo
        }
    });

    // Event listener para envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previne envio padrão do formulário

        // Obtém e limpa os valores dos campos
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();

        // Valida se os campos obrigatórios foram preenchidos
        if (!name || !email || !github) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return; // Interrompe a execução se houver campos vazios
        }

        // Atualiza os dados do ticket com os valores do formulário
        ticketName.textContent = name;
        ticketEmail.textContent = email;
        ticketGithub.textContent = github;

        // Oculta o formulário e o título h1
        form.style.display = "none";
        h1Element.style.display = "none";

        // Exibe a mensagem de sucesso e o ticket
        successMessage.style.display = "block";
        ticketSection.style.display = "flex";
        ticketSection.classList.add("fade-in"); // Adiciona efeito de fade-in
    });
});