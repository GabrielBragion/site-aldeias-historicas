$(document).ready(function () {
  // Função para redimensionar o carrossel quando a janela é redimensionada
  function resizeCarousel() {
    const carouselWidth = $(".carousel").width();
    $(".carousel-item").width(carouselWidth); // Define a largura de cada slide
    updateCarousel(); // Atualiza a posição do carrossel
  }

  // Atualiza a posição do carrossel
  function updateCarousel() {
    let itemWidth = $(".carousel-item").width();
    $(".carousel-inner").css("transform", `translateX(-${itemWidth * (currentIndex + 1)}px)`); // Adiciona 1 para o primeiro clone
    $(".indicator").removeClass("active");
    $(".indicator").eq(currentIndex % totalSlides).addClass("active");
  }

  // Configurações de inicialização
  let currentIndex = 0;
  let totalSlides = $(".carousel-item").length - 1; // Considerando o clone
  resizeCarousel(); // Chamada inicial para ajustar o tamanho

  // Intervalo de navegação automática
  let slideInterval = setInterval(autoSlide, 5000);

  // Navegação automática
  function autoSlide() {
    currentIndex++;
    if (currentIndex === totalSlides) {
      currentIndex = 0; // Retorna para o início
      $(".carousel-inner").css("transition", "none").css("transform", "translateX(0)"); // Reseta a posição
    }
    setTimeout(() => $(".carousel-inner").css("transition", "transform 0.5s ease"), 20);
    updateCarousel();
  }

  // Navegação manual nos botões
  $(".next").click(function () {
    clearInterval(slideInterval);
    currentIndex++;
    if (currentIndex === totalSlides) {
      currentIndex = 0;
      $(".carousel-inner").css("transition", "none").css("transform", "translateX(0)"); // Reseta a posição
    }
    updateCarousel();
    slideInterval = setInterval(autoSlide, 3000);
  });

  $(".prev").click(function () {
    clearInterval(slideInterval);
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
      $(".carousel-inner").css("transition", "none").css("transform", `translateX(-${$(".carousel-item").width() * totalSlides}px)`); // Vai para o último slide
    }
    updateCarousel();
    slideInterval = setInterval(autoSlide, 3000);
  });

  // Navegação pelos indicadores
  $(".indicator").click(function () {
    clearInterval(slideInterval);
    currentIndex = $(this).index();
    updateCarousel();
    slideInterval = setInterval(autoSlide, 3000);
  });

  // Ajusta o tamanho ao redimensionar a janela
  $(window).resize(resizeCarousel);
});
