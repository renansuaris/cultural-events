<template>
  <main class="about-container">
    <div class="about-grid">
      
      <div class="text-content">
        <span class="pre-title">Cultural Events</span>
        <h1>SOBRE NÓS</h1>
        <div class="separator"></div>
        
        <p>
          O <strong>Cultural Events</strong> nasceu de algo simples e muito humano: a vontade de ver a cultura mais perto das pessoas.
          Somos um projeto acadêmico criado para conectar quem produz arte com quem quer viver novas experiências.
        </p>
        
        <p>
          Aqui, produtores locais ganham espaço para divulgar seu trabalho e o público descobre shows, peças, oficinas e eventos
          que muitas vezes passam despercebidos na correria do dia a dia.
        </p>

        <p>
          Acreditamos que cultura é encontro, é troca e é pertencimento. Seja um show de rock, uma peça de teatro ou um workshop de arte,
          sempre existe um evento esperando por você.
        </p>

        <p>
          Isso é <strong>Cultural Events.</strong> 
        </p>

        <button class="btn-learn-more">
          Saiba Mais
        </button>
      </div>

      <div class="visual-content">
        <div class="blob-bg"></div>
        <div class="illustration-placeholder">
          <img 
            src="/cultural-events-icon.png" 
            alt="Logo Cultural Events" 
            class="about-logo"
          />
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
}

.about-logo {
  width: 380px; /* Aumentado de 200px para 380px */
  height: auto;
  filter: drop-shadow(0 15px 15px rgba(0,0,0,0.15)); /* Sombra um pouco mais forte pra destacar */
  transition: transform 0.3s ease;
}

.about-logo:hover {
  transform: scale(1.05) rotate(-5deg); 
}
</style>