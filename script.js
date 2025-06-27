(async () => {
  // ======= OVERLAY =======
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    background: linear-gradient(135deg, #1e1e2f, #12121c);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(14px);
    color: white;
    z-index: 9999;
    font-family: 'Segoe UI', sans-serif;
    border-radius: 20px;
    padding: 22px;
    box-shadow: 0 0 25px rgba(0,0,0,0.7);
  `;

  const title = document.createElement("h1");
  title.innerText = "🌙 CENOURISTO EXPANSÃO NORTUNA";
  title.style.cssText = `
    font-size: 26px;
    text-align: center;
    margin-bottom: 12px;
    background: linear-gradient(90deg, #a100ff, #ff00c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  const subtitle = document.createElement("p");
  subtitle.innerText = "Aguardando tarefas...";
  subtitle.style.cssText = "color: #ccc; text-align: center; margin-top: 5px;";

  const progressBarWrapper = document.createElement("div");
  progressBarWrapper.style.cssText = `
    width: 100%;
    height: 12px;
    background: rgba(255,255,255,0.08);
    border-radius: 6px;
    margin-top: 20px;
    overflow: hidden;
  `;

  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #a100ff, #ff00c8);
    transition: width 0.4s ease;
  `;

  progressBarWrapper.appendChild(progressBar);

  const logBox = document.createElement("div");
  logBox.style.cssText = `
    width: 100%;
    max-height: 160px;
    margin-top: 20px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 1.4em;
  `;

  // Botão para entrar no Discord
  const discordButton = document.createElement("button");
  discordButton.innerText = "Entrar no Discord";
  discordButton.style.cssText = `
    margin-top: 20px;
    width: 100%;
    padding: 12px 0;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #7289da, #99aab5);
    color: white;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(114, 137, 218, 0.6);
    transition: background 0.3s ease;
  `;
  discordButton.onmouseenter = () => {
    discordButton.style.background = "linear-gradient(90deg, #99aab5, #7289da)";
  };
  discordButton.onmouseleave = () => {
    discordButton.style.background = "linear-gradient(90deg, #7289da, #99aab5)";
  };
  discordButton.onclick = () => {
    window.open("https://discord.gg/332spXmetK", "_blank");
  };

  overlay.appendChild(title);
  overlay.appendChild(subtitle);
  overlay.appendChild(progressBarWrapper);
  overlay.appendChild(logBox);
  overlay.appendChild(discordButton);
  document.body.appendChild(overlay);

  // ======= TOASTS =======
  const toastContainer = document.createElement("div");
  toastContainer.id = "cenouristo-toast-container";
  toastContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 99999;
  `;
  document.body.appendChild(toastContainer);

  function showToast(message, success = true) {
    const toast = document.createElement("div");
    toast.style.cssText = `
      background: ${success ? '#2ecc71' : '#e74c3c'};
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 14px;
      box-shadow: 0 0 8px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    `;
    toast.innerText = message;
    const progress = document.createElement("div");
    progress.style.cssText = `
      position: absolute;
      bottom: 0; left: 0;
      height: 3px;
      background: white;
      width: 100%;
      animation: toastProgress 4s linear forwards;
    `;
    toast.appendChild(progress);
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes toastProgress {
      0% { width: 100%; }
      100% { width: 0%; }
    }
  `;
  document.head.appendChild(style);

  // ======= FUNÇÕES DE LOG E PROGRESSO =======
  function updateProgress(percent, message) {
    progressBar.style.width = percent + "%";
    subtitle.innerText = message;
  }

  function logTask(message, success = true) {
    const entry = document.createElement("div");
    entry.innerHTML = success
      ? `<span style='color:#a1ffa1'>✅ ${message}</span>`
      : `<span style='color:#ffa1a1'>❌ ${message}</span>`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
    showToast(`${success ? '✅' : '❌'} ${message}`, success);
  }

  // ======= FUNÇÃO DE RETRY PARA ERROS 429 =======
  async function retry(fn, retries = 3, delay = 2000) {
    try {
      return await fn();
    } catch (e) {
      if (e.message.includes("429") && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay * 2);
      }
      throw e;
    }
  }

  // ======= PROCESSA UMA PÁGINA (RESOURCE) =======
  async function processResource(id, name) {
    try {
      logTask(`Iniciando: ${name}`);
      await retry(() => fetch(`https://expansao.educacao.sp.gov.br/mod/resource/view.php?id=${id}`, {
        method: "GET",
        credentials: "include"
      }));
      logTask(`Página concluída: ${name}`);
      return true;
    } catch (e) {
      logTask(`Erro na página ${name}: ${e.message}`, false);
      return false;
    }
  }

  // ======= PROCESSA UM QUIZ =======
  async function processQuiz(link, name) {
    try {
      logTask(`Iniciando avaliação: ${name}`);
      const url = new URL(link);
      const id = url.searchParams.get("id");

      // Pega a página do quiz
      const res1 = await retry(() => fetch(link, { method: "GET", credentials: "include" }));
      const html1 = await res1.text();

      // Extrai sesskey
      const sesskeyMatch = html1.match(/sesskey=["']?([^"']+)/);
      const sesskey = sesskeyMatch?.[1];
      if (!sesskey) throw new Error("Sesskey não encontrada");

      // Inicia tentativa do quiz
      const startData = new URLSearchParams();
      startData.append("cmid", id);
      startData.append("sesskey", sesskey);
      const startRes = await retry(() => fetch("https://expansao.educacao.sp.gov.br/mod/quiz/startattempt.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: startData.toString(),
        redirect: "follow"
      }));

      // Extrai id da tentativa
      const redirectUrl = startRes.url;
      const attemptIdMatch = redirectUrl.match(/attempt=(\d+)/);
      const attemptId = attemptIdMatch?.[1];
      if (!attemptId) throw new Error("ID tentativa não encontrado");

      // Pega página da tentativa
      const res2 = await retry(() => fetch(redirectUrl, { method: "GET", credentials: "include" }));
      const html2 = await res2.text();

      // Parse do html para extrair inputs do formulário
      const doc = new DOMParser().parseFromString(html2, "text/html");
      const formData = new FormData();
      const inputs = doc.querySelectorAll("input[type='hidden']");
      let questionId = "", sequence = "";
      const payload = { attempt: attemptId, sesskey };

      inputs.forEach(input => {
        const name = input.name;
        const value = input.value;
        if (name.includes(":sequencecheck")) {
          [questionId] = name.split(":");
          sequence = value;
        } else {
          payload[name] = value;
        }
      });

      // Seleciona uma resposta aleatória válida (não "-1")
      const options = [...doc.querySelectorAll("input[type='radio']")].filter(r =>
        r.name.includes("_answer") && r.value !== "-1"
      );
      if (options.length === 0) throw new Error("Nenhuma opção encontrada");
      const selected = options[Math.floor(Math.random() * options.length)];

      // Monta os dados do formulário para enviar a resposta
      formData.append(`${questionId}:1_:flagged`, "0");
      formData.append(`${questionId}:1_:sequencecheck`, sequence);
      formData.append(selected.name, selected.value);
      formData.append("next", "Finalizar tentativa ...");
      formData.append("attempt", attemptId);
      formData.append("sesskey", sesskey);
      formData.append("slots", "1");
      Object.entries(payload).forEach(([k, v]) => {
        if (!["attempt", "sesskey"].includes(k)) formData.append(k, v);
      });

      // Envia a resposta do quiz
      await retry(() => fetch(`https://expansao.educacao.sp.gov.br/mod/quiz/processattempt.php?cmid=${id}`, {
        method: "POST",
        credentials: "include",
        body: formData,
        redirect: "follow"
      }));

      // Finaliza a tentativa
      const finishData = new URLSearchParams();
      finishData.append("attempt", attemptId);
      finishData.append("finishattempt", "1");
      finishData.append("timeup", "0");
      finishData.append("slots", "");
      finishData.append("cmid", id);
      finishData.append("sesskey", sesskey);

      await retry(() => fetch("https://expansao.educacao.sp.gov.br/mod/quiz/processattempt.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: finishData.toString(),
        redirect: "follow"
      }));

      logTask(`Avaliação concluída: ${name}`);
      return true;
    } catch (e) {
      logTask(`Erro avaliação ${name}: ${e.message}`, false);
      return false;
    }
  }

  // ======= FILA DE EXECUÇÃO =======
  class TaskQueue {
    constructor(delay = 1600) {
      this.tasks = [];
      this.delay = delay;
      this.processing = false;
    }

    async add(task) {
      return new Promise((resolve, reject) => {
        this.tasks.push({ task, resolve, reject });
        if (!this.processing) this.process();
      });
    }

    async process() {
      if (this.tasks.length === 0) return this.processing = false;
      this.processing = true;
      const { task, resolve, reject } = this.tasks.shift();
      try {
        const result = await retry(task);
        resolve(result);
      } catch (err) {
        reject(err);
      }
      setTimeout(() => this.process(), this.delay);
    }
  }

  // ======= FUNÇÃO PRINCIPAL QUE EXECUTA TUDO =======
  async function processAll() {
    const activities = document.querySelectorAll("li.activity");
    const resources = [];
    const quizzes = [];

    activities.forEach(activity => {
      const link = activity.querySelector("a.aalink");
      const complete = activity.querySelector(".completion-dropdown button");
      if (link && (!complete || !complete.classList.contains("btn-success"))) {
        const url = new URL(link.href);
        const id = url.searchParams.get("id");
        const name = link.textContent.trim();
        if (id) {
          if (/responda|pause/i.test(name)) quizzes.push({ href: link.href, name });
          else resources.push({ id, name });
        }
      }
    });

    const total = resources.length + quizzes.length;
    let completed = 0;
    updateProgress(0, "Iniciando atividades...");
    const queue = new TaskQueue(1600);

    logTask(`Encontradas ${resources.length} páginas e ${quizzes.length} avaliações`);

    for (let i = 0; i < resources.length; i++) {
      const { id, name } = resources[i];
      updateProgress(Math.round((completed / total) * 100), `Página ${i + 1}/${resources.length}`);
      await queue.add(() => processResource(id, name));
      completed++;
    }

    for (let i = 0; i < quizzes.length; i++) {
      const { href, name } = quizzes[i];
      updateProgress(Math.round((completed / total) * 100), `Avaliação ${i + 1}/${quizzes.length}`);
      await queue.add(() => processQuiz(href, name));
      completed++;
    }

    updateProgress(100, "Tudo finalizado!");
    logTask("✅ Todas as tarefas concluídas com sucesso!");
    showToast("✅ Atividades finalizadas com sucesso!", true);
    setTimeout(() => location.reload(), 2500);
  }

  try {
    await processAll();
  } catch (e) {
    logTask(`Erro fatal: ${e.message}`, false);
    updateProgress(100, "Falhou!");
  }
})();
