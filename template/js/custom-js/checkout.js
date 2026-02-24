// Add your custom JavaScript for checkout here.
/* TRAVA DE SEGURANÇA ANTIFRAUDE:
   Detecta injeção de scripts no campo de endereço e bloqueia a sessão.
*/
setInterval(() => {
  // Busca os campos de rua, número e complemento
  const inputsParaChecar = document.querySelectorAll('input[name="street"], input[name="complement"], #checkout-address-street');

  inputsParaChecar.forEach(campo => {
    // Se o campo contém as palavras proibidas (script, alert, etc)
    const padraoMalicioso = /<script|javascript|eval\(|alert\(|onload/gi;
    
    if (padraoMalicioso.test(campo.value)) {
      console.warn("Tentativa de injeção de script detectada!");
      
      // 1. Limpa o campo na hora para não salvar no banco
      campo.value = "ACESSO BLOQUEADO POR SEGURANÇA";
      
      // 2. Avisa o fraudador (isso geralmente quebra o robô dele)
      alert("Ação inválida detectada. A transação foi cancelada.");
      
      // 3. BLOQUEIO AUTOMÁTICO: Redireciona para fora do checkout
      // Isso força o fraudador a ter que começar tudo do zero
      window.location.href = "/"; 
    }
  });
}, 2000); // Verifica a cada 2 segundos enquanto ele digita
