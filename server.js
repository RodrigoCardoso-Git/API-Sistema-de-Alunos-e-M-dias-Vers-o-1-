const http = require("http");
const fs = require("fs");

const DB_FILE = "alunos.json";

// Carrega alunos do arquivo JSON
function carregarAlunos() {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");
  const data = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(data);
}

// Envia resposta JSON
function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

let alunos = carregarAlunos();

// Criando o servidor
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Lista todos
  if (url === "/alunos" && method === "GET") {
    return sendJSON(res, 200, alunos);
  }

  // Busca por ID
  if (url.startsWith("/alunos/") && method === "GET" && !url.includes("/media/")) {
    const id = Number(url.split("/")[2]);
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return sendJSON(res, 404, { erro: "Aluno não encontrado." });
    return sendJSON(res, 200, aluno);
  }

  // Calcular média e situação
  if (url.startsWith("/alunos/media/") && method === "GET") {
    const id = Number(url.split("/")[3]);
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return sendJSON(res, 404, { erro: "Aluno não encontrado." });

    const media = (aluno.nota1 + aluno.nota2 + aluno.nota3) / 3;
    const situacao = media >= 7 ? "Aprovado" : "Reprovado";

    return sendJSON(res, 200, {
      id: aluno.id,
      nome: aluno.nome,
      media: media.toFixed(2),
      situacao,
    });
  }

  // Error
  sendJSON(res, 404, { erro: "Rota não encontrada." });
});

// Iniciando servidor
server.listen(3000, () => console.log("Servidor rodando na porta 3000 em http: em http://localhost:3000"));
