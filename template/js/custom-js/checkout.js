// Add your custom JavaScript for checkout here.
/* BLOQUEIO DE INJEÇÃO XSS - ANTIFRAUDE */
(function() {
  const bloquearFraude = () => {
    // Lista de campos onde eles mais atacam
    const campos = document.querySelectorAll('input, textarea');
    
    campos.forEach(input => {
      // O padrão abaixo detecta aspas, tags script e links externos maliciosos
      const padraoAtaque = /<script|xss\.report|getScript|["'><]/gi;

      input.addEventListener('input', function() {
        if (padraoAtaque.test(this.value)) {
          console.error("Tentativa de XSS detectada e bloqueada.");
          
          // Limpa o campo e impede o prosseguimento
          this.value = "";
          alert("Caracteres inválidos detectados. Por favor, preencha o endereço corretamente.");
          
          // BLOQUEIO: Se insistir, joga para fora do checkout
          window.location.href = "/";
        }
      });
    });
  };

  // Executa a proteção
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bloquearFraude);
  } else {
    bloquearFraude();
  }
})();
