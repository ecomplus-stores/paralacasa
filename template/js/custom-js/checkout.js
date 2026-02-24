// Add your custom JavaScript for checkout here.
/* TRAVA ANTIFRAUDE AGRESSIVA */
document.addEventListener('submit', function (event) {
  // Pega todos os dados que o usuário preencheu no formulário
  const formData = new FormData(event.target);
  let isMalicious = false;

  for (let value of formData.values()) {
    // Procura por qualquer sinal de script ou comando malicioso
    if (/<script|javascript|eval\(|alert\(|onload|onmouseover/gi.test(value)) {
      isMalicious = true;
      break;
    }
  }

  if (isMalicious) {
    event.preventDefault(); // IMPEDE O ENVIO DA VENDA NA HORA
    event.stopPropagation();
    
    alert('Erro de segurança: Sua transação foi bloqueada por conter caracteres inválidos.');
    
    // BLOQUEIO: Redireciona para o Google ou Home para tirar o bot do site
    window.location.href = "https://www.google.com"; 
    return false;
  }
}, true);
