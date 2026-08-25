# rogpLabs — evidência do MVP em staging

Data: 2026-08-25.

## Entrega

- Página pública estática, responsiva e indexável para o rogpLabs.
- Conteúdo somente sobre trilhas em validação; não há preço, turma, prova ou
  disponibilidade inventados.
- Radar baseado em fontes registradas, com fonte primária distinguida de sinal
  de mercado.
- CTA de e-mail direto; a aplicação não recebe nem armazena PII.
- `/healthz` para smoke test, TLS via Let's Encrypt e cabeçalhos de segurança.

## Evidência

| Gate | Resultado |
| --- | --- |
| validação estática | aprovado |
| testes Node | 3 aprovados |
| build Docker limpo | aprovado pelo check `verify` do GitHub Actions |
| staging `/` | HTTP 200 |
| staging `/healthz` | HTTP 200, corpo `ok` |
| certificado | válido para `labs.stage.rogpe.tech` |
| CSP, `nosniff`, frame, referrer e permissions policy | presentes na resposta HTTPS |

## Limites atuais

- A coleta de leads permanece fora do MVP até haver Canvas aprovado, política
  LGPD, CRM/lista e teste de exclusão auditável.
- O site público `labs.rogpe.tech` permanece sem promoção: a versão aprovada
  está em `labs.stage.rogpe.tech`.
- Métricas de navegação ficam desligadas até o identificador do site Umami e
  o contrato de eventos sem PII serem configurados.

## Rollback

No Dokploy, manter o serviço de staging apontado ao commit saudável anterior
ou redeployar a imagem anterior. Não há banco, volume ou migração neste MVP.
Produção exige a aprovação humana do gate, usando o mesmo commit aprovado em
staging.
