# Atividade: CRUD de Alunos (Node.js puro)

## Objetivo
Fazer CRUD e aplicar lógica de cálculo dentro das rotas.

## Descrição
Crie uma API /alunos onde cada aluno tem nome, nota1, nota2, nota3.
- nome
- nota1
- nota2
- nota3

### Rotas implementadas

| Método | Rota               | Descrição |
|---------|--------------------|------------|
| GET     | /alunos            | Lista todos os alunos |
| POST    | /alunos            | Cadastra novo aluno |
| GET     | /alunos/:id        | Retorna aluno específico |
| GET     | /alunos/media/:id  | Calcula média e mostra situação (aprovado/reprovado) |
| PUT     | /alunos/:id        | Atualiza notas ou nome do aluno |
