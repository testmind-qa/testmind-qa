Guia: Enviar formulário do site para Google Forms / Google Sheets

Este projeto contém um componente de contato em `src/components/Contact.tsx` que pode ser configurado para enviar respostas para uma planilha do Google usando duas abordagens:

A) Google Form (recomendado para simplicidade, evita CORS)
B) Google Apps Script Web App (mais controle, aceita JSON)

=== A) Usando um Google Form ligado a uma Planilha ===
1) Crie um Google Form com os campos: Nome, Telefone, Email, Motivo do contato (ou outros).
2) Vincule o Form a uma Planilha: no Form clique em Respostas > Criar Planilha.
3) Para enviar usando o site sem backend, precisamos do "formResponse" URL e dos IDs dos campos (entry.xxxxx):
   - Abra o Form no modo edição e clique em Enviar > link (ícone de corrente) > copiar link.
   - Abra o link do formulário no navegador, clique com o botão direito e escolha "Inspecionar" para abrir o DevTools.
   - Encontre o elemento <form> no HTML; o atributo action será parecido com:
     https://docs.google.com/forms/d/e/FORM_ID/formResponse
   - Copie essa URL e coloque na variável de ambiente VITE_GOOGLE_FORM_ACTION_URL (ver abaixo).
   - Para achar os entry IDs: cada campo input/textarea terá um name como "entry.1234567890". Associe cada um ao campo correto (nome, telefone, email, message).

4) No projeto, defina a variável de ambiente (arquivo .env.local ou .env):
   VITE_GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/FORM_ID/formResponse"

5) No arquivo `src/components/Contact.tsx`, localize o objeto GOOGLE_FORM_FIELDS e substitua os valores REPLACE_* pelos entry IDs do seu formulário. Exemplo:
   const GOOGLE_FORM_FIELDS = {
     name: 'entry.1234567890',
     phone: 'entry.0987654321',
     email: 'entry.1122334455',
     message: 'entry.6677889900'
   }

6) Executando o site, ao submeter o formulário, o componente criará um form HTML oculto e fará POST para a URL do Google Form. Isso evita problemas de CORS porque é um envio de formulário tradicional (pode abrir em nova aba).

Observações:
- O Google Form pode redirecionar para uma página de obrigado. O código atual define target="_blank" para abrir em nova aba e não perder a sessão do usuário.
- Se você preferir que não abra nova aba, remova form.target = '_blank' no código.

=== B) Usando Google Apps Script Web App (JSON POST) ===
1) Abra https://script.google.com e crie um novo projeto.
2) Cole o código abaixo no arquivo Code.gs e salve:

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById('SUA_PLANILHA_ID');
    var sheet = ss.getSheetByName('Form Responses 1') || ss.getSheets()[0];
    sheet.appendRow([new Date(), data.name || '', data.phone || '', data.email || '', data.message || '']);
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

3) Substitua 'SUA_PLANILHA_ID' pelo ID da sua planilha (veja a URL da planilha: https://docs.google.com/spreadsheets/d/PLANILHA_ID/edit).
4) Deploy > Novo deployment > tipo "Web app" > Acesso: "Qualquer pessoa, mesmo anônima" (se quiser aceitar requisições sem login) > Deploy.
5) Copie a URL do Web App e defina a variável de ambiente VITE_APPS_SCRIPT_URL com essa URL.

6) O componente `Contact.tsx` irá enviar um POST JSON para essa URL quando disponível.

Segurança e permissões
- Se o Apps Script estiver configurado para exigir login, autenticação será necessária e o frontend não conseguirá postar diretamente sem OAuth.
- Para uso simples, configure o Web App para "Qualquer pessoa, mesmo anônima" e aceite o risco de requisições públicas.

Verificação
- Para Google Form: abra a planilha vinculada e veja se novas linhas aparecem quando o formulário é enviado do site.
- Para Apps Script: verifique se o endpoint retorna status 200 e se a planilha recebe as linhas.

Dicas finais
- Teste com dados de exemplo. Se precisar de validações adicionais (ex: formato de telefone), adicione no frontend antes do envio.
- Se quiser armazenar dados mais seguros ou integrar com outras APIs, considere criar um backend próprio e usar a Sheets API com credenciais seguras.

Se quiser, posso:
- Ajudar a extrair os entry IDs do seu Google Form (se você enviar o HTML/URL), ou
- Gerar um .env.example com as variáveis necessárias.
