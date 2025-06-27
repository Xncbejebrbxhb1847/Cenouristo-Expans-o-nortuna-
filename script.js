(async () => {
  // --- Criar overlay principal ---
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

  // Título com gradiente
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

  // Botão Discord
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

  // Append
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

  // Toast function
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

  // Styles for animations and scrollbar
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

  async function retry(fn, retries = 3, delay = 2000) {
    try {
      return await fn();
    } catch (e) {
      if (e.message.includes("429") && retries > 0) {
        await new Promise(r => setTimeout(r, delay));
        return retry(fn, retries - 1, delay * 2);
      }
      throw e;
    }
  }

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

  async function processQuiz(link, name) {
    try {
      logTask(`Iniciando avaliação: ${name}`);
      const url = new URL(link);
      const id = url.searchParams.get("id");

      // Pega página inicial do quiz
      const res1 = await retry(() => fetch(link, { method: "GET", credentials: "include" }));
      const html1 = await res1.text();

      // Pega sesskey
      const sesskeyMatch = html1.match(/sesskey=["']?([^"']+)/);
      const sesskey = sesskeyMatch?.[1];
      if (!sesskey) throw new Error("Sesskey não encontrada");

      // Iniciar tentativa
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

      const redirectUrl = startRes.url;
      const attemptIdMatch = redirectUrl.match(/attempt=(\d+)/);
      const attemptId = attemptIdMatch?.[1];
      if (!attemptId) throw new Error("ID tentativa não encontrado");

      // Pega página da tentativa
      const res2 = await retry(() => fetch(redirectUrl, { method: "GET", credentials: "include" }));
      const html2 = await res2.text();
      const doc = new DOMParser().parseFromString(html2, "text/html");

      // Preparar dados do formulário
      const inputs = doc.querySelectorAll("input[type='hidden']");
      let questionId = "", sequence = "";
      const payload = { attempt: attemptId, sesskey };

      inputs.forEach(input => {
        const n = input.name;
        const v = input.value;
        if (n.includes(":sequencecheck")) {
          [questionId] = n.split(":");
          sequence = v;
        } else {
          payload[n] = v;
        }
      });

      // Escolher uma opção válida aleatória para cada pergunta
      const radios = [...doc.querySelectorAll("input[type='radio']")]
        .filter(r => r.name.includes("_answer") && r.value !== "-1");
      if (radios.length === 0) throw new Error("Nenhuma opção encontrada");

      // Para simplicidade, escolhe uma aleatória
      const selected = radios[Math.floor(Math.random() * radios.length)];

      // Construir FormData para envio
      const formData = new FormData();
      formData.append(`${questionId}:1_:flagged`, "0");
      formData.append(`${questionId}:1_:sequencecheck`, sequence);
      formData.append(selected.name, selected.value);
      formData.append("next", "Finalizar tentativa ...");
      formData.append("attempt", attemptId);
      formData.append("sesskey", sesskey);
      formData.append("slots", "1");

      // Append os demais campos
      Object.entries(payload).forEach(([k,v]) => {
        if (!["attempt","sesskey"].includes(k)) formData.append(k,v);
      });

      // Enviar resposta
      await retry(() => fetch(`https://expansao.educacao.sp.gov.br/mod/quiz/processattempt.php?cmid=${id}`, {
        method: "POST",
        credentials: "include",
        body: formData,
        redirect: "follow"
      }));

      // Finalizar tentativa
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

  // Fila para evitar flood de requests
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

  // Função principal para pegar e processar atividades
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
