<template>
  <main class="about-container">
    <div class="about-grid">
      
      <div class="text-content">
        <span class="pre-title">Cultural Events</span>
        <h1>SOBRE NÓS</h1>
        <div class="separator"></div>
        
        <p>
          O <strong>Cultural Events</strong> nasceu de um desejo simples: conectar pessoas a experiências inesquecíveis. 
          Somos um projeto acadêmico focado em facilitar o acesso à cultura, permitindo que produtores locais divulguem seu trabalho e que o público descubra o que há de melhor na cidade.
        </p>
        
        <p>
          Acreditamos que a cultura deve ser acessível, vibrante e comunitária. Seja um show de rock, uma peça de teatro ou um workshop de arte, seu lugar é aqui.
        </p>

        <button class="btn-learn-more">
          Saiba Mais
        </button>
      </div>

      <div class="visual-content">
        <div class="blob-bg"></div>
        <div class="illustration-placeholder">
          <font-awesome-icon icon="users" class="hero-icon" />
        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; 
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; 
}

.pre-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #999;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 3rem;
  color: var(--text-dark); 
  margin: 0;
  font-weight: 800;
  line-height: 1.2;
}

.separator {
  width: 60px;
  height: 4px;
  background-color: var(--primary); 
  margin: 1rem 0 2rem 0;
  border-radius: 2px;
}

p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn-learn-more {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50px; 
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px var(--primary-focus);
}

.btn-learn-more:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(5, 150, 105, 0.4);
}

.visual-content {
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blob-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--primary-light);
  border-radius: 46% 54% 39% 61% / 55% 36% 64% 45%; 
  z-index: 1;
}

.illustration-placeholder {
  position: relative;
  z-index: 2; 
  color: var(--primary);
}

.hero-icon {
  font-size: 10rem;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
}

/* --- RESPONSIVIDADE --- */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .text-content {
    align-items: center; 
  }

  .visual-content {
    order: -1; 
    height: 300px;
  }
  
  .hero-icon {
    font-size: 8rem;
  }
}
</style>