# rogpLabs — baseline do MVP

Data: 2026-08-25. O domínio público `labs.rogpe.tech` apontava ao servidor,
mas sem serviço roteado; devolvia HTTP 404 e o certificado padrão do Traefik.
Não havia aplicação, assets, analytics configurado ou captura de leads em
operação.

O MVP elimina esse estado com uma página estática, sem dependências de runtime,
rota `/healthz`, cabeçalhos de segurança e CTA por e-mail direto. Não há
coleta de PII, cookies ou integrações de escrita antes da definição de
controlador, retenção e base legal.
