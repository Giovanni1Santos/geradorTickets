document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ticketForm");
    const ticketSection = document.getElementById("ticket");
    const ticketName = document.getElementById("ticketName");
    const ticketEmail = document.getElementById("ticketEmail");
    const ticketGithub = document.getElementById("ticketGithub");
    const ticketAvatar = document.getElementById("ticketAvatar");
    const avatarInput = document.getElementById("avatar");
    const uploadContainer = document.querySelector(".upload-container");
    const infoText = document.querySelector(".info-text");

    // Esconder o ticket inicialmente
    ticketSection.style.display = "none";

    // Função para carregar a imagem e mostrar o carregamento
    function handleFile(file) {
        if (file) {
            const reader = new FileReader();
            uploadContainer.classList.add("loading");
            infoText.textContent = "Carregando...";

            reader.onload = function (e) {
                ticketAvatar.src = e.target.result;
                uploadContainer.classList.remove("loading");
                infoText.textContent = "Imagem carregada com sucesso!";
            };

            reader.readAsDataURL(file);
        }
    }

    // Evento de mudança no input de arquivo
    avatarInput.addEventListener("change", function () {
        handleFile(this.files[0]);
    });

    // Adicionar funcionalidade de arrastar e soltar
    uploadContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
        uploadContainer.classList.add("drag-over");
    });

    uploadContainer.addEventListener("dragleave", function () {
        uploadContainer.classList.remove("drag-over");
    });

    uploadContainer.addEventListener("drop", function (e) {
        e.preventDefault();
        uploadContainer.classList.remove("drag-over");

        const file = e.dataTransfer.files[0];
        if (file) {
            avatarInput.files = e.dataTransfer.files; // Define o arquivo no input
            handleFile(file);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Capturar os valores dos inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();

        // Validação básica
        if (!name || !email || !github) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Exibir os dados no ticket
        ticketName.textContent = name;
        ticketEmail.textContent = email;
        ticketGithub.textContent = github;

        // Esconder o formulário e exibir a seção do ticket com animação
        form.style.display = "none";
        ticketSection.style.display = "flex";
        ticketSection.classList.add("fade-in");
    });
});
