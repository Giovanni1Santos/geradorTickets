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
    const h1Element = document.querySelector("h1"); // Seleciona o h1

    // Criar elemento de mensagem de sucesso
    const successMessage = document.createElement("p");
    successMessage.textContent = "🎉 Parabéns, seu ticket está pronto!";
    successMessage.style.fontSize = "20px";
    successMessage.style.color = "#fff";
    successMessage.style.marginTop = "20px";
    successMessage.style.display = "none"; // Oculto inicialmente
    successMessage.style.fontWeight = "bold";
    document.body.insertBefore(successMessage, ticketSection); // Adiciona antes do ticket

    // Esconder o ticket inicialmente
    ticketSection.style.display = "none";

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

    avatarInput.addEventListener("change", function () {
        handleFile(this.files[0]);
    });

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
            avatarInput.files = e.dataTransfer.files;
            handleFile(file);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();

        if (!name || !email || !github) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Atualiza os dados do ticket
        ticketName.textContent = name;
        ticketEmail.textContent = email;
        ticketGithub.textContent = github;

        // Oculta o formulário e o h1
        form.style.display = "none";
        h1Element.style.display = "none";

        // Exibe a mensagem e o ticket
        successMessage.style.display = "block";
        ticketSection.style.display = "flex";
        ticketSection.classList.add("fade-in");
    });
});
