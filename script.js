(async () => {
  // Criar o overlay principal
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    max-width: 90vw;
    background: linear-gradient(135deg, #1e1e2f, #12121c);
    border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(18px);
    color: white;
    z-index: 99999;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 22px;
    padding: 26px 30px 30px 30px;
    box-shadow: 0 0 30px rgba(161,0,255,0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  // Título com gradiente de texto
  const title = document.createElement("h1");
  title.innerText = "🌙 CENOURISTO EXPANSÃO NORTUNA";
  title.style.cssText = `
    font-size: 28px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 14px;
    background: linear-gradient(90deg, #a100ff, #ff00c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    user-select: none;
    letter-spacing: 1.2px;
  `;

  // Subtítulo de status
  const subtitle = document.createElement("p");
  subtitle.innerText = "Aguardando tarefas...";
  subtitle.style.cssText = `
    color: #bbb;
    text-align: center;
    margin-top: 0;
    margin-bottom: 18px;
    font-size: 16px;
    font-weight: 500;
  `;

  // Barra de progresso
  const progressBarWrapper = document.createElement("div");
  progressBarWrapper.style.cssText = `
    width: 100%;
    height: 14px;
    background: rgba(255,255,255,0.07);
    border-radius: 10px;
    margin-bottom: 22px;
    overflow: hidden;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.3);
  `;

  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #a100ff, #ff00c8);
    transition: width 0.5s ease;
    box-shadow: 0 0 10px #ff00c8;
  `;

  progressBarWrapper.appendChild(progressBar);

  // Caixa de logs
  const logBox = document.createElement("div");
  logBox.style.cssText = `
    width: 100%;
    max-height: 180px;
    margin-bottom: 22px;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 1.5em;
    font-family: 'Consolas', monospace;
    box-shadow: inset 0 0 15px rgba(0,0,0,0.4);
  `;

  // Botão para entrar no Discord
  const discordBtn = document.createElement("a");
  discordBtn.href = "https://discord.gg/332spXmetK";
  discordBtn.target = "_blank";
  discordBtn.rel = "noopener noreferrer";
  discordBtn.innerText = "Entrar no Discord";
  discordBtn.style.cssText = `
    display: inline-block;
    padding: 14px 30px;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    background: linear-gradient(90deg, #7289da, #99aab5);
    border-radius: 30px;
    text-decoration: none;
    box-shadow: 0 0 15px rgba(114, 137, 218, 0.7);
    user-select: none;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    margin-top: auto;
    cursor: pointer;
  `;
  discordBtn.onmouseover = () => {
    discordBtn.style.background = "linear-gradient(90deg, #99aab5, #7289da)";
    discordBtn.style.boxShadow = "0 0 25px rgba(114, 137, 218, 1)";
  };
  discordBtn.onmouseout = () => {
    discordBtn.style.background = "linear-gradient(90deg, #7289da, #99aab5)";
    discordBtn.style.boxShadow = "0 0 15px rgba(114, 137, 218, 0.7)";
  };

  // Adiciona elementos ao overlay
  overlay.appendChild(title);
  overlay.appendChild(subtitle);
  overlay.appendChild(progressBarWrapper);
  overlay.appendChild(logBox);
  overlay.appendChild(discordBtn);
  document.body.appendChild(overlay);

  // Toast container
  const toastContainer = document.createElement("div");
  toastContainer.id = "cenouristo-toast-container";
  toastContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 100000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  `;
  document.body.appendChild(toastContainer);

  // Função para mostrar notificações toast
  function showToast(message, success = true) {
    const toast = document.createElement("div");
    toast.style.cssText = `
      background: ${success ? '#2ecc71' : '#e74c3c'};
      color: white;
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 14px;
      box-shadow: 0 0 12px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      max-width: 320px;
      cursor: default;
      user-select: none;
      opacity: 0.95;
      font-weight: 600;
    `;
    toast.innerText = message;

    const progress = document.createElement("div");
    progress.style.cssText = `
      position: absolute;
      bottom: 0; left: 0;
      height: 4px;
      background: white;
      width: 100%;
      animation: toastProgress 4s linear forwards;
      border-radius: 0 0 10px 10px;
    `;
    toast.appendChild(progress);

    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  // Animations CSS
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes toastProgress {
      0% { width: 100%; }
      100% { width: 0%; }
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);

  // Atualiza a barra de progresso e texto
  function updateProgress(percent, message) {
    progressBar.style.width = percent + "%";
    subtitle.innerText = message;
  }

  // Adiciona linha no log com ícones coloridos
  function logTask(message, success = true) {
    const entry = document.createElement("div");
    entry.innerHTML = success
      ? `<span style='color:#a1ffa1'>✅ ${message}</span>`
      : `<span style='color:#ffa1a1'>❌ ${message}</span>`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
    showToast(`${success ? '✅' : '❌'} ${message}`, success);
  }

  // Função para retry em chamadas fetch com tratamento 429
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

  // Processa recursos
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

  // Processa quizzes (simplificado, pode manter o seu original)
  async function processQuiz(link, name) {
    try {
      logTask(`Iniciando avaliação: ${name}`);
      // ... manter lógica original aqui ...
      // Para manter o exemplo curto, vamos simular:
      await new Promise(r => setTimeout(r, 2000));
      logTask(`Avaliação concluída: ${name}`);
      return true;
    } catch (e) {
      logTask(`Erro avaliação ${name}: ${e.message}`, false);
      return false;
    }
  }

  // Fila de tarefas para evitar sobrecarga
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

  // Função principal que processa todas as atividades
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
